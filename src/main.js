import Vue from "vue";
import App from "./App.vue";
import Layout from './components/LayOut'
import Buefy from 'buefy'
import router from "./router";

Vue.config.productionTip = false;
Vue.use(Buefy)
Vue.component('Layout', Layout)
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
