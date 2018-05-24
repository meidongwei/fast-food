<template>
  <div>
    <LockComponent :title="lockTitle"
      @handleSubmit="handleSubmit" v-if="isShowLock">
    </LockComponent>
    <SegmentRight v-if="!isShowLock">
      <SegmentRightTitle>
        <SubTab></SubTab>
      </SegmentRightTitle>
      <SegmentRightContent class="right-con">
        <CardBaseInfo></CardBaseInfo>
        <div class="con-custom">
          <div class="custom-title">
            <span>选择储值奖励规则</span>
            <span>自定义充值 &gt;</span>
          </div>
          <div class="custom-con">
            <div class="custom-con-item">
              <div class="top">
                冲50
              </div>
              <div class="bottom">
                送30元代金券一张
              </div>
            </div>
            <div class="custom-con-item">
              <div class="top">
                冲300
              </div>
              <div class="bottom">
                送150元代金券一张
              </div>
            </div>
            <div class="custom-con-item">
              <div class="top">
                冲500
              </div>
              <div class="bottom">
                送300元代金券一张
              </div>
            </div>
            <div class="custom-con-item">
              <div class="top">
                冲1000
              </div>
              <div class="bottom">
                送800元代金券一张
              </div>
            </div>
          </div>
        </div>
        <div class="con-pay">
          <div class="pay-title">选择支付方式</div>
          <div class="pay-con">
            <div class="pay-item">
              现金
            </div>
            <div class="pay-item">
              移动支付
            </div>
            <div class="pay-item">
              银行卡
            </div>
          </div>
        </div>
        <div class="btn-box">
          <a href="javascript:;" class="btn btn-primary">确认充值</a>
        </div>
      </SegmentRightContent>
    </SegmentRight>
  </div>
</template>

<script>
import SubTab from '@/components/subTab'
import SegmentRight from '@/components/segmentRight'
import SegmentRightTitle from '@/components/segmentRightTitle'
import SegmentRightContent from '@/components/segmentRightContent'
import LockComponent from '@/components/lockComponent'
import CardBaseInfo from '@/components/cardBaseInfo'
export default {
  components: {
    SubTab,
    SegmentRight,
    SegmentRightTitle,
    SegmentRightContent,
    LockComponent,
    CardBaseInfo
  },
  data () {
    return {
      lockTitle: '会员充值',
      cardnum: '',
      isShowLock: true
    }
  },
  methods: {
    handleInputNum (val) {
      if (val === 'x') {
        this.cardnum = this.cardnum.substring(0, this.cardnum.length-1)
      } else {
        this.cardnum += val
      }
    },
    handleSubmit () {
      this.isShowLock = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .right-con {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    box-sizing: border-box;
    padding-top: 50px;
    .con-custom {
      width: 650px;
      .custom-title {
        display: flex;
        justify-content: space-between;
        border-left: 3px solid $primary-color;
        padding-left: 10px;
        font-size: 18px;
        color: #9d9d9d;
        margin-bottom: 20px;
        span:nth-child(2) {
          color: $primary-color;
        }
      }
      .custom-con {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .custom-con-item {
          width: 48%;
          border: 1px solid rgb(196,220,219);
          margin-bottom: 20px;
          .top {
            padding: 15px 10px;
            text-align: center;
            font-size: 20px;
            color: #666666;
          }
          .bottom {
            padding: 5px 10px;
            text-align: center;
            color: #666666;
            background-color: #f5f5f5;
          }
        }
      }
    }
    .con-pay {
      width: 650px;
      margin-bottom: 50px;
      .pay-title {
        border-left: 3px solid $primary-color;
        padding-left: 10px;
        font-size: 18px;
        color: #9d9d9d;
        margin-bottom: 20px;
      }
      .pay-con {
        display: flex;
        .pay-item {
          height: 55px;
          width: 100px;
          margin-right: 15px;
          border: 1px solid $border-color-lighter;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
</style>
