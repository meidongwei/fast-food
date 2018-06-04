<template>
  <DialogWrapper :isShow="isShow" :isBig="isBig"
    title="领备用金">
    <template slot="content">
      <div class="form-group">
        <label for="input1">领备用金：</label>
        <input id="input1" type="text" class="form-control"
          v-model="inputNum" placeholder="请输入领取的备用金金额">
      </div>
      <VirtualKeyboard @handleInputNum="handleInputNum"
        :list="numList"></VirtualKeyboard>
    </template>
    <template slot="footer">
      <a href="javascript:;" class="btn btn-default"
        @click="close">取消</a>
      <a href="javascript:;" class="btn btn-primary"
        @click="close">确定</a>
    </template>
  </DialogWrapper>
</template>

<script>
import DialogWrapper from '@/components/dialog/dialogWrapper'
import VirtualKeyboard from '@/components/virtualDigitalKeyboard'
export default {
  components: {
    DialogWrapper,
    VirtualKeyboard
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isBig: true,
      inputNum: '',
      numList: [
        [
          { id: 1, value: '7' },
          { id: 2, value: '8' },
          { id: 3, value: '9' },
        ],
        [
          { id: 4, value: '4' },
          { id: 5, value: '5' },
          { id: 6, value: '6' },
        ],
        [
          { id: 7, value: '1' },
          { id: 8, value: '2' },
          { id: 9, value: '3' },
        ],
        [
          { id: 10, value: '.' },
          { id: 11, value: '0' },
          { id: 12, value: 'x' },
        ]
      ]
    }
  },
  methods: {
    handleInputNum (val) {
      if (val === 'x') {
        this.inputNum = this.inputNum.substring(0, this.inputNum.length-1)
      } else {
        this.inputNum += val
      }
    },
    close () {
      this.$emit('close', Number(this.inputNum))
    }
  }
}
</script>

<style lang="scss" scoped>
.form-group {
  label {
    font-size: 20px;
  }
  .form-control {
    width: 320px;
    font-size: 20px;
  }
}
.btn {
  width: 100%;
}
</style>
