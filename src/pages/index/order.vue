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
          @click="handleClearInput">x</div>
      </div>
      <div class="index-order-con">
        <ul class="main">
          <li v-for="(item, index) in menuList" :keys="item.id"
            @click="handleSelectMenu(item, index)"
            :class="{'active': index === nowMenuIndex}">
            <div class="info">
              <span class="desc" v-if="item.contain && showSub">-</span>
              <span class="desc" v-if="item.contain && !showSub">+</span>
              <span class="name">{{ item.name }}</span>
              <span class="num">{{ item.num }}</span>
              <span class="price">{{ item.price*item.num }}.00</span>
            </div>
            <ul class="sub" v-if="item.contain && showSub">
              <li v-for="(subItem, subIndex) in item.contain" :keys="subItem.id"
                @click.stop="handleSelectSubMenu(subIndex, index)"
                :class="{'subActive': subIndex === nowSubMenuIndex}">
                <div class="info">
                  <span class="name">{{ subItem.name }}</span>
                  <span class="num">{{ subItem.count }}</span>
                </div>
                <div class="others" v-if="subItem.others">
                  <span>
                    备注：{{ subItem.others | prettifyList }}
                  </span>
                  <span v-if="subIndex === nowSubMenuIndex"
                    @click.stop="handleClearSubOthers">X</span>
                </div>
              </li>
            </ul>
            <div class="others" v-if="item.others">
              <span>
                备注：{{ item.others | prettifyList }}
              </span>
              <span v-if="index === nowMenuIndex"
                @click.stop="handleClearOthers">X</span>
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
        <ul class="table table-data">
          <li v-for="item in topbarList"
            @click="handleSelectTopbar(item.id)"
            :class="{'active': nowTopbarIndex === item.id}">
            <a href="javascript:;">{{ item.name }}</a>
          </li>
        </ul>
        <ul class="table">
          <li></li><li></li><li></li><li></li><li></li>
          <li class="next" @click="handleTopbarNext">&gt;</li>
        </ul>
      </div>
      <div class="index-option-con">
        <div class="table table-data">
          <div class="option-item" v-for="item in orderList"
            :keys="item.id" @click="handleAddDish(item)">
            <div class="item-price">
              {{ item.price }}.00
            </div>
            <div class="item-name">{{ item.name }}</div>
            <div class="item-real-price">
              特价：{{ item.nowPrice }}.00
            </div>
          </div>
        </div>
        <div class="table">
          <div></div><div></div><div></div><div></div><div></div>
          <div></div><div></div><div></div><div></div><div></div>
          <div></div><div></div><div></div><div></div><div></div>
          <div></div><div></div><div></div><div></div>
          <div class="next" @click="handleOrderNext">&gt;</div>
        </div>
      </div>
      <div class="index-option-else">
        <div class="table table-data">
          <div v-for="(item, index) in othersList" :keys="index"
            @click="handleAddOthers(item)">
            {{ item.name }}
          </div>
        </div>
        <div class="table">
          <div></div><div></div><div></div><div></div>
          <div class="next" @click="handleElseNext">&gt;</div>
        </div>
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
            <td rowspan="2" @click="handleUpdateDishCount">数量</td>
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
            <td @click="handleGetSpareGold">移动<br>支付</td>
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
      othersPageNum: 1,
      othersPageSize: 4,
      othersList: [],
      showSub: true,
      showType: false,
      showMode: false,
      inputNum: '',
      nowMenuIndex: -1,
      nowSubMenuIndex: -1,
      nowTopbarIndex: 1,
      menuList: [],
      orderList: [],
      orderListSource: [],
      topbarPageNum: 1,
      topbarPageSize: 5,
      topbarList: [],
      topbarListSource: [],
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
  computed: {
  },
  watch: {
    /**
     * 监听当前是否有菜品选中，如果没有选中，则清空 othersList
     * 如果有选中，需要再判断数据源里面有没有备注信息
     * 如果没有备注信息，则清空 othersList
     * 如果有备注信息，则截取前4项赋值给 othersList
     */
    nowMenuIndex (index) {
      if (index != -1) {
        let id = this.menuList[index].id
        if (this.orderListSource[id-1].others) {
          let list = this.orderListSource[id-1].others
          this.othersList = list.slice(0, 4)
        } else {
          this.othersList = []
        }
      } else {
        this.othersList = []
      }
    }
  },
  created () {
    this.getDatas()
  },
  filters: {
    prettifyList (list) {
      return list.toString()
    }
  },
  methods: {
    getDatas () {
      this.getOrderList()
      this.getTopbarList()
    },
    getOrderList () {
      axios.get('http://localhost:8080/getOrderList')
        .then(res => {
          this.orderListSource = res.data.data
          if (res.data.errcode === 0) {
            let list = JSON.parse(JSON.stringify(res.data.data))
            // 删除所有备注信息
            list.forEach(item => {
              delete item.others
              if (item.contain) {
                item.contain.forEach(subItem => {
                  delete subItem.others
                })
              }
            })
            this.orderList = list
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
             this.topbarListSource = res.data.data
             this.topbarList = this.topbarListSource.slice(0, 5)
          } else {
            console.log(res.data.errmsg)
          }
        })
        .catch(err => console.log(err))
    },
    handleAddDish (dish) {
      // 点击时清除子选项的状态
      this.nowSubMenuIndex = -1
      let newDish = JSON.parse(JSON.stringify(dish))
      // 获取输入框里的值（菜品数量）
      // dishCount 也可以设置为从服务器获取数据（即放在data中）
      let dishCount
      // 过滤输入框的值
      if (this.inputNum === '') {
        dishCount = 1
      } else {
        if (Number(this.inputNum) === 0) {
          this.$toast('数量不能为0')
          this.inputNum = ''
          return
        }
        if (this.inputNum.indexOf('.') != -1) {
          this.$toast('不能包含小数点')
          this.inputNum = ''
          return
        }
        dishCount = Number(this.inputNum)
      }

      if (this.menuList.length === 0) { // menuList 为空时直接加菜
        if (dishCount > 999) {
          this.$toast('总数量不能超过999')
          this.inputNum = ''
          return
        }

        newDish.num = dishCount
        this.menuList.push(newDish)
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
            this.$toast('总数量不能超过999')
            this.inputNum = ''
            return
          }
          this.menuList[j].num += dishCount
          let item = this.menuList[j]
          this.menuList.splice(j, 1, item)
          this.nowMenuIndex = j
        } else { // 不包含的话，直接添加新菜
          if (dishCount > 999) {
            this.$toast('总数量不能超过999')
            this.inputNum = ''
            return
          }

          newDish.num = dishCount
          this.menuList.push(newDish)
          this.nowMenuIndex = this.menuList.length - 1
        }
      }

      // 清空输入框
      this.inputNum = ''
    },

    // 修改菜品数量
    handleUpdateDishCount () {
      let dishCount
      if (this.inputNum != '') {
        // 过滤输入框的值
        if (Number(this.inputNum) === 0) {
          this.$toast('数量不能为0')
          this.inputNum = ''
          return
        }
        if (this.inputNum.indexOf('.') != -1) {
          this.$toast('不能包含小数点')
          this.inputNum = ''
          return
        }
        dishCount = Number(this.inputNum)

        // 获取当前选中菜品的id
        let index = this.nowMenuIndex
        let id = this.menuList[index].id

        this.menuList.forEach(item => {
          if (id === item.id) {
            item.num = dishCount
          }
        })
        this.inputNum = ''
      }
    },

    handleSelectMenu (item, index) {
      if (item.contain) {
        if (this.nowMenuIndex === index) {
          this.nowMenuIndex = -1
          this.showSub = false
          this.nowSubMenuIndex = -1
        } else {
          this.nowMenuIndex = index
          this.showSub = true
        }
      } else {
        if (this.nowMenuIndex === index) {
          this.nowMenuIndex = -1
        } else {
          this.nowMenuIndex = index
          this.nowSubMenuIndex = -1
        }
      }
    },
    handleSelectSubMenu (subIndex, index) {
      this.nowMenuIndex = index
      if (this.nowSubMenuIndex === subIndex) {
        this.nowSubMenuIndex = -1
      } else {
        this.nowSubMenuIndex = subIndex
      }
    },
    handleInputNum (td) {
      if (td.id === 12) {
        this.inputNum = this.inputNum.substring(0, this.inputNum.length-1)
      } else {
        this.inputNum = this.inputNum + td.name
      }
    },
    handleSelectTopbar (id) {
      this.nowTopbarIndex = id
    },
    changeType () {
      this.showType = !this.showType
    },
    changeMode () {
      this.showMode = !this.showMode
    },
    handleDeleteDish () {
      if (this.nowMenuIndex != -1) {
        // 从 menuList 中删除菜品
        this.menuList.splice(this.nowMenuIndex, 1)
        // 设置为当前不选中状态
        this.nowMenuIndex = -1
      }
    },
    handleClearInput () {
      this.inputNum = ''
    },
    handleClearOthers () {
      let index = this.nowMenuIndex
      let item = this.menuList[index]
      delete item.others
      this.menuList.splice(index, 1, item)
    },
    handleClearSubOthers () {
      let index = this.nowMenuIndex
      let item = this.menuList[index]
      let subIndex = this.nowSubMenuIndex
      let subItem = item.contain[subIndex]
      delete subItem.others
      item.contain.splice(subIndex, 1, subItem)
    },

    // 菜品添加备注
    handleAddOthers (data) {

      let index = this.nowMenuIndex
      let subIndex = this.nowSubMenuIndex
      let item = this.menuList[index]
      let oList = []
      oList.push(data.name)

      // ps: index 为 0
      if (index != -1) {
        if (item.contain) {
          // 判断子选项是否被选中
          if (subIndex != -1) {
            // 给子选项设置备注
            let subItem = item.contain[subIndex]
            this.addSubOthers(subIndex, subItem, oList, index)
          } else {
            this.$toast('不能直接给套餐添加备注')
          }
        } else {
          // 给父选项添加备注
          this.addOthers(index, item, oList)
        }
      }


    },

    // 添加父级备注
    addOthers (index, item, oList) {
      if (item.others) {
        let flag = false

        for (let i=0;i<item.others.length;i++) {
          if (item.others[i] === oList[0]) {
            flag = true
            break
          }
        }

        if (flag) {
          this.$toast('重复了！')
        } else {
          item.others = item.others.concat(oList)
        }

      } else {
        item.others = oList
      }
      this.menuList.splice(index, 1, item)
    },

    // 添加子级备注
    addSubOthers (subIndex, subItem, oList, index) {
      if (subItem.others) {
        let flag = false

        for (let i=0;i<subItem.others.length;i++) {
          if (subItem.others[i] === oList[0]) {
            flag = true
            break
          }
        }

        if (flag) {
          this.$toast('重复了！')
        } else {
          subItem.others = subItem.others.concat(oList)
        }

      } else {
        subItem.others = oList
      }
      this.menuList[index].contain.splice(subIndex, 1, subItem)
    },

    // 获取下一页的备注信息
    handleElseNext () {
      /**
       * 当点击下一页备注信息按钮时，先判断当前是否有菜品选中
       * 如果没有选中任何菜品，则清空 othersList
       * 如果有选中，需要再判断数据源里面有没有备注信息
       * 如果没有备注信息，不做任何操作，如果有备注信息
       * 则获取下一页的备注信息列表，如果列表为空，则显示第一页
       * 如果不为空，则 othersPageNum += 1
       */
      let index = this.nowMenuIndex
      if (index != -1) {
        let id = this.menuList[index].id
        if (this.orderListSource[id-1].others) {
          let list = this.orderListSource[id-1].others
          let nextPageNum = this.othersPageNum + 1
          let startIndex = nextPageNum * this.othersPageSize - this.othersPageSize
          let endIndex = nextPageNum * this.othersPageSize
          let nextList = list.slice(startIndex, endIndex)
          if (nextList.length === 0) {
            this.othersPageNum = 1
            this.othersList = list.slice(0, 4)
          } else {
            this.othersPageNum += 1
            this.othersList = nextList
          }
        }
      } else {
        this.othersList = []
      }
    },

    // 获取下一页的菜品信息
    handleOrderNext () {
      this.$toast('：）', 1500)
    },

    // 获取下一页的菜品分类信息
    handleTopbarNext () {
      let list = this.topbarListSource
      let nextPageNum = this.topbarPageNum + 1
      let startIndex = nextPageNum * this.topbarPageSize - this.topbarPageSize
      let endIndex = nextPageNum * this.topbarPageSize
      let nextList = list.slice(startIndex, endIndex)
      if (nextList.length === 0) {
        this.topbarPageNum = 1
        this.topbarList = list.slice(0, 5)
      } else {
        this.topbarPageNum += 1
        nextList.unshift(list[0])
        this.topbarList = nextList
      }
    },

    // 开班领备用金
    handleGetSpareGold () {
      console.log('get spare gold')
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
      padding: 0 40px 0 10px;
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
    .main {
      li {
        border-bottom: 1px solid #f5f5f5;
        .info {
          display: flex;
          align-items: center;
          padding: 8px 5px;
          color: #666666;
          padding-left: 20px;
          padding-right: 10px;
          position: relative;
          span.desc {
            position: absolute;
            left: 5px;
          }
          span.name {
            width: 160px;
            margin-right: 10px;
            // color: #000000;
            font-weight: bold;
          }
          span.num {
            width: 40px;
            text-align: right;
            margin-right: 10px;
          }
          span.price {
            width: 68px;
            text-align: right;
          }
        }
        .sub {
          li {
            border-bottom: none;
            .info span.name{
              color: #868686;
              font-weight: normal;
            }
          }
          li.subActive {
            background-color: #f0f0f0;
          }
        }
        .others {
          color: #cccccc;
          font-size: 14px;
          padding: 5px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          span:nth-child(1) {
            padding-left: 15px;
          }
          span:nth-child(2) {
            padding: 0 15px;
          }
        }
      }
      li.active {
        background-color: #f8f8f8;
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
    .table.table-data {
      position: absolute;
      li {
        // background-color: yellow;
        a {
          width: 100%;
          height: 100%;
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
        width: 98px;
        margin-right: 5px;
        font-size: 18px;
        color: #315886;
        background-color: #cee6ee;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
      }
      li.next {
        margin-right: 0;
      }
      li.next:active {
        background-color: #bbd9e3;
      }
    }
  }
  .index-option-con {
    position: relative;
    .table-data {
      position: absolute;
      .option-item {
        display: flex;
        flex-direction: column;
        .item-price {
          flex: 1;
          width: 100%;
          color: #9e9e9e;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          padding-right: 5px;
        }
        .item-name {
          flex: 2;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
        }
        .item-real-price {
          flex: 1;
          width: 100%;
          color: #ed7e38;
          font-size: 14px;
          padding-left: 5px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }
      }
      .option-item:active {
        background-color: #eeeeee;
      }
    }
    .table {
      display: flex;
      flex-wrap: wrap;
      border-left: 1px solid $border-color-lighter;
      border-top: 1px solid $border-color-lighter;
      width: 100%;
      > div {
        background-color: #f5f5f5;
        border-right: 1px solid $border-color-lighter;
        border-bottom: 1px solid $border-color-lighter;
        width: 20%;
        height: 100px;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      div.next {
        font-size: 30px;
        z-index: 999;
      }
      div.next:active {
        background-color: #eeeeee;
      }
    }
  }
  .index-option-else {
    position: relative;
    margin-bottom: 10px;
    .table {
      display: flex;
      border-left: 1px solid $border-color-lighter;
      width: 100%;
      div {
        border-right: 1px solid $border-color-lighter;
        border-bottom: 1px solid $border-color-lighter;
        width: 20%;
        height: 60px;
        box-sizing: border-box;
        color: #fff;
        background-color: #ffb03b;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      div.next {
        font-size: 20px;
      }
      div.next:active {
        background-color: #eca133;
      }
    }
    .table-data {
      // new
      position: absolute;
      width: 80%;
      div {
        // new
        background-color: none;
        width: 25%;
      }
      div:active {
        background-color: #eca133;
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
