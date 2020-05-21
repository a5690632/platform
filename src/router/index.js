import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

const Login = () =>
  import(/* webpackChunkName: "common" */ "../views/login.vue");

const Table = () =>
  import(/* webpackChunkName: "common" */ "../views/table.vue");

const Layout = () =>
  import(/* webpackChunkName: "common" */ "../views/layout/layout.vue");

const modulesFiles = require.context("./modules", true, /\.js$/);

export let asyncRoutes = [];

export let constantRoutes = [
  {
    path: "/login",
    name: "Login",
    hidden: true,
    component: Login,
    meta: { title: "登录", icon: "" },
  },
  {
    path: "/view",
    name: "view",
    component: Layout,
    meta: { title: "组件", icon: "" },
    children: [
      {
        path: "/table",
        name: "table",
        component: Table,
        meta: { title: "表格", icon: "" },
      },
    ],
  },
];

modulesFiles.keys().reduce((modules, modulePath) => {
  const value = modulesFiles(modulePath);
  asyncRoutes = asyncRoutes.concat(value.asyncRoutes);
  constantRoutes = constantRoutes.concat(value.constantRoutes);
}, []);

constantRoutes.push({
  path: "*",
  name: "404",
  component: () => import(/* webpackChunkName: "common" */ "../views/404.vue"),
});

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
