import {createRouter, createWebHistory} from 'vue-router'
import AuthLayouts from "../views/layouts/AuthLayout.vue";
import AppLayout from "../views/layouts/AppLayout.vue";

export default createRouter({
  history: createWebHistory(),
  routes:[
    {
      path: '/login',
      component: AuthLayouts
    },
    {
      path: '/',
      component: AppLayout
    }
  ]
})