<template>
  <div style="display:flex;">

    <!-- 菜单列表区域 -->
    <div class="index-order">
      <div class="index-order-top">
        <div class="left" @click="changeType">
          <span v-if="!showType">堂食</span>
          <span v-if="showType">外带</span>
          <span class="tran"></span>
        </div>
        <div class="right" @click="changeMode">
          <span v-if="!showMode">点</span>
          <span v-if="showMode" :class="{tui: showMode}">退</span>
        </div>
      </div>
      <div class="index-order-input">
        <input type="text" placeholder="数量/台卡号/现金/订单号"
          v-model="inputNum">
        <div class="inputClear" v-if="inputNum != ''"
          @click="handleClearInput">X</div>
      </div>
      <div class="index-order-con" ref="viewRef">
        <div class="index-order-desknum"
          v-if="isShowDeskNum" ref="deskNumRef">
          <div>台卡号：{{ deskNum }}</div>
          <div class="desknum-clear"
            @click="handleDeleteDeskNum">X</div>
        </div>
        <ul class="main" ref="contentRef">
          <li v-for="(item, index) in menuList" :keys="item.id"
            @click="handleSelectMenu(item, index)"
            :class="{'active': item.id === nowMenuId}">
            <div class="info">
              <span class="desc" v-if="item.contain && item.id === nowMenuId">-</span>
              <span class="desc" v-if="item.contain && item.id != nowMenuId">+</span>
              <span class="name">{{ item.name }}</span>
              <span class="num">{{ item.count }}</span>
              <span class="price">{{ item.price*item.count }}.00</span>
            </div>
            <!-- 子菜单及备注 -->
            <ul class="sub" v-if="item.contain && item.id === nowMenuId">
              <li v-for="(subItem, subIndex) in item.contain" :keys="subItem.id"
                @click.stop="handleSelectSubMenu(subItem.id, item.id, subIndex, index)"
                :class="{'subActive': subItem.id === nowSubMenuId}">
                <div class="info">
                  <span class="name">{{ subItem.name }}</span>
                  <span class="num">{{ subItem.count }}</span>
                </div>
                <div class="others" v-if="subItem.others">
                  <span>
                    备注：{{ subItem.others | prettifyList }}
                  </span>
                  <span v-if="subItem.id === nowSubMenuId"
                    @click.stop="handleClearSubOthers">X</span>
                </div>
              </li>
            </ul>
            <!-- 主菜单及备注 -->
            <div class="others" v-if="item.others">
              <span>
                备注：{{ item.others | prettifyList }}
              </span>
              <span v-if="item.id === nowMenuId"
                @click.stop="handleClearOthers">X</span>
            </div>
          </li>
          <li class="divider" v-if="menuList.length != 0">
            -- 我是有底线的 --
          </li>
        </ul>
        <div :style="{height: kongHeight + 'px'}"></div>
      </div>
      <div class="index-order-total"
        v-if="isShowTotal" ref="totalRef">
        <div class="cell">
          <span>消费合计：</span>
          <span>{{ totalPrice }}.00</span>
        </div>
        <div class="cell">
          <span>特价优惠：</span>
          <span>{{ totalPrice }}.00</span>
        </div>
        <div class="cell">
          <span>赠送优惠：</span>
          <span>{{ totalPrice }}.00</span>
        </div>
      </div>
      <div class="index-order-else">
        <div class="left">
          <span>尚欠金额：</span>
          <span>0.00</span>
        </div>
        <a href="javascript:;" @click="handleScroll">向下</a>
      </div>
    </div>

    <!-- 点菜操作区域 -->
    <div class="index-option">
      <div class="index-option-topbar">
        <ul class="table table-data">
          <li v-for="item in topbarList" :keys="item.id"
            @click="handleSelectTopbar(item.id)"
            :class="{'active': nowTopbarId === item.id}">
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
            :keys="item.id" @click="handleAddDish(item)"
            :class="[{bgColor1: item.type === 2}, {bgColor2: item.type === 3},
            {bgColor3: item.type === 4}, {bgColor4: item.type === 5},
            {bgColor5: item.type === 6}, {bgColor6: item.type === 6001},
            {bgColor7: item.type === 6002}]">
            <div class="item-price">
              {{ item.price }}.00
            </div>
            <div class="item-name">{{ item.name }}</div>
            <div class="item-footer">
              <div class="item-real-price" v-if="item.vip === 2">
                特价：{{ item.nowPrice }}.00
              </div>
              <div class="item-real-price" v-if="item.vip === 1">
                vip：{{ item.nowPrice }}.00
              </div>
              <div class="item-sheng" v-if="item.count">
                剩：{{ item.count }}
              </div>
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
            <td @click="handleAddDeskNum">台卡号</td>
            <td>优惠</td>
          </tr>
          <tr>
            <td @click="handleGuadan">挂单</td>
            <td @click="handleQudan">取单</td>
          </tr>
          <tr>
            <td @click="handleDeleteDish">删除</td>
            <td>反结</td>
            <td @click="handleOpenMoneyBox">开钱箱</td>
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

    <MoneyBox :isShow="isShowMoneyBox"
      @toBigMoney="toBigMoney"
      @openBigMoneyBox="openBigMoneyBox"></MoneyBox>
    <BigMoneyDialog :isShow="isShowBigMoneyDialog"
      @close="handleCloseBigMoney"
      @getBigMoney="handleGetBigMoney"></BigMoneyDialog>
    <QudanDialog :isShow="isShowQudanDialog"
      @close="handleCloseQudan" @deleteItemOfQudan="deleteItemOfQudan"
      @selectItemOfQudan="selectItemOfQudan"
      :listSource="qudanList"></QudanDialog>
  </div>
</template>

<script>
import axios from 'axios'
import MoneyBox from '@/components/dialog/moneyBox'
import BigMoneyDialog from '@/components/dialog/bigMoneyDialog'
import QudanDialog from '@/components/dialog/qudanDialog'
export default {
  components: {
    MoneyBox,
    BigMoneyDialog,
    QudanDialog
  },
  data () {
    return {
      // 点菜的菜品数量
      dishCount: 1,
      kongHeight: 0,
      isShowTotal: false,
      deskNum: '',
      isShowDeskNum: false,
      qudanId: 1,
      qudanList: [],
      isShowQudanDialog: false,
      isShowBigMoneyDialog: false,
      isShowMoneyBox: false,

      showType: false,
      showMode: false,
      inputNum: '',

      listSource: [],

      othersPageNum: 1,
      othersPageSize: 4,
      othersList: [],

      nowMenuId: -1,
      nowMenuIndex: -1,
      nowSubMenuId: -1,
      nowSubMenuIndex: -1,

      nowTopbarId: 1,
      menuList: [],

      orderPageNum: 1,
      orderPageSize: 19,
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
    totalPrice () {
      let total = 0
      this.menuList.forEach(item => {
        let price = item.count * item.price
        total += price
      })
      return total
    }
  },
  watch: {
    /**
     * 显示菜品备注信息
     * 监听当前是否有菜品选中，如果没有选中，则清空 othersList
     * 如果有选中，需要再判断数据源里面有没有备注信息
     * 如果没有备注信息，则清空 othersList
     * 如果有备注信息，则截取前4项赋值给 othersList
     */
    nowMenuId (id) {
      if (id != -1) {
        this.orderListSource.forEach(item => {
          if (id === item.id) {
            if (item.others) {
              this.othersList = item.others.slice(0, 4)
            } else {
              this.othersList = []
            }
          }
        })
      } else {
        this.othersList = []
      }
    },

    // 监听 qudanList 如果为空则关闭取单窗口
    qudanList (list) {
      if (list.length === 0) {
        this.isShowQudanDialog = false
      }
    },

    /**
     * 消费合计模块显示的时候，获取其高度，赋值给 kongHeight
     * kongHeight：填充内容区域的空白，对比 handleScroll 方法理解
     */
    isShowTotal (isShow) {
      if (isShow) {
        this.$nextTick(() => {
          this.kongHeight = this.$refs.totalRef.clientHeight
        })
      }
    },

    // 如果 menuList 有数据，则显示消费合计模块
    menuList (menuList) {
      if (menuList.length != 0) {
        this.isShowTotal = true
      } else {
        this.isShowTotal = false
      }
    }
  },
  created () {
    this.getOrderList()
  },
  filters: {
    prettifyList (list) {
      return list.toString()
    }
  },
  methods: {

    // 获取菜品数据
    getOrderList () {
      axios.get('http://localhost:8080/getOrderList')
        .then(res => {
          if (res.data.errcode === 0) {
            // 获取一级分类
            this.listSource = res.data.data
            let list = JSON.parse(JSON.stringify(this.listSource))
            list.forEach(item => {
              delete item.contain
              this.topbarListSource.push(item)
            })
            this.topbarList = this.topbarListSource.slice(0, 5)

            // 获取“全部”菜品 this.orderListSource
            // type：1 全部，type：2 套餐，type：3 普通一级类
            let listTemp = []
            this.listSource.forEach(item => {
              // 套餐 + 普通一级类
              if (item.type != 1) {
                // 套餐
                if (item.type === 2) {
                  item.contain.forEach(subItem => {
                    listTemp.push(subItem)
                  })
                } else if (item.type === 3) { // 普通一级类
                  item.contain.forEach(subItem => {
                    // 包含二级类
                    if (subItem.contain) {
                      subItem.contain.forEach(subItem2 => {
                        listTemp.push(subItem2)
                      })
                    } else { // 普通一级类
                      listTemp.push(subItem)
                    }
                  })
                }
              }
            })
            this.orderListSource = listTemp

            // 删除所有备注信息
            let orderList = JSON.parse(JSON.stringify(this.orderListSource))
            orderList.forEach(item => {
              delete item.others
              if (item.contain) {
                item.contain.forEach(subItem => {
                  delete subItem.others
                })
              }
            })

            // 赋值给 this.orderList
            this.orderList = orderList.slice(0, 20)

          } else {
            console.log(res.data.errmsg)
          }

        })
        .catch(err => console.log(err))
    },

    // 点击菜品，添加一个菜
    handleAddDish (dish) {
      // 点击时清除子选项的状态
      this.nowSubMenuId = -1
      let newDish = JSON.parse(JSON.stringify(dish))
      // 获取输入框里的值（菜品数量）
      // 过滤输入框的值
      if (this.inputNum != '') {
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
        this.dishCount = Number(this.inputNum)
      } else {
        this.dishCount = 1
      }

      // menuList 为空时直接加菜
      if (this.menuList.length === 0) {
        if (this.dishCount > 999) {
          this.$toast('总数量不能超过999')
          this.inputNum = ''
          return
        }

        newDish.count = this.dishCount
        this.menuList.push(newDish)
        // 一级菜单默认选中，并且点套餐时，默认打开套餐内容
        this.nowMenuId = newDish.id
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

        // 包含的话，找到这个菜 count +1
        if (flag) {
          if (this.menuList[j].count + this.dishCount > 999) {
            this.$toast('总数量不能超过999')
            this.inputNum = ''
            return
          }
          this.menuList[j].count += this.dishCount
          let item = this.menuList[j]
          this.menuList.splice(j, 1, item)
          // 一级菜单默认选中，并且点套餐时，默认打开套餐内容
          this.nowMenuId = newDish.id
          this.nowMenuIndex = j
        } else { // 不包含的话，直接添加新菜
          if (this.dishCount > 999) {
            this.$toast('总数量不能超过999')
            this.inputNum = ''
            return
          }

          newDish.count = this.dishCount
          this.menuList.push(newDish)
          // 一级菜单默认选中，并且点套餐时，默认打开套餐内容
          this.nowMenuId = newDish.id
          this.nowMenuIndex = this.menuList.length - 1
        }
      }

      // 清空输入框
      this.inputNum = ''
    },

    // 修改菜品数量
    handleUpdateDishCount () {
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
        this.dishCount = Number(this.inputNum)

        // 修改数量的时候菜品必须被选中
        if (this.nowMenuId === -1) {
          this.$toast('未选中菜品！')
          return
        }

        this.menuList.forEach(item => {
          if (this.nowMenuId === item.id) {
            item.count = this.dishCount
          }
        })
        this.inputNum = ''
      }
    },

    // 点击左侧一级菜单
    handleSelectMenu (item, index) {
      // 点击之前，一级菜单已经选中
      if (this.nowMenuId === item.id) {
        if (item.contain) {
          this.nowMenuId = -1
          this.nowMenuIndex = -1
          this.nowSubMenuId = -1
        } else {
          this.nowMenuId = -1
          this.nowMenuIndex = -1
        }
      } else { // 点击之前，一级菜单未被选中
        this.nowMenuId = item.id
        this.nowMenuIndex = index
        this.nowSubMenuId = -1
      }
    },

    // 点击左侧二级菜单
    handleSelectSubMenu (subId, id, subIndex, index) {
      this.nowMenuId = id
      this.nowMenuIndex = index
      if (this.nowSubMenuId === subId) {
        this.nowSubMenuId = -1
        this.nowSubMenuIndex = -1
      } else {
        this.nowSubMenuId = subId
        this.nowSubMenuIndex = subIndex
      }
    },

    // 点击小键盘1触发的方法
    handleInputNum (td) {
      if (td.id === 12) {
        this.inputNum = this.inputNum.substring(0, this.inputNum.length-1)
      } else {
        this.inputNum = this.inputNum + td.name
      }
    },

    // 切换菜品类别
    handleSelectTopbar (id) {
      /**
       * 每次切换的时候，需要重置菜品信息页码为1
       * bug 回顾：“全部”状态下，点击下一页（orderPageNum 这时为2了）
       * 再点击其他一级菜品分类（有分页的），再点击此分类的下一页（无效）
       */
      this.orderPageNum = 1
      this.nowTopbarId = id
      // 点击“全部”按钮
      if (id === 1) {
        let orderList = JSON.parse(JSON.stringify(this.orderListSource))
        // 删除所有备注信息
        orderList.forEach(item => {
          delete item.others
          if (item.contain) {
            item.contain.forEach(subItem => {
              delete subItem.others
            })
          }
        })
        this.orderList = orderList.slice(0, 20)
      } else { // 点击的非“全部”按钮
        this.listSource.forEach(item => {
          if (id === item.id) {
            let list = item.contain
            let newList = []
            for (let i=0;i<list.length;i++) {
              // 普通菜品
              if (list[i].price) {
                newList.push(list[i])
              } else { // 还有分类
                newList.push(...list[i].contain)
              }
            }
            this.orderList = newList.slice(0, 20)
            // this.orderList = item.contain.slice(0, 20)
          }
        })
      }
    },

    // 切换堂食/外带
    changeType () {
      this.showType = !this.showType
    },

    // 切换点菜/退菜模式
    changeMode () {
      this.showMode = !this.showMode
    },

    // 删除菜品
    handleDeleteDish () {
      if (this.nowMenuIndex != -1) {
        // 从 menuList 中删除菜品
        this.menuList.splice(this.nowMenuIndex, 1)
        // 设置为当前不选中状态
        this.nowMenuIndex = -1
      }
    },

    // 清空输入框
    handleClearInput () {
      this.inputNum = ''
    },

    // 删除一级菜单备注
    handleClearOthers () {
      let index = this.nowMenuIndex
      let item = this.menuList[index]
      delete item.others
      this.menuList.splice(index, 1, item)
    },

    // 删除二级菜单备注
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
        let id = this.nowMenuId
        this.orderListSource.forEach(item => {
          if (id === item.id) {
            if (item.others) {
              let list = item.others
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
          }
        })
      } else {
        this.othersList = []
      }
    },

    // 获取下一页的菜品信息
    handleOrderNext () {
      let id = this.nowTopbarId
      // 创建一个 list 变量来存储当前 orderList 的数据
      let list = []
      // 当前状态为“全部”时
      if (id === 1) {
        let orderList = JSON.parse(JSON.stringify(this.orderListSource))
        for (let i=0;i<orderList.length;i++) {
          // 普通菜品
          if (orderList[i].price) {
            list.push(orderList[i])
          } else { // 还有分类
            list.push(...orderList[i].contain)
          }
        }
      } else { // 当前状态为非“全部”时
        this.listSource.forEach(item => {
          if (id === item.id) {
            let list2 = item.contain
            let newList = []
            for (let i=0;i<list2.length;i++) {
              // 普通菜品
              if (list2[i].price) {
                newList.push(list2[i])
              } else { // 还有分类
                newList.push(...list2[i].contain)
              }
            }
            list = newList.slice(0, 20)
          }
        })
      }

      let nextPageNum = this.orderPageNum + 1
      let startIndex = nextPageNum * this.orderPageSize - this.orderPageSize
      let endIndex = nextPageNum * this.orderPageSize
      let nextList = list.slice(startIndex, endIndex)
      if (nextList.length === 0) {
        this.orderPageNum = 1
        this.orderList = list.slice(0, 20)
      } else {
        this.orderPageNum += 1
        this.orderList = nextList
      }
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

    // 开钱箱
    handleOpenMoneyBox () {
      this.isShowMoneyBox = true
    },

    // 到取大钞页
    toBigMoney () {
      this.isShowMoneyBox = false
      this.isShowBigMoneyDialog = true
    },

    // 开钱箱
    openBigMoneyBox () {
      this.isShowMoneyBox = false
    },

    // 关闭取大钞窗口
    handleCloseBigMoney () {
      this.isShowBigMoneyDialog = false
    },

    // 取大钞
    handleGetBigMoney (val) {
      this.isShowBigMoneyDialog = false
      console.log('取大钞：' + val)
    },

    // 取单
    handleQudan () {
      let list = JSON.parse(localStorage.getItem('list'))
      if (!list || list.length === 0) {
        this.$toast('还没有挂单！')
        return
      }
      if (list.length === 1) {
        this.menuList = list[0].data
      } else {
        this.isShowQudanDialog = true
        this.qudanList = list
      }
    },

    // 关闭取单
    handleCloseQudan () {
      this.isShowQudanDialog = false
    },

    // 挂单
    handleGuadan () {
      if (this.menuList.length === 0) {
        return
      }

      let t = new Date()
      let h = t.getHours()
      let m = t.getMinutes()
      let s = t.getSeconds()
      let date = h + ':' + m + ':' + s
      let deskNum = 102

      let menulist = {
        id: this.qudanId,
        deskNum: deskNum,
        date: date,
        data: this.menuList
      }
      this.qudanList.push(menulist)

      localStorage.setItem('list', JSON.stringify(this.qudanList))
      this.menuList = []
      this.qudanId += 1
    },

    // 删除取单列表里的某一项
    deleteItemOfQudan (id) {
      let list = this.qudanList
      for (let i=0;i<list.length;i++) {
        if (list[i].id === id) {
          list.splice(i, 1)
        }
      }
      localStorage.setItem('list', JSON.stringify(this.qudanList))
    },

    // 取一个单
    selectItemOfQudan (item) {
      this.isShowQudanDialog = false
      this.menuList = item.data
      let list = this.qudanList
      for (let i=0;i<list.length;i++) {
        if (list[i].id === item.id) {
          list.splice(i, 1)
        }
      }
      localStorage.setItem('list', JSON.stringify(this.qudanList))
    },

    // 添加台卡号
    handleAddDeskNum () {
      if (this.inputNum === '') {
        return
      }
      if (this.inputNum.indexOf('.') != -1) {
        this.$toast('不能包含小数点')
        this.inputNum = ''
        return
      }
      if (this.inputNum.length > 4) {
        this.inputNum = ''
        this.$toast('请输入4位以内的台卡号！')
        return
      }
      this.deskNum = this.inputNum
      this.isShowDeskNum = true
      this.inputNum = ''
    },

    // 删除台卡号
    handleDeleteDeskNum () {
      this.deskNum = ''
      this.isShowDeskNum = false
    },

    // 向下滚动一段距离
    handleScroll () {
      // 获取 dom 对象
      let content  = this.$refs.contentRef
      let deskNum = this.$refs.deskNumRef
      let view = this.$refs.viewRef

      // 获取可视区域的高度
      let viewHeight = view.clientHeight

      // 计算内容区域的高度
      let contentHeight
      if (deskNum) {
        contentHeight = content.clientHeight + deskNum.clientHeight + this.kongHeight
      } else {
        contentHeight = content.clientHeight + this.kongHeight
      }

      if (viewHeight + view.scrollTop < contentHeight) {
        view.scrollBy(0, 50)
      } else {
        view.scrollTo(0, 0)
      }
    },

    //



  }
}
</script>

<style lang="scss" scoped>
.index-order {
  width: 320px;
  height: 748px;
  margin-right: 10px;
  margin-top: 10px;
  position: relative;
  .index-order-top {
    height: 60px;
    border: 1px solid $border-color-lighter;
    border-bottom: none;
    background-color: #f5f5f5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    div {
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
      span.tui {
        color: #F45358;
        border: 2px solid #F45358;
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
    height: 563px;
    border: 1px solid $border-color-lighter;
    border-bottom: none;
    overflow-y: scroll;
    .index-order-desknum {
      border-bottom: 1px solid $border-color-lighter;
      background-color: #f8f8f8;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-left: 10px;
      height: 40px;
      box-sizing: border-box;
      .desknum-clear {
        color: #DBDBDB;
        font-size: 16px;
        box-sizing: border-box;
        padding: 0 15px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
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
      li.divider {
        text-align: center;
        font-size: 12px;
        color: #dfdfdf;
        border-bottom: none;
        padding: 10px 0;
      }
    }
  }
  .index-order-total {
    border: 1px solid $border-color-lighter;
    border-bottom: none;
    box-sizing: border-box;
    padding: 5px 0;
    position: absolute;
    bottom: 62px;
    width: 100%;
    background-color: #fff;
    .cell {
      height: 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;
    }
  }
  .index-order-else {
    height: 60px;
    background-color: $primary-color;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    .left {
      height: 100%;
      box-sizing: border-box;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;
    }
    a {
      border-left: 1px solid #25957C;
      background-color: $primary-color;
      height: 100%;
      width: 100px;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
    }
    a:active {
      background-color: #25957C;
    }
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
        .item-footer {
          flex: 1;
          width: 100%;
          color: #ed7e38;
          font-size: 12px;
          box-sizing: border-box;
          padding-left: 5px;
          padding-right: 5px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }
      .option-item:active {
        background-color: #eeeeee;
      }
      .bgColor1 {
        background-color: #dafff7;
      }
      .bgColor2 {
        background-color: #f0ffda;
      }
      .bgColor3 {
        background-color: #ffdaea;
      }
      .bgColor4 {
        background-color: #d0ffe0;
      }
      .bgColor5 {
        background-color: #fff5da;
      }
      .bgColor6 {
        background-color: #ffdada;
      }
      .bgColor7 {
        background-color: #dbdaff;
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
        z-index: 1;
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
