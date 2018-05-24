<template>
  <SegmentRight>
    <SegmentRightTitle>{{ title }}</SegmentRightTitle>
    <SegmentRightContent>
      <div class="content-box">
        <div class="box-form">
          <div class="form-group">
            <label for="cardnum">会员卡号：</label>
            <input id="cardnum" type="text" class="form-control"
              v-model="cardnum"
              placeholder="请刷卡/输入会员卡号/手机号">
          </div>
          <VirtualKeyboard @handleInputNum="handleInputNum"></VirtualKeyboard>
        </div>
        <div class="btn-box">
          <a href="javascript:;" class="btn btn-primary"
            @click="handleSubmit">确定</a>
        </div>
      </div>
    </SegmentRightContent>
  </SegmentRight>
</template>

<script>
import SegmentRight from '@/components/segmentRight'
import SegmentRightTitle from '@/components/segmentRightTitle'
import SegmentRightContent from '@/components/segmentRightContent'
import VirtualKeyboard from '@/components/virtualDigitalKeyboard'
export default {
  components: {
    SegmentRight,
    SegmentRightTitle,
    SegmentRightContent,
    VirtualKeyboard
  },
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      cardnum: ''
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
      if (this.cardnum === '123') {
        // 请求会员卡信息
        this.$emit('handleSubmit')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .content-box {
    width: 500px;
    .box-form {
      margin-bottom: 50px;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      .form-group {
        margin-bottom: 20px;
        label {
          font-size: 20px;
          color: #656565;
        }
        .form-control {
          height: 50px;
          width: 320px;
          box-sizing: border-box;
          font-size: 20px;
          padding: 0 10px;
          background-color: #fff;
          border: 0px;
          border: none;
          border-bottom: 1px solid $border-color-lighter;
          -webkit-appearance: none;
          -webkit-border-radius: 0px;
        }
      }
    }
  }
</style>
