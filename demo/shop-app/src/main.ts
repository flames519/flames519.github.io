import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { Button, PageHeader } from "ant-design-vue";

[Button, PageHeader].forEach((p) => Vue.use(p));

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
