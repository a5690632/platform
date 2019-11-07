import Vue from 'vue'
import VueRouter from 'vue-router'
import APP from '../App.vue';
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: "index",
    compontent: APP,
  },

  {
    path: '/table',
    name: 'table',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/conpontents/table.vue')
  },
  // {
  //   path: '*',
  //   name: '404',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // // which is lazy-loaded when the route is visited.
  //   // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
