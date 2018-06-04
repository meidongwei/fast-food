<template>
  <DialogWrapper :isShow="isShow" :isBig="isBig"
    title="屏幕已锁定">
    <template slot="content">
      <div class="form-group">
        <label for="input1">解锁密码：</label>
        <input id="input1" type="password" class="form-control"
          v-model="inputNum" placeholder="请输入解锁密码">
      </div>
      <VirtualKeyboard @handleInputNum="handleInputNum"></VirtualKeyboard>
    </template>
    <template slot="footer">
      <a href="javascript:;" class="btn btn-primary"
        @click="unlock">解锁</a>
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
      inputNum: ''
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
    unlock () {
      if (this.inputNum === '123') {
        this.$emit('close')
        this.inputNum = ''
      } else {
        this.$toast('密码错误！')
        this.inputNum = ''
      }
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
