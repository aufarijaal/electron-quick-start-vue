import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { createVuestic } from "vuestic-ui/web-components";
import "vuestic-ui/dist/vuestic-ui.css";

createApp(App)
  .use(createPinia())
  .use(createVuestic())
  .use(router)
  .mount("#app")
  .$nextTick(() => {
    postMessage({ payload: "removeLoading" }, "*");
  });
