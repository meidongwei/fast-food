<template>
  <DialogWrapper :isShow="isShow" :isBig="isBig" title="开钱箱">
    <template slot="content">
      <div class="con">
        <div>
          <div class="form-group">
            <label for="">当前用户：</label>
            <input type="text" class="form-control"
              disabled v-model="input1">
          </div>
          <div class="form-group">
            <label for="">授权工号：</label>
            <input type="text" class="form-control" placeholder="请输入授权工号">
          </div>
        </div>
        <div>
          <div class="form-group">
            <label for="">用户密码：</label>
            <input type="text" class="form-control" placeholder="请输入用户密码">
          </div>
          <div class="form-group">
            <label for="">授权密码：</label>
            <input type="password" class="form-control" placeholder="请输入授权密码">
          </div>
        </div>
      </div>
      <VirtualKeyboard @handleInputNum="handleInputNum"></VirtualKeyboard>
    </template>
    <template slot="footer">
      <a href="javascript:;" class="btn btn-default"
        @click="toBigMoney">取大钞</a>
      <a href="javascript:;" class="btn btn-primary"
        @click="openBigMoneyBox">开钱箱</a>
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
      input1: 1509,
      isBig: true,
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
    toBigMoney () {
      this.$emit('toBigMoney')
    },
    openBigMoneyBox () {
      this.$emit('openBigMoneyBox')
    }
  }
}
</script>

<style lang="scss" scoped>
.con {
  display: flex;
}
.form-group {
  .form-control {
    width: 180px;
  }
}
.form-group:nth-child(1) {
  margin-bottom: 10px;
  margin-right: 20px;
}
.btn {
  width: 50%;
}
</style>
