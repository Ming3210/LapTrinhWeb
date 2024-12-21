<template>
  <div>
    <!-- Banner Section -->
    <section
      class="banner relative bg-cover -z-50 bg-no-repeat bg-center py-36"
      :style="{ backgroundImage: `url('${bannerImage}')` }"
    >
      <div class="container mx-auto px-4">
        <div class="max-w-lg">
          <h1
            class="text-4xl md:text-6xl text-white font-medium mb-4 capitalize leading-tight"
          >
            best collection for home decoration
          </h1>
          <p class="mb-8 max-w-md text-white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima ut
            error ullam earum dolore, quam sit commodi repellendus.
          </p>
          <router-link
            to="/shop"
            class="inline-block bg-red-400 border border-red-400 text-white px-8 py-3 font-medium rounded-md hover:bg-transparent hover:text-red-400 transition-colors duration-300 no-underline"
          >
            Shop Now
          </router-link>
        </div>
      </div>
    </section>

    <!-- Category Section -->
    <section class="category-section container mx-auto px-4 py-16">
      <h2 class="text-2xl md:text-3xl font-medium text-gray-800 uppercase mb-8">
        Shop by category
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="category in categories"
          :key="category?.id"
          class="category-card relative rounded-lg overflow-hidden group"
        >
          <img
            src="https://www.alamodelabel.in/cdn/shop/files/6864D66E-6BD4-42AC-A778-10230C3482C1_600x.jpg?v=1734286075"
            :alt="category?.name"
            class="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div
            @click="getCategory(category)"
            class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-medium group-hover:bg-opacity-60 transition-all duration-300 no-underline"
          >
            {{ category?.name }}
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

// Router and Store Setup
const router = useRouter();
const store = useStore();

// Reactive Variables
const bannerImage = ref(
  "https://d3jmn01ri1fzgl.cloudfront.net/photoadking/webp_thumbnail/shark-new-collection-sale-clothing-banner-template-p3ztild89dffd0.webp"
);

// Computed Categories

const categories = computed(() => store.state.home.categories.slice(0, 6));
// Fetch categories on mount

console.log(store.state.home, 9999);
const getCategory = (category) => {
  let index = categories.value.findIndex((c) => c.id == category.id);
  if (index !== -1) {
    let updatedCategory = {
      ...categories[index],
      displayStatus: true,
    };
    categories.value.forEach((cat) => {
      if (cat.id !== category.id) {
        let updatedCat = { ...cat, displayStatus: false };
        store.dispatch("updateCategory", updatedCat);
      }
    });
    store.dispatch("updateCategory", updatedCategory);
    router.push(`/category`);
  }
};
onMounted(() => store.dispatch("getAllCategories"));
</script>

<style scoped>
.banner {
  min-height: 500px;
  background-position: center;
  background-size: cover;
}

.category-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (max-width: 768px) {
  .banner {
    min-height: 400px;
  }
}
</style>
