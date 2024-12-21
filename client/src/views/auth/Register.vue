<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center px-4">
    <div
      class="max-w-4xl w-full bg-white rounded-2xl shadow-lg overflow-hidden"
    >
      <div class="flex flex-col md:flex-row">
        <!-- Left Side - Banner -->
        <div
          class="md:w-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 p-12 text-white hidden md:block"
        >
          <h2 class="text-3xl font-bold mb-6">Welcome to Our Platform</h2>
          <p class="text-lg mb-6">
            Create an account and get started with our amazing features.
          </p>
          <div class="flex items-center mb-4">
            <span class="bg-blue-100 p-2 rounded-full text-blue-600 mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </span>
            <span>Free access to all features</span>
          </div>
          <div class="flex items-center mb-4">
            <span class="bg-blue-100 p-2 rounded-full text-blue-600 mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </span>
            <span>24/7 customer support</span>
          </div>
          <div class="flex items-center">
            <span class="bg-blue-100 p-2 rounded-full text-blue-600 mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </span>
            <span>Secure data protection</span>
          </div>
        </div>

        <!-- Right Side - Form -->
        <div class="w-full md:w-1/2 py-8 px-6 md:px-10">
          <div class="text-center mb-8">
            <h1 class="text-3xl font-bold text-gray-900">Create Account</h1>
            <p class="text-gray-600 mt-2">
              Please fill in your details to register
            </p>
          </div>

          <a-form
            :model="formState"
            :rules="rules"
            @finish="handleSubmit"
            layout="vertical"
          >
            <div class="grid grid-cols-2 gap-4">
              <a-form-item label="First Name" name="fname">
                <a-input
                  v-model:value="formState.fname"
                  placeholder="John"
                  size="large"
                  :maxLength="50"
                />
              </a-form-item>

              <a-form-item label="Last Name" name="lname">
                <a-input
                  v-model:value="formState.lname"
                  placeholder="Doe"
                  size="large"
                  :maxLength="50"
                />
              </a-form-item>
            </div>

            <a-form-item label="Email" name="email">
              <a-input
                v-model:value="formState.email"
                placeholder="john.doe@example.com"
                size="large"
                @blur="validateEmail"
              />
            </a-form-item>

            <a-form-item label="Password" name="password">
              <a-input-password
                v-model:value="formState.password"
                placeholder="Enter your password"
                size="large"
              />
            </a-form-item>

            <a-form-item>
              <a-button
                type="primary"
                html-type="submit"
                size="large"
                class="w-full bg-blue-600 hover:bg-blue-700"
                :loading="loading"
              >
                Create Account
              </a-button>
            </a-form-item>

            <div class="text-center mt-4">
              <p class="text-gray-600">
                Already have an account?
                <a
                  href="/login"
                  class="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Sign in
                </a>
              </p>
            </div>
          </a-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { message } from "ant-design-vue";

const router = useRouter();
const store = useStore();
const loading = ref(false);

const formState = reactive({
  fname: "",
  lname: "",
  email: "",
  password: "",
  cart: [],
  status: true,
  created_at: new Date().toISOString().split("T")[0],
  update_at: new Date().toISOString().split("T")[0],
  address: "",
  phone: "",
  role: "user",
  avatar:
    "https://th.bing.com/th/id/OIP.btwYOFUS1ZiwU42chCiGwgHaHa?rs=1&pid=ImgDetMain",
});

const emailStatus = reactive({
  status: "",
  message: "",
});

const rules = {
  fname: [
    { required: true, message: "Please enter your first name" },
    { min: 2, message: "First name must be at least 2 characters" },
    { max: 50, message: "First name cannot exceed 50 characters" },
  ],
  lname: [
    { required: true, message: "Please enter your last name" },
    { min: 2, message: "Last name must be at least 2 characters" },
    { max: 50, message: "Last name cannot exceed 50 characters" },
  ],
  email: [
    { required: true, message: "Please enter your email" },
    { type: "email", message: "Please enter a valid email address" },
    {
      validator: async (_, value) => {
        if (value && emails.value.includes(value)) {
          throw new Error("This email is already registered");
        }
      },
    },
  ],

  password: [
    { required: true, message: "Please enter your password" },
    { min: 8, message: "Password must be at least 8 characters" },
    {
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    },
  ],
};

const emails = computed(() =>
  store.state.login.users.map((user) => user.email)
);
console.log(emails);

const validateEmail = async () => {
  if (!formState.email) return;

  try {
    // Correct usage of .some() to check if the email already exists
    const result = emails.value.some((email) => email === formState.email);
    console.log(result);

    if (result) {
      emailStatus.status = "error";
      emailStatus.message = "This email is already registered";
      return false;
    } else {
      emailStatus.status = "success";
      emailStatus.message = "Email is available";
      return true;
    }
  } catch (error) {
    emailStatus.status = "error";
    emailStatus.message = "Error checking email availability";
    return false;
  }
};

const handleSubmit = async () => {
  loading.value = true;

  try {
    // Kiểm tra xem trường email có trống không
    if (!formState.email) {
      emailStatus.status = "error";
      emailStatus.message = "Email is required!";
      loading.value = false;
      return;
    }

    const isEmailValid = await validateEmail();
    if (!isEmailValid) {
      loading.value = false;
      return;
    }

    await store.dispatch("register", formState);
    message.success("Registration successful!");
    router.push("/login");
  } catch (error) {
    message.error("Registration failed. Please try again.");
  } finally {
    loading.value = false;
  }
};
onMounted(() => {
  store.dispatch("getAllUsers");
});
</script>

<style scoped>
.ant-input-affix-wrapper {
  padding: 8px 11px;
}

.ant-btn-primary {
  height: 42px;
  font-weight: 500;
}

/* Custom transitions */
.ant-form-item {
  transition: all 0.3s ease;
}

.ant-input:focus,
.ant-input-affix-wrapper:focus {
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .ant-form-item {
    margin-bottom: 16px;
  }
}
</style>
