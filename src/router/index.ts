import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import Report from '@/views/Report.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/report',
    component: Report,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
