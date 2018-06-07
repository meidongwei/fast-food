<template>
  <div class="dialog-con" v-if="isShow">
    <div class="dialog-bg"></div>
    <div class="dialog-box">
      <div class="left">
        <h2>【{{ dish.name }}】金额：{{ dish.price }}.00</h2>
        <div class="topbar">
          <ul class="table table-data">
            <li v-for="item in topbarList" :keys="item.id">
              <a href="javascript:;">{{ item.name }}</a>
            </li>
          </ul>
          <ul class="table">
            <li></li><li></li><li></li>
            <li class="next">&gt;</li>
          </ul>
        </div>
        <p class="text">
          点选规则：必选，10份选2份
        </p>
        <div class="con">
          <div class="table table-data">
            <div class="option-item" v-for="item in orderList"
              :keys="item.id">
              <div class="item-price">
                <!-- {{ item.price }}.00 -->
              </div>
              <div class="item-name">{{ item.name }}</div>
              <div class="item-footer">
                <!-- <div class="item-real-price" v-if="item.vip === 2">
                  特价：{{ item.nowPrice }}.00
                </div> -->
              </div>
            </div>
          </div>
          <div class="table">
            <div></div><div></div><div></div>
            <div></div><div></div><div></div>
            <div></div><div></div><div></div>
            <div></div><div></div>
            <div class="next">&gt;</div>
          </div>
        </div>
        <div class="others">
          <div class="table table-data">
            <div v-for="(item, index) in topbarList" :keys="index">
              {{ item.name }}
            </div>
          </div>
          <div class="table">
            <div></div><div></div><div></div>
            <div></div><div></div><div></div>
            <div></div><div></div>
            <div class="next">&gt;</div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="option">
          <div class="option-left">
            <PlusMinusGroup></PlusMinusGroup>
          </div>
          <div class="option-right">
            <a href="javascript:;" class="btn btn-default btn-sm"
              @click="handleClose">放弃</a>
            <a href="javascript:;" class="btn btn-primary btn-sm"
              @click="handleSubmit">确定</a>
          </div>
        </div>
        <div class="info">

        </div>
        <div class="pagination">
          <a href="javascript:;" class="btn btn-default">上一页</a>
          <a href="javascript:;" class="btn btn-primary">下一页</a>
        </div>
      </div>
    </div>

    <GeneralDialog :isShow="isShowGeneralDialog"
      @close="handleCloseGeneralDialog"
      @submit="handleSubmitGeneralDialog"
      title="温馨提示" text="是否放弃操作？">
    </GeneralDialog>
  </div>
</template>

<script>
import PlusMinusGroup from '@/components/plusMinusGroup'
import GeneralDialog from '@/components/dialog/generalDialog'
export default {
  components: {
    PlusMinusGroup,
    GeneralDialog
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    dish: {
      type: Object
    }
  },
  data () {
    return {
      isShowGeneralDialog: false,
      topbarList: [
        {
          id: 1,
          name: '辅助1组'
        },
        {
          id: 2,
          name: '辅助2组'
        },
        {
          id: 3,
          name: '辅助3组'
        },
        // {
        //   id: 4,
        //   name: '辅助4组'
        // },
      ],
      orderList: []
    }
  },
  methods: {
    // 点击“放弃”按钮触发
    handleClose () {
      this.isShowGeneralDialog = true
    },

    // 点击“确定”按钮触发
    handleSubmit () {
      // 把数据发送给服务器，并且更新本地数据
      this.$emit('close')
    },

    // 是否“放弃”操作？点击“取消”按钮触发
    handleCloseGeneralDialog () {
      this.isShowGeneralDialog = false
    },

    // 是否“放弃”操作？点击“确定”按钮触发
    handleSubmitGeneralDialog () {
      this.isShowGeneralDialog = false
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
  .dialog-con {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 1024px;
    height: 768px;
    z-index: 2;
    .dialog-bg {
      height: 100%;
      width: 100%;
      background-color: rgba(0, 0, 0, .8);
      z-index: 1;
    }
    .dialog-box {
      width: 850px;
      height: 768px;
      box-sizing: border-box;
      background-color: #fff;
      position: absolute;
      top: 0;
      right: 0;
      z-index: 2;
      padding: 15px;
      display: flex;
      justify-content: space-between;
      .left {
        width: 50%;
        h2 {
          font-weight: normal;
          margin-bottom: 15px;
        }
        .topbar {
          height: 60px;
          margin-bottom: 12px;
          position: relative;
          .table.table-data {
            position: absolute;
            z-index: 2;
            li {
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
            position: absolute;
            z-index: 1;
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
        .text {
          color: #777777;
          margin-bottom: 15px;
        }
        .con {
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
              width: 33.33%;
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
        .others {
          position: relative;
          margin-bottom: 10px;
          .table {
            display: flex;
            flex-wrap: wrap;
            border-left: 1px solid $border-color-lighter;
            width: 100%;
            div {
              border-right: 1px solid $border-color-lighter;
              border-bottom: 1px solid $border-color-lighter;
              width: 33.33%;
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
            div {
              // new
              background-color: none;
              width: 33.33%;
            }
            div:active {
              background-color: #eca133;
            }
          }
        }
      }
      .right {
        width: 48%;
        .option {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
          .option-right {
            .btn {
              padding-left: 30px;
              padding-right: 30px;
            }
          }
        }
        .info {
          border: 1px solid $border-color-lighter;
          border-bottom: 0;
          height: 628px;
        }
        .pagination {
          display: flex;
          .btn {
            width: 50%;
          }
        }
      }
    }
  }
</style>
