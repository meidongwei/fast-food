<template>
  <DialogWrapper :isShow="isShow" :isBig="isBig" title="取大钞">
    <template slot="content">
      <div class="con">
        <div class="form-group">
          <label for="">取钞金额：</label>
          <input type="text" class="form-control"
            v-model="input1" placeholder="请输入取钞金额">
        </div>
      </div>
      <VirtualKeyboard @handleInputNum="handleInputNum"
        :list="numList"></VirtualKeyboard>
    </template>
    <template slot="footer">
      <a href="javascript:;" class="btn btn-default"
        @click="close">取消</a>
      <a href="javascript:;" class="btn btn-primary"
        @click="handleGetBigMoney">取大钞</a>
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
      input1: '',
      isBig: true,
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
        this.input1 = this.input1.substring(0, this.input1.length-1)
      } else {
        this.input1 += val
      }
    },
    close () {
      this.$emit('close')
      this.input1 = ''
    },
    handleGetBigMoney () {
      this.$emit('getBigMoney', Number(this.input1))
      this.input1 = ''
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
  width: 50%;
}
</style>
