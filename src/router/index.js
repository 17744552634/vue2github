/*
* 路由器模块
* */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

import App from '../App'
import About from '../views/about'
import Home from '../views/home'
import News from '../views/news'
import Messages from '../views/messages'
import MessagesDetail from '../views/messagesDetail'


function loadView(view) {
  return () => import(`@/views/${view}.vue`)
}

var router = new VueRouter({
  // mode: 'history',
  routes: [
    {
      name: 'app',
      path: '/',
      // component: App,
      redirect: '/home',
    },
    {
      name: 'about',
      path: '/about',
      component: loadView('about'),
      children: [
        {
          name: 'news',
          path: '/about/news',
          component: loadView('news')
        },
        {
          name: 'messages',
          path: '/about/messages',
          component: Messages,
          children: [
            {
              path: '/about/messages/:id',
              component: MessagesDetail,
              //主要用于写某个指定路由跳转时需要执行的逻辑
              beforeEnter: (to, from, next) => {
                console.log('beforeEnter-to: ', to)
                console.log('beforeEnter-from: ', from)
                next();
              },
              afterEnter: (to, from, next) => {
                console.log('---afterEnter-to: ', to)
                console.log('---afterEnter-from: ', from)
                next()
              }
            },
          ],
          //主要用于写某个指定路由跳转时需要执行的逻辑
          beforeEnter: (to, from, next) => {
            console.log('beforeEnter-to: ', to)
            console.log('beforeEnter-from: ', from)
            next();
          },
          afterEnter: (to, from, next) => {
            console.log('-----afterEnter-to: ', to)
            console.log('-----afterEnter-from: ', from)
            next()
          }
        },
      ]
    },
    {
      name: 'home',
      path: '/home',
      component: Home,
    }
  ]
});
//这类钩子主要作用于全局,一般用来判断权限,以及以及页面丢失时候需要执行的操作
router.beforeEach((to, from, next) => {
  console.log('beforeEach-to: ', to)
  console.log('beforeEach-from: ', from)
  next();
})
router.afterEach((to, from, next) => {
  console.log('afterEach-to: ', to)
  console.log('afterEach-from: ', from)
})
export default router

