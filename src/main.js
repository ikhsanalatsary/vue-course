import Vue from "vue";
import Vuesax from "vuesax";
import { Plugin } from "vue-fragment";
import "vuesax/dist/vuesax.css"; //Vuesax styles
import "material-icons/iconfont/material-icons.css";
import App from "./App.vue";
import router from "./router";

Vue.use(Vuesax, {
  // options here
}).use(Plugin);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app");
