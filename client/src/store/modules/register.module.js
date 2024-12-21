import { getAllUsers, registerUser } from "@/apis/login";

const register = {
  state: {
    users: [],
    currentUser: null,
  },
  getters: {},
  mutations: {
    GET_USERS: (state, user) => {
      state.users = user;
    },

    SET_CURRENT_USER: (state, user) => {
      state.currentUser = user;
    },
  },
  actions: {
    register: async ({ commit, state }, payload) => {
      try {
        const emailExists = state.users.some(
          (user) => user.email === payload.email
        );
        if (emailExists) {
          throw { response: { status: 409 } };
        }
        const response = await registerUser(payload);
        commit("SET_CURRENT_USER", response.user);
        return response;
      } catch (error) {
        console.error("Lỗi trong quá trình đăng kí tài khoản:", error);
        throw error;
      }
    },
    getAllUsers: async ({ commit }) => {
      try {
        const users = await getAllUsers();
        commit("GET_USERS", users);
        return users;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

export default register;
