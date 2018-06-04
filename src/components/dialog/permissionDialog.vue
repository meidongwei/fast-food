<template>
  <DialogWrapper :isShow="isShow" :isBig="isBig" title="权限验证">
    <template slot="content">
      <div class="form-group">
        <label for="">工号：</label>
        <input type="text" class="form-control" placeholder="请输入工号"
          v-model="input1" @focus="getFocus1">
      </div>
      <div class="form-group">
        <label for="">密码：</label>
        <input type="password" class="form-control" placeholder="请输入密码"
          v-model="input2" @focus="getFocus2">
      </div>
      <VirtualKeyboard @handleInputNum="handleInputNum"></VirtualKeyboard>
    </template>
    <template slot="footer">
      <a href="javascript:;" class="btn btn-default"
        @click="close">取消</a>
      <a href="javascript:;" class="btn btn-primary"
        @click="checkedPermission">验证权限</a>
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
      isFocus1: false,
      isFocus2: false,
      input1: '',
      input2: '',
      isBig: true,
    }
  },
  methods: {
    handleInputNum (val) {
      if (this.isFocus1) {
        if (val === 'x') {
          this.input1 = this.input1.substring(0, this.input1.length-1)
        } else {
          this.input1 += val
        }
      } else if (this.isFocus2) {
        if (val === 'x') {
          this.input2 = this.input2.substring(0, this.input2.length-1)
        } else {
          this.input2 += val
        }
      }

    },
    close () {
      this.input1 = ''
      this.input2 = ''
      this.$emit('close')
    },
    getFocus1 () {
      this.isFocus1 = true
      this.isFocus2 = false
    },
    getFocus2 () {
      this.isFocus2 = true
      this.isFocus1 = false
    },
    checkedPermission () {
      let num = Number(this.input1)
      let pwd = Number(this.input2)
      if (num === 123 && pwd === 123) {
        this.$emit('checkedPermission')
      } else {
        this.$toast('验证失败！')
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
.form-group:nth-child(1) {
  margin-bottom: 10px;
}
.btn {
  width: 50%;
}
</style>
