import Mock from 'mockjs'

Mock.mock(/getOrderList/, {
  'errcode': 0,
  'errmsg': 'error',
  'data': [
    {
      'id': 1,
      'price': 30,
      'name': '卡布奇诺套餐',
      'nowPrice': 25,
      'count': 99,
      'others': [
        {
          'id': 1,
          'name': '加冰'
        },
        {
          'id': 2,
          'name': '加热'
        }
      ],
      'contain': [
        {
          'id': 1,
          'count': 1,
          'name': '低糖卡布奇诺'
        },
        {
          'id': 2,
          'count': 1,
          'name': '芒果汁'
        }
      ]
    },
    {
      'id': 2,
      'price': 15,
      'name': '低糖卡布奇诺',
      'nowPrice': 10,
      'count': 99,
      'others': [
        {
          'id': 1,
          'name': '加牛奶'
        },
        {
          'id': 2,
          'name': '加羊奶'
        },
        {
          'id': 3,
          'name': '多加糖'
        },
        {
          'id': 4,
          'name': '多加个糖'
        },
        {
          'id': 5,
          'name': '不加奶'
        },
        {
          'id': 6,
          'name': '不加糖'
        },
        {
          'id': 7,
          'name': '不加奶'
        },
        {
          'id': 8,
          'name': '不加糖'
        },
        {
          'id': 9,
          'name': '不加糖'
        }
      ]
    },
    {
      'id': 3,
      'price': 15,
      'name': '泡奶特浓咖啡',
      'nowPrice': 10,
      'count': 99,
      'others': [
        {
          'id': 1,
          'name': '不加冰'
        },
        {
          'id': 2,
          'name': '少冰'
        },
        {
          'id': 3,
          'name': '多加冰'
        }
      ]
    },
    {
      'id': 4,
      'price': 15,
      'name': '伯爵配奶茶',
      'nowPrice': 10,
      'count': 99,
      'others': [
        {
          'id': 1,
          'name': '不加糖'
        },
        {
          'id': 2,
          'name': '少糖'
        },
        {
          'id': 3,
          'name': '不加柠檬'
        }
      ]
    },
    {
      'id': 5,
      'price': 15,
      'name': '草莓味奶茶',
      'nowPrice': 10,
      'count': 99,
      'others': [
        {
          'id': 1,
          'name': '一片柠檬'
        },
        {
          'id': 2,
          'name': '两片柠檬'
        },
        {
          'id': 3,
          'name': '不加柠檬'
        }
      ]
    },
    {
      'id': 6,
      'price': 15,
      'name': '苹果鲜榨',
      'nowPrice': 10,
      'count': 99
    },
    {
      'id': 7,
      'price': 15,
      'name': '芒果汁',
      'nowPrice': 10,
      'count': 99
    },
    {
      'id': 8,
      'price': 15,
      'name': '冰镇拿铁特浓精选咖啡小杯',
      'nowPrice': 10,
      'count': 99
    },
    {
      'id': 9,
      'price': 15,
      'name': '鲜榨西瓜汁',
      'nowPrice': 10,
      'count': 99
    },
    {
      'id': 10,
      'price': 15,
      'name': '金桔柠檬茶',
      'nowPrice': 10,
      'count': 99
    },
    {
      'id': 11,
      'price': 15,
      'name': '鲜榨柠檬水',
      'nowPrice': 10,
      'count': 99
    },
    {
      'id': 12,
      'price': 15,
      'name': '乳酪奶茶',
      'nowPrice': 10,
      'count': 99
    },
    {
      'id': 13,
      'price': 15,
      'name': '巧克力奶茶',
      'nowPrice': 10,
      'count': 99
    },
    {
      'id': 14,
      'price': 15,
      'name': '风味鲜奶',
      'nowPrice': 10,
      'count': 99
    },
    {
      'id': 15,
      'price': 15,
      'name': '香芋奶茶',
      'nowPrice': 10,
      'count': 99
    },
    {
      'id': 16,
      'price': 15,
      'name': '热薄荷茶',
      'nowPrice': 10,
      'count': 99
    },
    // {
    //   'id': 17,
    //   'price': 15,
    //   'name': '意大利红茶',
    //   'nowPrice': 10
    // },
    // {
    //   'id': 18,
    //   'price': 15,
    //   'name': '墨西哥咖啡',
    //   'nowPrice': 10
    // },
    // {
    //   'id': 19,
    //   'price': 15,
    //   'name': '德国紫米露',
    //   'nowPrice': 10
    // }
  ]
})

Mock.mock(/getTopbarList/, {
  'errcode': 0,
  'errmsg': 'error',
  'data': [
    {
      'id': 1,
      'name': '全部'
    },
    {
      'id': 2,
      'name': '汉堡包套餐'
    },
    {
      'id': 3,
      'name': '饮料'
    },
    {
      'id': 4,
      'name': '披萨'
    },
    {
      'id': 5,
      'name': '甜品'
    },
    {
      'id': 6,
      'name': '咖啡'
    },
    {
      'id': 7,
      'name': '可乐'
    }
  ]
})
