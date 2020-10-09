import Vue, { PluginFunction } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import filters from "./filters";
import { Button, PageHeader, List, Spin } from "ant-design-vue";

[Button, PageHeader, List, Spin].forEach((p) => Vue.use(p));

Vue.use(filters as any);

Vue.config.productionTip = false;



new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
