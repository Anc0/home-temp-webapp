// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCharts from 'vue-chartjs'
import moment from "moment";
import VueMomentJS from "vue-momentjs";

Vue.use(VueAxios, axios);
Vue.use(VueCharts);
Vue.use(VueMomentJS, moment);


Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
