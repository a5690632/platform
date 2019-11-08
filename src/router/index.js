import Vue from 'vue'
import VueRouter from 'vue-router'
import APP from '../App.vue';
Vue.use(VueRouter)
const Table = () => import(/* webpackChunkName: "about" */ '../views/conpontents/table.vue')
const Login = () => import(/* webpackChunkName: "login" */ '../views/conpontents/table.vue')

const routes = [
  {
    path: '/',
    name: "index",
    compontent: APP,
  },
  {
    path: '/layout',
    name: 'layout',
    children: [{
      path: '/layout/components/table',
      name: 'table',
      component: Table
    }]
  },
  {
    path: '/login',
    name: "login",
    compontent: Login,
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
