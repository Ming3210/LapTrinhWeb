import { getCategories } from "@/apis/homeApi";

const home = {
  state: {
    categories: [],
  },
  getters: {},
  mutations: {
    SET_CATEGORIES: (state, categories) => {
      state.categories = categories;
    },
  },
  actions: {
    getAllCategories: async ({ commit }) => {
      try {
        const categories = await getCategories();
        commit("SET_CATEGORIES", categories);
      } catch (error) {}
    },
  },
};

export default home;
