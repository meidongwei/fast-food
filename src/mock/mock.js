import Mock from 'mockjs'

Mock.mock(/getOrderList/, {
  'errcode': 0,
  'errmsg': 'error',
  'data': [
    {
      'id': 1,
      'price': 15,
      'name': '卡布奇诺',
      'realPrice': 10
    },
    {
      'id': 2,
      'price': 15,
      'name': '低糖卡布奇诺',
      'realPrice': 10,
      'others': '不加糖'
    },
    {
      'id': 3,
      'price': 15,
      'name': '泡奶特浓咖啡',
      'realPrice': 10
    },
    {
      'id': 4,
      'price': 15,
      'name': '伯爵配奶茶',
      'realPrice': 10
    },
    {
      'id': 5,
      'price': 15,
      'name': '草莓味奶茶',
      'realPrice': 10
    },
    {
      'id': 6,
      'price': 15,
      'name': '苹果鲜榨',
      'realPrice': 10
    },
    {
      'id': 7,
      'price': 15,
      'name': '芒果汁',
      'realPrice': 10
    },
    {
      'id': 8,
      'price': 15,
      'name': '冰镇拿铁特浓精选咖啡小杯',
      'realPrice': 10
    },
    {
      'id': 9,
      'price': 15,
      'name': '鲜榨西瓜汁',
      'realPrice': 10
    },
    {
      'id': 10,
      'price': 15,
      'name': '金桔柠檬茶',
      'realPrice': 10
    },
    {
      'id': 11,
      'price': 15,
      'name': '鲜榨柠檬水',
      'realPrice': 10
    },
    {
      'id': 12,
      'price': 15,
      'name': '乳酪奶茶',
      'realPrice': 10
    },
    {
      'id': 13,
      'price': 15,
      'name': '巧克力奶茶',
      'realPrice': 10
    },
    {
      'id': 14,
      'price': 15,
      'name': '风味鲜奶',
      'realPrice': 10
    },
    {
      'id': 15,
      'price': 15,
      'name': '香芋奶茶',
      'realPrice': 10
    },
    {
      'id': 16,
      'price': 15,
      'name': '热薄荷茶',
      'realPrice': 10
    },
    // {
    //   'id': 17,
    //   'price': 15,
    //   'name': '意大利红茶',
    //   'realPrice': 10
    // },
    // {
    //   'id': 18,
    //   'price': 15,
    //   'name': '墨西哥咖啡',
    //   'realPrice': 10
    // },
    // {
    //   'id': 19,
    //   'price': 15,
    //   'name': '德国紫米露',
    //   'realPrice': 10
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
    // {
    //   'id': 6,
    //   'name': '咖啡'
    // }
  ]
})
