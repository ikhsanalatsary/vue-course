import Vue from "vue";
import Vuesax from "vuesax";
import { Plugin } from "vue-fragment";
import ApolloClient from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import VueApollo from "vue-apollo";
import "vuesax/dist/vuesax.css"; //Vuesax styles
import "material-icons/iconfont/material-icons.css";
import App from "./App.vue";
import router from "./router";
const moment = require("moment");
require("moment/locale/id");
// console.log("sa", moment.locale());

Vue.use(Vuesax)
  .use(Plugin)
  .use(VueApollo)
  .use(require("vue-moment"), { moment });

Vue.config.productionTip = false;

// Create an http link:
const link = new HttpLink({
  uri: "https://graphqlworkshop.ikhsan.dev/v1beta1/relay",
  fetch,
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache({
    addTypename: true,
  }),
});

const apolloProvider = new VueApollo({
  defaultClient: client,
});

new Vue({
  apolloProvider,
  render: (h) => h(App),
  router,
}).$mount("#app");
