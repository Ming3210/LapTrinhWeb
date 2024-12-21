import "./assets/main.css";
import Antd from "ant-design-vue";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "ant-design-vue/dist/reset.css";
import store from "./store/store";

import * as Icons from "@ant-design/icons-vue";

const app = createApp(App);

Object.keys(Icons).forEach((key) => {
  app.component(key, Icons[key]);
});
app.use(router);
app.use(store);
app.use(Antd);
app.mount("#app");
