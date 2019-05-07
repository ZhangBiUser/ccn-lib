import Vue from 'vue';
import App from './App.vue';
import router from './router';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap-theme.css";
import "bootstrap/dist/js/bootstrap.js";
import "@p/bootstrap-validator/bootstrapValidator.css";
import "@p/bootstrap-validator/bootstrapValidator.js";
import "@p/layer-v3.1.1/layer.js"
import "@p/layer-v3.1.1/theme/default/layer.css"
import "@p/font-awesome/css/font-awesome.min.css"
import "@/assets/css/basePage.css";
import store from "./store/index.js";
import "@/assets/css/public.css";
// require('./mock/index.js')
process.env.NODE_ENV !== 'production' ? require('./mock/index.js') : '';
Vue.config.productionTip = false;
window.vue = new Vue({
  router,
  store, 
  render: h => h(App),
}).$mount('#app');