<template>
  <div style="display:flex;">
    <!-- 菜单列表区域 -->
    <div class="index-order">
      <div class="index-order-top">
        <div class="left" @click="changeType">
          <span v-if="!showType">外带</span>
          <span v-if="showType">堂食</span>
          <span class="tran"></span>
        </div>
        <div class="right" @click="changeMode">
          <span v-if="!showMode">点</span>
          <span v-if="showMode">退</span>
        </div>
      </div>
      <div class="index-order-input">
        <input type="text" placeholder="数量/台卡号/现金/订单号"
          v-model="inputNum">
        <div class="inputClear" v-if="inputNum != ''"
          @click="handleChearInput">x</div>
      </div>
      <div class="index-order-con">
        <ul>
          <li v-for="(item, index) in menuList" :keys="item.id"
            @click="handleSelectMenu(index)"
            :class="{'active': index === nowMenuIndex}">
            <div class="info">
              <span>{{ item.name }}</span>
              <span>{{ item.num }}</span>
              <span>{{ item.price }}.00</span>
            </div>
            <div class="others" v-if="item.others">
              <span>备注：{{ item.others }}</span>
              <span v-if="index === nowMenuIndex">X</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="index-order-total">
        <span>消费合计：</span>
        <span>0.00</span>
      </div>
      <div class="index-order-else">
        <span>现金退款：</span>
        <span>0.00</span>
      </div>
    </div>

    <!-- 点菜操作区域 -->
    <div class="index-option">
      <div class="index-option-topbar">
        <ul class="data">
          <li v-for="(item, index) in topbarList"
            @click="handleSelectTopbar(index)"
            :class="{'active': nowTopbarIndex === index}">
            <a href="javascript:;">{{ item.name }}</a>
          </li>
        </ul>
        <ul class="table">
          <li></li><li></li><li></li><li></li><li></li><li>&gt;</li>
        </ul>
      </div>
      <div class="index-option-con">
        <div class="con">
          <div class="option-item" v-for="item in orderList"
            :keys="item.id" @click="handleAddDish(item)">
            <div class="item-price" v-if="item.price">
              {{ item.price }}.00
            </div>
            <div class="item-name">{{ item.name }}</div>
            <div class="item-real-price" v-if="item.realPrice">
              特价：{{ item.realPrice }}.00
            </div>
          </div>
        </div>
        <table>
          <tr><td></td><td></td><td></td><td></td><td></td></tr>
          <tr><td></td><td></td><td></td><td></td><td></td></tr>
          <tr><td></td><td></td><td></td><td></td><td></td></tr>
          <tr><td></td><td></td><td></td><td></td>
            <td class="next">&gt;</td>
          </tr>
        </table>
      </div>
      <div class="index-option-else">
        <div class="con">
          <div class="else-item" v-for="item in 4">
            不加冰
          </div>
        </div>
        <table>
          <tr><td></td><td></td><td></td><td></td>
            <td class="else-right">&gt;</td>
          </tr>
        </table>
      </div>
      <div class="index-option-handle">
        <table class="handle-keyboard1">
          <tr v-for="tr in keyboard1List">
            <td v-for="td in tr" :keys="td.id"
              @click="handleInputNum(td)">
              {{ td.name }}
            </td>
          </tr>
        </table>
        <table class="handle-keyboard2">
          <tr>
            <td rowspan="2">数量</td>
            <td>台卡号</td>
            <td>优惠</td>
          </tr>
          <tr>
            <td>挂单</td>
            <td>取单</td>
          </tr>
          <tr>
            <td @click="handleDeleteDish">删除</td>
            <td>反结</td>
            <td>开钱箱</td>
          </tr>
        </table>
        <table class="handle-keyboard3">
          <tr>
            <td>现金</td>
            <td>移动<br>支付</td>
          </tr>
          <tr>
            <td>团购券</td>
            <td>银行卡</td>
          </tr>
          <tr>
            <td>会员卡</td>
            <td>
              <div style="transform: rotate(90deg);">&gt;</div>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      showType: false,
      showMode: false,
      inputNum: '',
      nowMenuIndex: -1,
      nowTopbarIndex: 0,
      menuList: [],
      orderList: [],
      topbarList: [],
      keyboard1List: [
        [
          {
            id: 1,
            name: '7'
          },
          {
            id: 2,
            name: '8'
          },
          {
            id: 3,
            name: '9'
          }
        ],
        [
          {
            id: 4,
            name: '4'
          },
          {
            id: 5,
            name: '5'
          },
          {
            id: 6,
            name: '6'
          }
        ],
        [
          {
            id: 7,
            name: '1'
          },
          {
            id: 8,
            name: '2'
          },
          {
            id: 9,
            name: '3'
          }
        ],
        [
          {
            id: 10,
            name: '0'
          },
          {
            id: 11,
            name: '.'
          },
          {
            id: 12,
            name: '←'
          }
        ]
      ]
    }
  },
  created () {
    this.getDatas()
  },
  methods: {
    getDatas () {
      this.getOrderList()
      this.getTopbarList()
    },
    getOrderList () {
      axios.get('http://localhost:8080/getOrderList')
        .then(res => {
          if (res.data.errcode === 0) {
            this.orderList = res.data.data
          } else {
            console.log(res.data.errmsg)
          }
        })
        .catch(err => console.log(err))
    },
    getTopbarList () {
      axios.get('http://localhost:8080/getTopbarList')
        .then(res => {
          if (res.data.errcode === 0) {
            this.topbarList = res.data.data
          } else {
            console.log(res.data.errmsg)
          }
        })
        .catch(err => console.log(err))
    },
    handleAddDish (dish) {
      // 获取输入框里的值（菜品数量）
      let dishCount
      if (this.inputNum === '') {
        dishCount = 1
      } else {
        if (Number(this.inputNum) === 0) {
          console.log('菜品数量不能为0')
          this.inputNum = ''
          return
        }
        if (this.inputNum.indexOf('.') != -1) {
          console.log('含有小数点')
          this.inputNum = ''
          return
        }
        dishCount = Number(this.inputNum)
      }

      if (this.menuList.length === 0) { // menuList 为空时直接加菜
        if (dishCount > 999) {
          console.log('单个菜品总数量不能超过999')
          this.inputNum = ''
          return
        }
        dish.num = dishCount
        this.menuList.push(dish)
        this.nowMenuIndex = 0
      } else { // menuList 不为空，判断里面时候包含当前 dish
        let flag = false
        let j = 0
        for (let i=0;i<this.menuList.length;i++) {
          if (dish.id === this.menuList[i].id) {
            flag = true
            j = i
          }
        }
        if (flag) { // 包含的话，找到这个菜 num +1
          if (this.menuList[j].num + dishCount > 999) {
            console.log('单个菜品总数量不能超过999')
            this.inputNum = ''
            return
          }
          this.menuList[j].num += dishCount
          let item = this.menuList[j]
          this.menuList.splice(j, 1, item)
          this.nowMenuIndex = j
        } else { // 不包含的话，直接添加新菜
          if (dishCount > 999) {
            console.log('单个菜品总数量不能超过999')
            this.inputNum = ''
            return
          }
          dish.num = dishCount
          this.menuList.push(dish)
          this.nowMenuIndex = this.menuList.length - 1
        }
      }

      // 清空输入框
      this.inputNum = ''
    },
    handleSelectMenu (index) {
      if (this.nowMenuIndex === index) {
        this.nowMenuIndex = -1
      } else {
        this.nowMenuIndex = index
      }
    },
    handleInputNum (td) {
      if (td.id === 12) {
        this.inputNum = this.inputNum.substring(0, this.inputNum.length-1)
      } else {
        this.inputNum = this.inputNum + td.name
      }
    },
    handleSelectTopbar (index) {
      this.nowTopbarIndex = index
    },
    changeType () {
      this.showType = !this.showType
    },
    changeMode () {
      this.showMode = !this.showMode
    },
    handleDeleteDish () {
      if (this.nowMenuIndex != -1) {
        this.menuList.splice(this.nowMenuIndex, 1)
        this.nowMenuIndex = -1
      }
    },
    handleChearInput () {
      this.inputNum = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.index-order {
  width: 320px;
  height: 748px;
  margin-right: 10px;
  margin-top: 10px;
  .index-order-top {
    height: 60px;
    border: 1px solid $border-color-lighter;
    border-bottom: none;
    background-color: #f5f5f5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    div {
      // border: 1px solid red;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 20px;
      font-size: 22px;
      color: $primary-color;
      font-weight: bold;
    }
    div.left {
      span.tran {
        width: 0;
        height: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 5px solid $primary-color;
        margin-left: 5px;
      }
    }
    div.right {
      padding-right: 40px;
      span {
        width: 24px;
        height: 24px;
        border: 2px solid $primary-color;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 18px;
      }
    }
  }
  .index-order-input {
    height: 60px;
    border: 1px solid $border-color-lighter;
    border-bottom: none;
    position: relative;
    input {
      border: none;
      height: 100%;
      width: 100%;
      font-size: 20px;
      padding: 0 10px;
      box-sizing: border-box;
    }
    .inputClear {
      position: absolute;
      right: 0;
      top: 0;
      height: 100%;
      width: 40px;
      color: #DBDBDB;
      font-size: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .index-order-con {
    height: 514px;
    border: 1px solid $border-color-lighter;
    border-bottom: none;
    overflow-y: scroll;
    ul {
      padding-bottom: 50px;
      li {
        border-bottom: 1px solid #f5f5f5;
        .info{
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 5px;
          color: #666666;
          span:nth-child(1) {
            width: 160px;
          }
        }
        .others {
          color: #cfcfcf;
          padding: 5px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          span:nth-child(2) {
            padding: 0 15px;
          }
        }
      }
      li.active {
        background-color: #f5f5f5;
      }
    }
  }
  .index-order-total {
    height: 50px;
    border: 1px solid $border-color-lighter;
    border-bottom: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
  }
  .index-order-else {
    height: 60px;
    background-color: $primary-color;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    color: #fff;
  }
}
.index-option {
  width: 614px;
  height: 748px;
  margin-right: 10px;
  margin-top: 10px;
  .index-option-topbar {
    height: 60px;
    margin-bottom: 10px;
    position: relative;
    .data {
      display: flex;
      position: absolute;
      li {
        margin-right: 7px;
        a {
          height: 60px;
          width: 96px;
          font-size: 18px;
          color: #315886;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
        }
      }
      li.active a {
        background-color: #3D778F;
        color: #fff;
      }
    }
    .table {
      display: flex;
      li {
        height: 60px;
        width: 96px;
        margin-right: 7px;
        font-size: 18px;
        color: #315886;
        background-color: #cee6ee;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
      }
      li:nth-child(6) {
        margin-right: 0;
      }
    }
  }
  .index-option-con {
    position: relative;
    .con {
      display: flex;
      flex-wrap: wrap;
      position: absolute;
      width: 100%;
      height: 100%;
      .option-item {
        width: 20%;
        height: 100px;
        display: flex;
        flex-direction: column;
        .item-price {
          flex: 1;
          color: #9e9e9e;
          text-align: right;
          padding-right: 5px;
        }
        .item-name {
          flex: 2;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
        }
        .item-real-price {
          flex: 1;
          color: #ed7e38;
          font-size: 14px;
          padding-left: 5px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }
      }
    }
    table {
      border-collapse: collapse;
      width: 100%;
      tr td {
        background-color: #f5f5f5;
        border: 1px solid $border-color-lighter;
        width: 20%;
        height: 100px;
        box-sizing: border-box;
      }
      td.next {
        text-align: center;
        font-size: 30px;
        color: #666666;
      }
    }
  }
  .index-option-else {
    position: relative;
    margin-bottom: 10px;
    .con {
      display: flex;
      flex-wrap: wrap;
      position: absolute;
      width: 100%;
      height: 100%;
      .else-item {
        box-sizing: border-box;
        width: 20%;
        color: #fff;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    table {
      border-collapse: collapse;
      width: 100%;
      tr td {
        background-color: #f5f5f5;
        border: 1px solid $border-color-lighter;
        width: 20%;
        height: 60px;
        box-sizing: border-box;
        background-color: #ffb03b;
        color: #fff;
      }
      td.else-right {
        text-align: center;
      }
    }
  }
  .index-option-handle {
    height: 207px;
    display: flex;
    .handle-keyboard1 {
      height: 100%;
      width: 180px;
      tr td {
        border: 1px solid $border-color-lighter;
        width: 33.33%;
        text-align: center;
        font-size: 30px;
        color: #6a6a6a;
        background-color: #f4f4f4;
      }
    }
    .handle-keyboard2 {
      height: 100%;
      width: 260px;
      tr td {
        background-color: #72a6ba;
        width: 33.33%;
        height: 33.33%;
        text-align: center;
        font-size: 20px;
        color: #fff;
      }
    }
    .handle-keyboard3 {
      height: 100%;
      width: 174px;
      tr td {
        background-color: $primary-color;
        width: 33.33%;
        height: 33.33%;
        text-align: center;
        font-size: 20px;
        color: #fff;
      }
    }
  }
}
</style>
