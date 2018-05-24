import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login'
import index from '@/pages/index'
import order from '@/pages/index/order'
import card from '@/pages/index/card'
import close from '@/pages/index/close'
import report from '@/pages/index/report'
import setting from '@/pages/index/setting'
import cardAdd from '@/pages/index/card/cardAdd'
import cardQuery from '@/pages/index/card/cardQuery'
import cardRecharge from '@/pages/index/card/cardRecharge'
import cardCancel from '@/pages/index/card/cardCancel'
import closePage from '@/pages/index/close/closePage'
import zdcx from '@/pages/index/report/zdcx'

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
          component: card,
          redirect: 'card/cardAdd',
          children: [
            {
              path: 'cardAdd',
              name: 'cardAdd',
              component: cardAdd
            },
            {
              path: 'cardQuery',
              name: 'cardQuery',
              component: cardQuery
            },
            {
              path: 'cardRecharge',
              name: 'cardRecharge',
              component: cardRecharge
            },
            {
              path: 'cardCancel',
              name: 'cardCancel',
              component: cardCancel
            }
          ]
        },
        {
          path: 'close',
          name: 'close',
          component: close,
          redirect: 'close/closePage',
          children: [
            {
              path: 'closePage',
              name: 'closePage',
              component: closePage
            }
          ]
        },
        {
          path: 'report',
          name: 'report',
          component: report,
          redirect: 'report/zdcx',
          children: [
            {
              path: 'zdcx',
              name: 'zdcx',
              component: zdcx
            }
          ]
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
