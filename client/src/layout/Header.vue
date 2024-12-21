<template>
  <div>
    <div v-if="state.login.currentUser">
      <Register />
    </div>
    <div v-if="state.login.currentUser">
      <Login />
    </div>
    <header class="place-content-center p-4 py-4 shadow-sm bg-white">
      <div class="flex items-center justify-evenly">
        <router-link class="no-underline flex items-center" to="/">
          <SketchOutlined class="text-[40px]" />

          <div>
            <span class="text-[40px] text-sky-400">Furni</span>
            <span class="text-[30px] text-purple-500">craft</span>
          </div>
        </router-link>
        <div class="w-full max-w-xl flex static">
          <span
            class="relative left-7 text-[50px] top-[5px] text-lg text-gray-400"
          >
            <SearchOutlined class="text-[20px]" />
          </span>
          <input
            type="text"
            class="w-full border border-gray-300 border-r-0 pl-8 py-3 pr-3 rounded-l-md focus:outline-none"
            placeholder="Search"
          />
          <button
            class="border bg-red-500 border-gray-300 text-white px-8 rounded-r-md hover:bg-transparent hover:text-gray-700 transition"
          >
            Search
          </button>
        </div>
        <div v-if="token" class="flex items-center space-x-4">
          <router-link
            to="/wishlist"
            class="text-center text-gray-700 hover:text-red-500 transition no-underline relative"
          >
            <div class="text-2xl">
              <ShoppingOutlined class="text-[30px]" />
            </div>
            <div class="text-xs leading-3">Wish list</div>
            <span
              class="absolute right-0 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-red-500 text-white text-xs"
            >
              8
            </span>
          </router-link>
          <router-link
            to="/user-detail"
            class="text-center text-gray-700 hover:text-red-500 transition no-underline relative"
          >
            <div class="text-2xl">
              <UserOutlined class="text-[30px]" />
            </div>
            <div class="text-xs leading-3">Account</div>
          </router-link>
        </div>
        <div v-else>
          <div
            @click="openLoginForm"
            class="text-center text-gray-700 hover:text-red-500 transition no-underline relative"
          >
            <div class="text-2xl">
              <ShoppingCartOutlined class="text-[30px]" />
            </div>
            <div class="text-xs leading-3">Shop now</div>
          </div>
        </div>
      </div>
    </header>
    <nav class="bg-gray-800">
      <div class="flex">
        <div
          class="flex container items-center justify-between flex-grow pl-12"
        >
          <div
            class="px-8 py-4 flex items-center justify-center bg-red-400 cursor-pointer relative group"
          >
            <span class="text-white">
              <OrderedListOutlined class="text-[20px]" />
            </span>
            <span class="capitalize ml-2 text-white">All categories</span>
            <div
              class="absolute w-full left-0 top-full bg-white shadow-md py-3 divide-y divide-x divide-gray-300 divide-dashed opacity-0 group-hover:opacity-100 duration-300 invisible group-hover:visible"
            >
              <router-link
                v-for="(category, index) in limitedCategories"
                :key="index"
                to=""
                class="flex items-center px-6 py-3 hover:bg-gray-100 transition no-underline"
              >
                <CarOutlined class="w-5 h-5 object-contain" />
                <span class="ml-6 text-gray-600 text-sm">{{
                  category.name
                }}</span>
              </router-link>
            </div>
          </div>
          <div class="flex items-center space-x-6 z-50 capitalize">
            <router-link
              to=""
              class="text-gray-200 no-underline hover:text-white transition"
            >
              Home
            </router-link>
            <router-link
              to="/category"
              class="text-gray-200 no-underline hover:text-white transition"
            >
              Shop
            </router-link>
            <router-link
              to=""
              class="text-gray-200 no-underline hover:text-white transition"
            >
              About us
            </router-link>
            <router-link
              to=""
              class="text-gray-200 no-underline hover:text-white transition"
            >
              Contact us
            </router-link>
          </div>
          <div v-if="token">
            <router-link
              to=""
              @click="logout"
              class="text-gray-200 no-underline hover:text-white transition"
            >
              Logout
            </router-link>
          </div>
          <div v-else>
            <router-link
              to=""
              @click="openLoginForm"
              class="text-gray-200 no-underline hover:text-white transition"
            >
              Login
            </router-link>
            <span class="text-white">/</span>
            <router-link
              to=""
              @click="openSignUpForm"
              class="text-gray-200 no-underline hover:text-white transition"
            >
              Register
            </router-link>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import Login from "@/views/auth/Login.vue";
import Register from "@/views/auth/Register.vue";

const store = useStore();
const router = useRouter();

const token = ref(localStorage.getItem("token"));
const state = store.state;

// Fetch categories from Vuex store
const categories = computed(() => store.state.home.categories);

// Create a computed property that returns only the first 6 categories
const limitedCategories = computed(() => categories.value.slice(0, 6));

const openLoginForm = () => {
  router.push("/login");
};

const openSignUpForm = () => {
  router.push("/register");
};

const logout = () => {
  localStorage.removeItem("token");
  token.value = false;
  router.push("/");
};

onMounted(() => {
  store.dispatch("getAllCategories");
});
</script>

<style>
/* Add your styles here */
</style>
