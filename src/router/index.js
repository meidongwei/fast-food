import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login'
import index from '@/pages/index'
import order from '@/pages/index/order'
import card from '@/pages/index/card'
import close from '@/pages/index/close'
import report from '@/pages/index/report'
import setting from '@/pages/index/setting'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      redirect: 'index/order',
      children: [
        {
          path: 'order',
          name: 'order',
          component: order
        },
        {
          path: 'card',
          name: 'card',
          component: card
        },
        {
          path: 'close',
          name: 'close',
          component: close
        },
        {
          path: 'report',
          name: 'report',
          component: report
        },
        {
          path: 'setting',
          name: 'setting',
          component: setting
        }
      ]
    }
  ]
})
