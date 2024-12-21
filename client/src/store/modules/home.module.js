import { getAllProducts, getCategories, updateCategory } from "@/apis/homeApi";

const home = {
  state: {
    categories: [],
    products: [],
  },
  getters: {},
  mutations: {
    SET_CATEGORIES: (state, categories) => {
      state.categories = categories;
    },
    SET_PRODUCTS: (state, products) => {
      state.products = products;
    },
    UPDATE_CATEGORY: (state, updatedCategory) => {
      console.log(updatedCategory);

      const index = state.categories.findIndex(
        (cat) => cat.id === updatedCategory.id
      );
      if (index !== -1) {
        state.categories.splice(index, 1, updatedCategory);
      }
    },
  },
  actions: {
    getAllCategories: async ({ commit }) => {
      try {
        const categories = await getCategories();
        commit("SET_CATEGORIES", categories);
      } catch (error) {}
    },
    getAllProducts: async ({ commit }) => {
      try {
        const products = await getAllProducts();
        commit("SET_PRODUCTS", products);
      } catch (error) {}
    },
    updateCategory: async ({ commit }, payload) => {
      try {
        console.log(payload);

        const updatedCategory = await updateCategory(payload);
        commit("UPDATE_CATEGORY", updatedCategory);
      } catch (error) {
        console.error("Failed to update category:", error);
      }
    },
  },
};

export default home;
