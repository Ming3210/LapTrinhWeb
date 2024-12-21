import { createStore } from "vuex";
import login from "./modules/login.module";
import home from "./modules/home.module";
import register from "./modules/register.module";
const store = createStore({
  modules: {
    login,
    home,
    register,
  },
});

export default store;
