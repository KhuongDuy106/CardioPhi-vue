import axios from 'axios';
import Vue from 'vue';
import VueCompositionAPI from '@vue/composition-api';
import pinia from '@/plugins/pinia';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';

Vue.use(VueCompositionAPI);

const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_ROOT,
});

new Vue({
  provide: {
    axios: axiosInstance,
  },
  router,
  vuetify,
  pinia,
  render: (h) => h(App),
}).$mount('#app');
