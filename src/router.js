import Vue from 'vue';
import Router from 'vue-router';

import demo from './views/DemoModule/Code/demo.vue'

Vue.use(Router);

var router = new Router({
  mode: 'hash',
  routes: [
    {
      path: "/",
      name: "demo",
      meta: { title: "演示页面" },
      component: demo
    }
  ],
});;
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next();
})

export default router