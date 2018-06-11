<template>
  <SegmentRight>
    <SegmentRightTitle>{{ title }}</SegmentRightTitle>
    <SegmentRightContent>
      <div class="content-box">
        <div class="box-form">
          <div class="form-group">
            <label for="cardnum">会员卡号：</label>
            <input id="cardnum" type="text" class="form-control"
              v-model="cardnum" placeholder="请刷卡/输入会员卡号/手机号">
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
      if (val.id === 12) {
        this.cardnum = this.cardnum.substring(0, this.cardnum.length-1)
      } else {
        this.cardnum += val.value
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
        label {
          font-size: 20px;
        }
        .form-control {
          width: 320px;
          font-size: 20px;
        }
      }
    }
  }
</style>
