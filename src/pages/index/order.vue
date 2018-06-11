<template>
  <div style="display:flex;">

    <!-- 菜单区域 -->
    <div class="index-order">

      <!-- 堂食/外带、点菜/退菜区域 -->
      <div class="index-order-top">
        <div class="left" @click="handleChangeTS">
          <span v-if="!isShowTS">堂食</span>
          <span v-if="isShowTS">外带</span>
          <span class="tran"></span>
        </div>
        <div class="right" @click="handleChangeDishMode">
          <span v-if="!isShowMode">点</span>
          <span v-if="isShowMode" :class="{tui: isShowMode}">退</span>
        </div>
      </div>

      <!-- input 区域 -->
      <div class="index-order-input">
        <input type="text" placeholder="数量/台卡号/现金/订单号"
          v-model="inputNum">
        <div class="inputClear" v-if="inputNum != ''"
          @click="handleClearInput">X</div>
      </div>

      <!-- 菜单列表区域 -->
      <div class="index-order-con">
        <div class="view" ref="viewRef">
          <div class="index-order-desknum" v-if="isShowDeskNum" ref="deskNumRef">
            <div>台卡号：{{ deskNum }}</div>
            <div class="desknum-clear" @click="handleDeleteDeskNum">X</div>
          </div>
          <ul class="main" ref="mainRef">
            <li v-for="(item, index) in menuList" :key="item.id"
              @click="handleSelectMenu(item, index)"
              :class="{'active': item.id === nowMenuId}">
              <div class="info">
                <span class="desc" v-if="item.contain && item.id === nowMenuId">-</span>
                <span class="desc" v-if="item.contain && item.id != nowMenuId">+</span>
                <span class="name">{{ item.name }}</span>
                <span class="num">{{ item.count }}</span>
                <span class="price">{{ item.price*item.count }}</span>
              </div>
              <!-- 子菜单及备注 -->
              <ul class="sub" v-if="item.contain && item.id === nowMenuId">
                <li v-for="(subItem, subIndex) in item.contain" :key="subItem.id"
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
        </div>
        <!-- 支付列表区域 -->
        <div class="index-order-payList" v-if="isShowPayList" ref="payListRef">
          <div class="cell">
            <span>消费合计：</span>
            <span>{{ totalPrice }}</span>
          </div>
          <div class="cell">
            <span>特价优惠：</span>
            <span>0</span>
          </div>
          <div class="cell">
            <span>赠送优惠：</span>
            <span>0</span>
          </div>
          <div class="cell" v-for="(item, index) in payList" :key="index"
            @click="handleSelectPayitem(item, index)"
            :class="{payActive: index === nowPayitemIndex}">
            <span>{{ item.name }}</span>
            <span>{{ item.price }}</span>
          </div>
        </div>
      </div>

      <!-- 尚欠金额、翻页区域 -->
      <div class="index-order-else">
        <div class="left" v-if="smallChange === 0">
          <span>尚欠金额：</span>
          <span>{{ owePrice }}</span>
        </div>
        <div class="left" v-if="smallChange > 0">
          <span>找零：</span>
          <span>{{ smallChange }}</span>
        </div>
        <a href="javascript:;" @click="handleScroll">向下</a>
      </div>

    </div>

    <!-- 点菜操作区域 -->
    <div class="index-option">

      <!-- 菜类区域 -->
      <div class="index-option-topbar">
        <ul class="table table-data">
          <li v-for="item in topbarList" :key="item.id"
            @click="handleChangeDishType(item.id)"
            :class="{'active': nowTopbarId === item.id}">
            <a href="javascript:;">{{ item.name }}</a>
          </li>
        </ul>
        <ul class="table">
          <li></li><li></li><li></li><li></li><li></li>
          <li class="next" @click="handleDishTypeNext">&gt;</li>
        </ul>
      </div>

      <!-- 菜品信息区域 -->
      <div class="index-option-con">
        <div class="table table-data">
          <div class="option-item" v-for="item in orderList"
            :key="item.id" @click="handleAddDish(item)"
            :class="[{bgColor1: item.type === 2}, {bgColor2: item.type === 3},
            {bgColor3: item.type === 4}, {bgColor4: item.type === 5},
            {bgColor5: item.type === 6}, {bgColor6: item.type === 6001},
            {bgColor7: item.type === 6002}]">
            <div class="item-price">
              {{ item.price }}
            </div>
            <div class="item-name">{{ item.name }}</div>
            <div class="item-footer">
              <div class="item-real-price" v-if="item.vip === 2">
                特价：{{ item.nowPrice }}
              </div>
              <div class="item-real-price" v-if="item.vip === 1">
                vip：{{ item.nowPrice }}
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

      <!-- 备注区域 -->
      <div class="index-option-else">
        <div class="table table-data">
          <div v-for="(item, index) in othersList" :key="index"
            @click="handleAddOthers(item)">
            {{ item.name }}
          </div>
        </div>
        <div class="table">
          <div></div><div></div><div></div><div></div>
          <div class="next" @click="handleOthersNext">&gt;</div>
        </div>
      </div>

      <!-- 操控选项区域 -->
      <div class="index-option-handle">
        <table class="handle-keyboard1">
          <tr v-for="tr in keyboardList">
            <td v-for="td in tr" :key="td.id"
              @click="handleInputNum(td)">
              {{ td.value }}
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
            <td @touchstart="clickStart"
              @touchend="clickEnd">删除</td>
            <td>反结</td>
            <td @click="handleOpenMoneyBoxDialog">开钱箱</td>
          </tr>
        </table>
        <table class="handle-keyboard3">
          <tr>
            <td @click="handlePay">现金</td>
            <td>移动<br>支付</td>
          </tr>
          <tr>
            <td>团购券</td>
            <td>银行卡</td>
          </tr>
          <tr>
            <td @click="handleOpenMemLockDialog">会员卡</td>
            <td>
              <div style="transform: rotate(90deg);">&gt;</div>
            </td>
          </tr>
        </table>
      </div>
    </div>


    <!-- 弹框组件区域：所有的弹框组件放在下方 -->
    <!-- 钱箱弹框 -->
    <MoneyBox :isShow="isShowMoneyBoxDialog" @gotoBigMoney="gotoBigMoney"
      @close="handleCloseMoneyBoxDialog"
      @handleOpenMoneyBox="handleOpenMoneyBox">
    </MoneyBox>

    <!-- 取大钞弹框 -->
    <BigMoneyDialog :isShow="isShowBigMoneyDialog"
      @close="handleCloseBigMoney"
      @getBigMoney="handleGetBigMoney">
    </BigMoneyDialog>

    <!-- 取单弹框 -->
    <QudanDialog :isShow="isShowQudanDialog"
      @close="handleCloseQudan" @deleteItemOfQudan="deleteItemOfQudan"
      @selectItemOfQudan="selectItemOfQudan"
      :listSource="qudanList">
    </QudanDialog>

    <!-- 有辅菜组的套餐弹框 -->
    <TaocanDialog :isShow="isShowTaocanDialog"
      :dish="taocanDish"
      @close="handleCloseTaocanDialog">
    </TaocanDialog>

    <!-- 长按确认删除订单吗 -->
    <GeneralDialog :isShow="isShowDeleteMenuListDialog" title="温馨提示"
      text="确认删除订单吗？" @close="handleCloseDeleteMenuListDialog"
      @submit="handleDeleteMenuList">
    </GeneralDialog>

    <!-- 时段菜谱发生变化 -->
    <GeneralDialog2 :isShow="isShowShiduanDialog" title="温馨提示"
      text="时段菜谱发生变化" btnText="我知道了" @close="handleCloseShiduanDialog">
    </GeneralDialog2>

    <!-- 显示输入会员卡账号窗口 -->
    <KeyboardDialog :isShow="isShowMemCardNumDialog" title="会员卡"
      placeholder="请刷卡/输入会员卡号/输入手机号" :keyboardList="keyboardList"
      @close="handleCloseMemLockDialog" @submit="gotoMemPage">
    </KeyboardDialog>

    <!-- 会员卡列表窗口 -->
    <MemCardListDialog :isShow="isShowMemCardListDialog"
      @close="handleCloseMemCardListDialog">
    </MemCardListDialog>
  </div>
</template>

<script>
import axios from 'axios'
import MoneyBox from '@/components/dialog/moneyBox'
import BigMoneyDialog from '@/components/dialog/bigMoneyDialog'
import QudanDialog from '@/components/dialog/qudanDialog'
import TaocanDialog from '@/components/dialog/taocanDialog'
import GeneralDialog from '@/components/dialog/generalDialog'
import GeneralDialog2 from '@/components/dialog/generalDialog2'
import KeyboardDialog from '@/components/dialog/keyboardDialog'
import MemCardListDialog from '@/components/dialog/memCardListDialog'
export default {
  components: {
    MoneyBox, BigMoneyDialog, QudanDialog, TaocanDialog,
    GeneralDialog, GeneralDialog2, KeyboardDialog,
    MemCardListDialog
  },
  data () {
    return {
      isShowMemCardListDialog: false,
      tmpPrice: 0,
      nowPayitemIndex: -1,
      // 支付列表（点餐列表下方）
      payList: [],
      // 是否显示会员卡账号窗口
      isShowMemCardNumDialog: false,
      // 支付的部分金额
      partPrice: 0,
      // 找零金额
      smallChange: 0,

      isShowDeleteMenuListDialog: false,
      // 长按时间戳
      stampStart: 0,
      stampEnd: 0,

      // 是否显示时段变化提示
      isShowShiduanDialog: false,
      taocanDish: null,
      isShowTaocanDialog: false,
      // 点菜的菜品数量
      dishCount: 1,
      isShowPayList: false,
      deskNum: '',
      isShowDeskNum: false,
      qudanId: 1,
      qudanList: [],
      isShowQudanDialog: false,
      isShowBigMoneyDialog: false,
      isShowMoneyBoxDialog: false,

      isShowTS: false,
      isShowMode: false,
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

      keyboardList: [
        [
          {
            id: 1,
            value: '7'
          },
          {
            id: 2,
            value: '8'
          },
          {
            id: 3,
            value: '9'
          }
        ],
        [
          {
            id: 4,
            value: '4'
          },
          {
            id: 5,
            value: '5'
          },
          {
            id: 6,
            value: '6'
          }
        ],
        [
          {
            id: 7,
            value: '1'
          },
          {
            id: 8,
            value: '2'
          },
          {
            id: 9,
            value: '3'
          }
        ],
        [
          {
            id: 10,
            value: '0'
          },
          {
            id: 11,
            value: '.'
          },
          {
            id: 12,
            value: '←'
          }
        ]
      ]
    }
  },
  computed: {
    // 总消费金额
    totalPrice () {
      let total = 0
      this.menuList.forEach(item => {
        let price = item.count * item.price
        total += price
      })
      return total
    },

    // 尚欠款=总消费金额-特价-赠送-支付的部分金额
    owePrice () {
      return this.totalPrice - 0 - 0 - this.partPrice
    },

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

    // 如果 menuList 有数据，则显示支付列表
    menuList (menuList) {
      if (menuList.length != 0) {
        this.isShowPayList = true
      } else {
        this.isShowPayList = false
      }
    },

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

    // 获取数据
    getDatas () {
      axios.get('http://localhost:8080/getDatas')
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
      // this.nowSubMenuId = -1
      // 支付完成之后，再点新菜，需重置找零金额为0
      this.smallChange = 0
      // 支付过程中添加新菜的判断
      if (this.payList.length != 0) {
        this.$toast('请先撤销支付款项！')
        return
      }

      let newDish = JSON.parse(JSON.stringify(dish))

      // 如果是有辅菜组套餐
      if (newDish.assist) {
        this.taocanDish = newDish
        this.isShowTaocanDialog = true
        return
      }

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
        // 如果添加的是套餐，则里面的明细菜也添加数量
        if (newDish.contain) {
          newDish.contain.forEach(item => {
            item.count = this.dishCount
          })
        }
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
          // 如果是套餐，则里面的明细菜也添加数量
          if (item.contain) {
            item.contain.forEach(subItem => {
              subItem.count += this.dishCount
            })
          }
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

        if (this.dishCount > 999) {
          this.$toast('总数量不能超过999')
          this.inputNum = ''
          return
        }

        // 修改数量的时候菜品必须被选中
        if (this.nowMenuId === -1) {
          this.$toast('未选中菜品！')
          return
        }

        this.menuList.forEach(item => {
          if (this.nowMenuId === item.id) {
            item.count = this.dishCount
            // 如果是套餐，则明细菜也修改数量
            if (item.contain) {
              item.contain.forEach(subItem => {
                subItem.count = this.dishCount
              })
            }
          }
        })
        this.inputNum = ''
      }
    },

    // 点击左侧一级菜单
    handleSelectMenu (item, index) {
      // 先清空支付列表的选中状态
      this.nowPayitemIndex = -1
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

    // 点击 keyboard1 默认输入到 input 中
    handleInputNum (td) {
      if (td.id === 12) {
        this.inputNum = this.inputNum.substring(0, this.inputNum.length-1)
      } else {
        this.inputNum = this.inputNum + td.value
      }
    },

    // 切换菜品类别
    handleChangeDishType (id) {
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
    handleChangeTS () {
      this.isShowTS = !this.isShowTS
    },

    // 切换点菜/退菜模式
    handleChangeDishMode () {
      this.isShowMode = !this.isShowMode
    },

    // 长按删除订单
    clickStart () {
      this.stampStart = new Date().getTime()
      clearInterval(this.Loop)
      this.Loop = setTimeout(() => {
        if (this.menuList.length === 0) {
          this.$toast('没有订单')
        } else {
          // 支付过程中删除订单的判断
          if (this.payList.length != 0) {
            this.$toast('请先撤销支付款项！')
            return
          }
          this.isShowDeleteMenuListDialog = true
        }
      }, 1000)
    },

    // 短按删除菜品/支付款项
    clickEnd () {
      clearInterval(this.Loop)
      this.stampEnd = new Date().getTime()
      if (this.stampEnd - this.stampStart < 1000) {

        // 首先要判断是否有支付款项（支付过程中删除菜品的判断）
        if (this.payList.length != 0) {
          // 支付款项被选中的话，删除当前支付选项
          if (this.nowPayitemIndex != -1) {
            for (let i=0;i<this.payList.length;i++) {
              if (this.nowPayitemIndex === i) {
                this.payList.splice(i, 1)
              }
            }
            // 删除之后，重置当前选中项状态为-1
            this.nowPayitemIndex = -1
            // 删除之后，需要更新 partPrice，即更新 owePrice（尚欠金额）
            this.partPrice -= this.tmpPrice
            // 打开钱箱的操作
          }
          // 菜品被选中，支付款项未被选中
          if (this.nowMenuIndex != -1) {
            this.$toast('请先撤销支付款项！')
            return
          }
        }

        // 没有支付列表的话直接删除菜品
        if (this.nowMenuIndex != -1) {
          // 从 menuList 中删除菜品
          this.menuList.splice(this.nowMenuIndex, 1)
          // 设置为当前不选中状态
          this.nowMenuIndex = -1
          this.nowMenuId = -1
        }
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

    // 添加备注到父级
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

    // 添加备注到子级
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
    handleOthersNext () {
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
    handleDishTypeNext () {
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

    // 点击“开钱箱”按钮，打开钱箱弹窗
    handleOpenMoneyBoxDialog () {
      this.isShowMoneyBoxDialog = true
    },

    // 关闭钱箱的弹窗
    handleCloseMoneyBoxDialog () {
      this.isShowMoneyBoxDialog = false
    },

    // 打开钱箱
    handleOpenMoneyBox () {
      this.isShowMoneyBoxDialog = false
      this.$toast('打开钱箱')
    },

    // 到取大钞弹窗
    gotoBigMoney () {
      this.isShowMoneyBoxDialog = false
      this.isShowBigMoneyDialog = true
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

    // 点击取单按钮
    handleQudan () {
      let list = JSON.parse(localStorage.getItem('list'))
      if (!list || list.length === 0) {
        this.$toast('还没有挂单！')
        return
      }
      if (list.length === 1) {
        this.menuList = list[0].data
        this.qudanList = []
        localStorage.setItem('list', JSON.stringify(this.qudanList))
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
        this.$toast('还没有订单')
        return
      }

      if (this.payList.length != 0) {
        this.$toast('请先撤销支付款项！')
        return
      }

      let t = new Date()
      let h = t.getHours()
      let m = t.getMinutes()
      let s = t.getSeconds()
      let date = h + ':' + m + ':' + s

      let menulist = {
        id: this.qudanId,
        deskNum: this.deskNum,
        date: date,
        data: this.menuList
      }
      this.qudanList.push(menulist)

      localStorage.setItem('list', JSON.stringify(this.qudanList))
      this.menuList = []
      this.qudanId += 1

      this.deskNum = ''
      this.isShowDeskNum = false
    },

    // 删除取单列表里的一个订单
    deleteItemOfQudan (id) {
      let list = this.qudanList
      for (let i=0;i<list.length;i++) {
        if (list[i].id === id) {
          list.splice(i, 1)
        }
      }
      localStorage.setItem('list', JSON.stringify(this.qudanList))
    },

    // 取单，在窗口中取一个订单
    selectItemOfQudan (item) {
      this.isShowQudanDialog = false
      this.menuList = item.data
      if (item.deskNum != '') {
        this.deskNum = item.deskNum
        this.isShowDeskNum = true
      }
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
      let main  = this.$refs.mainRef
      let deskNum = this.$refs.deskNumRef
      let view = this.$refs.viewRef

      // 获取可视区域的高度
      let viewHeight = view.clientHeight

      // 计算内容区域的高度
      let conHeight
      if (deskNum) {
        conHeight = main.clientHeight + deskNum.clientHeight
      } else {
        conHeight = main.clientHeight
      }

      if (viewHeight + view.scrollTop < conHeight) {
        view.scrollBy(0, 50)
      } else {
        view.scrollTo(0, 0)
      }
    },

    // 关闭套餐窗口
    handleCloseTaocanDialog () {
      this.isShowTaocanDialog = false
    },

    // 关闭“时段菜谱发生变化”窗口
    handleCloseShiduanDialog () {
      this.isShowShiduanDialog = false
    },

    // 关闭“确认删除订单吗”窗口
    handleCloseDeleteMenuListDialog () {
      this.isShowDeleteMenuListDialog = false
    },

    // 确认删除订单
    handleDeleteMenuList () {
      this.menuList = []
      this.deskNum = ''
      this.isShowDeskNum = false
      this.isShowDeleteMenuListDialog = false
    },

    // 现金支付
    handlePay () {
      // 如果账单为空，则 return
      if (this.menuList.length === 0) {
        this.$toast('账单为空！')
        // 重置找零金额为0
        this.smallChange = 0
        this.inputNum = ''
        return
      }

      // 过滤输入的值
      if (this.inputNum === '.') {
        this.$toast('输入错误！')
        this.inputNum = ''
        return
      }

      // 未输入金额，默认现金支付全部款
      let num = Number(this.inputNum)
      if (this.inputNum === '') {
        this.menuList = [] // （总价）totalPrice 为 0
        this.partPrice = 0 // （部分金额）owePrice 为 0
        this.deskNum = ''
        this.isShowDeskNum = false
        this.inputNum = ''
        this.isShowMoneyBoxDialog = true
      } else {
        if (num > this.owePrice) { // 超额支付现金
          this.smallChange = num - this.owePrice
          this.menuList = []
          this.deskNum = ''
          this.isShowDeskNum = false
          this.inputNum = ''
          this.isShowMoneyBoxDialog = true
        } else if (num < this.owePrice) { // 支付部分现金
          if (num === 0) {
            this.inputNum = ''
            this.$toast('不能为0')
            return
          }
          this.partPrice += num
          this.inputNum = ''
        } else { // 支付金额刚刚好
          this.menuList = []
          this.partPrice = 0
          this.deskNum = ''
          this.isShowDeskNum = false
          this.inputNum = ''
          this.isShowMoneyBoxDialog = true
        }
      }

      // 添加支付信息到 payList
      let item = {
        name: '现金',
        price: num
      }
      this.payList.push(item)
    },

    // 点击“会员卡”按钮
    handleOpenMemLockDialog () {
      this.isShowMemCardNumDialog = true
    },

    // 关闭会员卡窗口
    handleCloseMemLockDialog () {
      this.isShowMemCardNumDialog = false
    },

    // 跳转到会员卡页面
    gotoMemPage () {
      this.isShowMemCardNumDialog = false
      this.isShowMemCardListDialog = true
      // 如果只有一张卡则直接打开，
      // 如果有多张会员卡则跳转到选择会员卡的页面
    },

    // 关闭选择会员卡页面
    handleCloseMemCardListDialog () {
      this.isShowMemCardListDialog = false
    },

    // 选择支付列表的一项
    handleSelectPayitem (item, index) {
      this.nowPayitemIndex = index
      // 取消所有菜品的选中状态
      this.nowMenuIndex = -1
      this.nowMenuId = -1
      this.nowSubMenuIndex = -1
      this.nowSubMenuId = -1

      // 将当前选中项的 price 同步到临时属性 tmpPrice
      // 解决用户删除选项时，尚欠金额显示不正常的情况
      this.tmpPrice = item.price
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
    display: flex;
    flex-direction: column;
    .view {
      flex: 1;
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
    .index-order-payList {
      flex: 0 0 auto;
      border-top: 1px solid $border-color-lighter;
      box-sizing: border-box;
      padding: 5px 0;
      width: 100%;
      background-color: #fff;
      .cell {
        height: 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
      }
      .cell.payActive {
        background-color: #f5f5f5;
      }
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
      tr td:active {
        background-color: #e0e0e0;
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
      tr td:active {
        background-color: #5d8a9c;
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
      tr td:active {
        background-color: #25957C;
      }
    }
  }
}
</style>
