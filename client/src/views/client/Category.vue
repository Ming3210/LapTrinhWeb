<template>
  <div>
    <div class="container py-4 flex items-center gap-3">
      <router-link
        to="/"
        class="text-red-400 flex items-center justify-center text-base"
      >
        <HomeOutlined />
      </router-link>
      <span class="text-sm flex items-center justify-center text-gray-400">
        <RightOutlined />
      </span>
      <p class="text-gray-600 m-0 font-medium">Categories</p>
    </div>

    <div
      class="container grid grid-cols-4 gap-6 pt-4 pb-16 items-start justify-start"
    >
      <!-- Sidebar Categories -->
      <div class="col-span-1 bg-white px-4 pb-6 shadow rounded overflow-hidden">
        <div class="divide-y min-h-[50vh] divide-gray-200 space-y-5">
          <div>
            <h3 class="text-xl text-gray-900 mb-3 uppercase font-medium">
              Categories
            </h3>
            <div
              v-for="item in categories"
              :key="item.id"
              class="space-y-2 mb-2"
            >
              <div class="flex items-center">
                <button @click="handleChange(item)">
                  {{ item.name }}
                </button>
                <div class="ml-auto text-gray-600 text-sm">
                  ({{ item.product.length }})
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Products Section -->
      <div class="col-span-3">
        <select
          class="w-44 text-sm text-gray-600 px-4 py-3 border-gray-300 shadow-sm rounded focus:ring-red-400 focus:border-red-500 mb-5"
        >
          <option value="">1</option>
          <option value="">2</option>
          <option value="">3</option>
          <option value="">4</option>
        </select>

        <div class="product-grid">
          <template v-for="category in categories" :key="category.id">
            <template v-if="category.displayStatus">
              <div
                v-for="product in category.product"
                :key="product.id"
                class="product-card group"
              >
                <div
                  @click="handleClick(product.id)"
                  class="relative cursor-pointer"
                >
                  <img
                    :src="product.image"
                    class="w-full h-[200px] object-cover"
                    :alt="product.name"
                  />
                  <div
                    class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition"
                  >
                    <router-link
                      to=""
                      class="text-white text-lg w-9 h-8 rounded-full bg-red-400 flex items-center justify-center hover:bg-gray-800 transition"
                    >
                      <HeartOutlined />
                    </router-link>
                  </div>
                </div>
                <div class="pt-3 pb-3 px-4">
                  <h4 class="text-xl font-medium text-gray-800">
                    {{ product.name }}
                  </h4>
                  <p class="text-gray-600">{{ product.price }}</p>
                </div>
              </div>
            </template>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import {
  HomeOutlined,
  RightOutlined,
  HeartOutlined,
} from "@ant-design/icons-vue";

const router = useRouter();
const store = useStore();

const categories = computed(() => store.state.home.categories);

onMounted(async () => {
  await store.dispatch("getAllCategories");
  await store.dispatch("getAllProducts");
});

const handleChange = (category) => {
  const updatedCategory = {
    ...category,
    displayStatus: true,
  };

  categories.value.forEach((cat) => {
    if (cat.id !== category.id) {
      const updatedCat = {
        ...cat,
        displayStatus: false,
      };
      store.dispatch("updateCategory", updatedCat);
    }
  });
  store.dispatch("updateCategory", updatedCategory);
};

const handleClick = (id) => {
  router.push(`/product-detail/${id}`);
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: auto;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.product-card {
  background-color: white;
  border-radius: 0.375rem;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .product-grid {
    grid-template-columns: 1fr;
  }
}
</style>
