<template>
  <div class="dialog-con" v-if="isShow">
    <div class="dialog-bg"></div>
    <div class="dialog-box">
      <div class="dialog-header">
        <div class="info-box">
          <div class="left"></div>
          <div class="right">
            <h3>0000 0000 0000 0003</h3>
            <p>会员：孙悟空（普通会员）</p>
          </div>
        </div>
      </div>
      <div class="dialog-content">
        <div class="seg topbar">
          <ul>
            <li>aaa</li>
            <li>bbb</li>
            <li>ccc</li>
            <li>ddd</li>
            <li class="next">&gt;</li>
          </ul>
        </div>
        <div class="seg seg1">
          <ul>
            <li>
              <div class="left">
                <span class="dai">代</span>
                <span class="cai">菜</span>
                会员代金券
              </div>
              <div class="right">3张可用代金券</div>
            </li>
            <li>
              <div class="left">
                <span class="dai">代</span>
                <span class="cai">菜</span>
                会员菜品券
              </div>
              <div class="right">已选择1张菜品券，抵扣20元</div>
            </li>
          </ul>
        </div>
        <div class="seg seg2">
          <ul>
            <li>
              <div class="left">积分余额：200</div>
              <div class="right">
                <SwitchBtn name="name1"></SwitchBtn>
              </div>
            </li>
            <li>
              <div class="left">可用预存：200</div>
              <div class="right">
                <SwitchBtn name="name2"></SwitchBtn>
              </div>
            </li>
          </ul>
        </div>
        <div class="seg seg3">
          <ul>
            <li>
              <div class="left">消费4斤鱼头奖励10元代金券1张</div>
              <div class="right">
              </div>
            </li>
            <li>
              <div class="left">消费100返50元代金券1张</div>
              <div class="right">
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="dialog-footer">
        <div class="left">
          尚欠金额：8元
        </div>
        <div class="right">
          <a class="btn btn-default">取消</a>
          <a class="btn btn-primary">确定</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SwitchBtn from '@/components/switch'
export default {
  components: {
    SwitchBtn
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    isShowX: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    isBig: {
      type: Boolean,
      default: false
    },
    isSuperBig: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close () {
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
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
    .dialog-bg {
      background-color: rgba(0, 0, 0, .8);
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
    }
    .dialog-box {
      width: 850px;
      background-color: #fff;
      z-index: 2;
      .dialog-header {
        border-bottom: 1px solid #eeeeee;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .info-box {
          width: 100%;
          padding: 10px 15px;
          display: flex;
          align-items: center;
          .left {
            height: 70px;
            width: 70px;
            background-color: #dfdfdf;
            margin-right: 15px;
          }
          .right {
            h3 {
              font-size: 30px;
              font-weight: normal;
              color: $primary-color;
            }
            p {
              font-size: 20px;
              color: #aaaaaa;
            }
          }
        }
      }
      .dialog-content {
        .seg {
          border-bottom: 1px solid $border-color-lighter;
          padding: 20px 30px;
        }
        .topbar {
          ul {
            display: flex;
            justify-content: space-between;
            li {
              border: 1px solid $border-color-lighter;
              font-size: 20px;
              color: #787878;
              height: 50px;
              width: 160px;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            li.next {
              width: 100px;
              background-color: $primary-color;
              color: #fff;
            }
          }
        }
        .seg1 {
          ul li {
            display: flex;
            justify-content: space-between;
            font-size: 20px;
            margin-bottom: 10px;
            .left {
              display: flex;
              align-items: center;
              .dai {
                background-color: #e26060;
                color: #fff;
                height: 30px;
                width: 30px;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-right: 10px;
              }
              .cai {
                background-color: #60c3e2;
                color: #fff;
                height: 30px;
                width: 30px;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-right: 10px;
              }
            }
            .right {
              color: $primary-color;
            }
          }
        }
        .seg2 {
          ul li {
            display: flex;
            justify-content: space-between;
            font-size: 20px;
            margin-bottom: 10px;
          }
        }
        .seg3 {
          ul li {
            display: flex;
            justify-content: space-between;
            font-size: 20px;
            margin-bottom: 10px;
          }
        }
      }
      .dialog-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .right {}
      }
    }
  }
</style>
