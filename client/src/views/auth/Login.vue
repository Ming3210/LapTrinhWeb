<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <a-card class="w-[420px]" :bordered="false">
      <template #title>
        <div class="text-center">
          <h2 class="text-2xl font-semibold">Login</h2>
        </div>
      </template>

      <a-form
        :model="formState"
        @finish="handleLogin"
        layout="vertical"
        :validate-messages="validateMessages"
      >
        <a-form-item name="email" label="Email" :rules="[{ required: true }]">
          <a-input
            v-model:value="formState.email"
            placeholder="example@example.com"
            size="large"
          >
            <template #prefix>
              <UserOutlined class="text-gray-400" />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item
          name="password"
          label="Password"
          :rules="[{ required: true, message: 'Password is required' }]"
        >
          <a-input-password
            v-model:value="formState.password"
            placeholder="Enter your password"
            size="large"
          >
            <template #prefix>
              <LockOutlined class="text-gray-400" />
            </template>
          </a-input-password>
        </a-form-item>

        <div class="flex justify-between mb-4">
          <a-checkbox v-model:checked="formState.remember">
            Remember me
          </a-checkbox>
          <a class="text-primary hover:text-primary-dark"> Forgot password? </a>
        </div>

        <a-button
          type="primary"
          html-type="submit"
          :loading="loading"
          class="w-full"
          size="large"
        >
          Log in
        </a-button>
      </a-form>

      <div class="mt-4 text-center">
        <p class="text-gray-600">
          Don't have an account?
          <router-link
            to="/register"
            class="text-primary hover:text-primary-dark"
          >
            Sign up
          </router-link>
        </p>
      </div>
    </a-card>

    <a-modal
      v-model:visible="errorModal.visible"
      title="Login Error"
      :footer="null"
      @ok="handleErrorModalOk"
    >
      <p>{{ errorModal.message }}</p>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";

const router = useRouter();
const store = useStore();
const loading = ref(false);
const users = computed(() => store.state.login.users);

const formState = reactive({
  email: "",
  password: "",
  remember: false,
});

const errorModal = reactive({
  visible: false,
  message: "",
});

const validateMessages = {
  required: "${label} is required",
};

const handleErrorModalOk = () => {
  errorModal.visible = false;
};

const showError = (msg) => {
  errorModal.visible = true;
  errorModal.message = msg;
};

const handleLogin = async (values) => {
  try {
    loading.value = true;

    // Tìm user trong danh sách users
    const foundUser = users.value.find(
      (user) => user.email === values.email && user.password === values.password
    );

    if (foundUser) {
      message.success("Login successful");

      // Lưu token
      localStorage.setItem("token", foundUser.id);

      // Lưu thông tin user vào store
      await store.dispatch("setCurrentUser", foundUser.id);

      // Chuyển hướng dựa vào role
      if (foundUser.role === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/");
      }
    } else {
      // Hiển thị lỗi nếu không tìm thấy user
      showError("Invalid email or password");
    }
  } catch (error) {
    console.error("Login error:", error);
    showError(error.message || "An error occurred during login");
  } finally {
    loading.value = false;
  }
};

// Lấy danh sách users khi component được mount
onMounted(async () => {
  try {
    await store.dispatch("getAllUsers");
  } catch (error) {
    console.error("Error fetching users:", error);
    showError("Error loading user data");
  }
});
</script>

<style scoped>
:deep(.ant-card-head-title) {
  padding: 16px 0;
}

:deep(.ant-input-affix-wrapper) {
  border-radius: 6px;
}

:deep(.ant-btn-primary) {
  height: 40px;
  border-radius: 6px;
}

.text-primary {
  color: #1890ff;
}

.text-primary-dark:hover {
  color: #096dd9;
}
</style>
