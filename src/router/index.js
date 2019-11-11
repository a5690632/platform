import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)



const Login = () => import(/* webpackChunkName: "login" */ '../views/login.vue')
const Layout = () => import(/* webpackChunkName: "login" */ '../views/layout/layout.vue')
const Table = () => import(/* webpackChunkName: "login" */ '../views/conpontents/table.vue')
const FormView = () => import(/* webpackChunkName: "login" */ '../views/conpontents/form.vue')
const routes = [

  {
    path: '/Login',
    name: "login",
    compontent: Login,
  },
  {
    path: '/layout',
    name: 'layout',
    component: Layout,
    children: [
      {
        path: '/layout/components/table',
        name: 'table',
        component: Table
      },
      {
        path: '/layout/components/form',
        name: 'formView',
        component: FormView
      }]
  },

  // {
  //   path: '*',
  //   name: '404',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/404.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
