import Mock from 'mockjs'

Mock.mock(/login/, {
  "errcode": 0,
  "msg": "登录成功",
  "epid": 1,
  "epname": "张三",
  "shiftflag": 0,
  "shift": 1, // 班次，如果为1则弹领备用金
  "privilege": ['brandEdit', 'brandEdit']
})

Mock.mock(/saveByj/, {
  "errcode": 0,
  "msg": "领取备用金成功"
})

Mock.mock(/getDatas/, {
  'errcode': 0,
  'errmsg': 'error',
  'data': [
    {
      id: 1,
      type: 1,
      name: '全部'
    },
    {
      id: 2,
      type: 2,
      name: '套餐',
      contain: [
        {
          id: 1,
          type: 2,
          name: '酒水套餐',
          'vip|1': [1, 2],
          price: 2000,
          nowPrice: 1500,
          contain: [
            {
              id: 1001,
              name: '五粮液'
            },
            {
              id: 1002,
              name: '茅台'
            }
          ],
          others: [
            {
              id: 1,
              name: '使用小酒杯'
            },
            {
              id: 2,
              name: '使用大酒杯'
            },
            {
              id: 3,
              name: '使用中酒杯'
            },
            {
              id: 4,
              name: '使用中大酒杯'
            },
            {
              id: 5,
              name: '使用超小酒杯'
            },
            {
              id: 6,
              name: '使用超大酒杯'
            }
          ]
        },
        {
          id: 2,
          type: 2,
          name: '饮料套餐',
          'vip|1': [1, 2],
          assist: 1,
          price: 50,
          nowPrice: 30,
          contain: [
            {
              id: 2001,
              name: '红牛'
            },
            {
              id: 2002,
              name: '脉动'
            }
          ],
          others: [
            {
              id: 1,
              name: '加冰'
            },
            {
              id: 2,
              name: '不加冰'
            }
          ]
        }
      ]
    },
    {
      id: 3,
      type: 3,
      name: '酒水',
      contain: [
        {
          id: 1001,
          type: 3,
          name: '五粮液',
          'vip|1': [1, 2],
          price: 1000,
          nowPrice: 900
        },
        {
          id: 1002,
          type: 3,
          name: '茅台',
          'vip|1': [1, 2],
          price: 1000,
          nowPrice: 900
        }
      ]
    },
    {
      id: 4,
      type: 3,
      name: '饮料',
      contain: [
        {
          id: 2001,
          type: 4,
          name: '红牛',
          // 'vip|1': [1, 2],
          price: 25,
          nowPrice: 20
        },
        {
          id: 2002,
          type: 4,
          name: '脉动',
          // 'vip|1': [1, 2],
          price: 25,
          nowPrice: 20
        }
      ]
    },
    {
      id: 5,
      type: 3,
      name: '精品菜',
      'contain|21': [
        {
          id: '500@increment(1)',
          type: 5,
          name: '精品菜@ctitle(1, 2)',
          'vip|1': [1, 2],
          price: 60,
          nowPrice: 50
        }
      ]
    },
    {
      id: 6,
      type: 3,
      name: '热销菜',
      contain: [
        {
          id: 6001,
          type: 6,
          name: '网红热销菜',
          'contain|5': [
            {
              id: '6001@increment(1)',
              type: 6001,
              name: '网红热销菜@ctitle(1, 2)',
              'vip|1': [1, 2],
              price: 60,
              nowPrice: 50
            }
          ]
        },
        {
          id: 6002,
          type: 6,
          name: '明星热销菜',
          'contain|3': [
            {
              id: '6002@increment(1)',
              type: 6002,
              name: '明星热销菜@ctitle(1, 2)',
              'vip|1': [1, 2],
              price: 60,
              nowPrice: 50
            }
          ]
        },
        {
          id: 6003,
          type: 6,
          name: '抖音三件套',
          'vip|1': [1, 2],
          price: 60,
          nowPrice: 50,
          count: 10,
        }
      ]
    }
  ]
})
