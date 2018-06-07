<template>
  <DialogWrapper :isShow="isShow" :isBig="isBig" :isShowX="true"
    :title="title" @close="close">
    <template slot="content">
      <div class="form-group">
        <label for="input1">{{ title }}：</label>
        <input id="input1" type="text" class="form-control"
          v-model="inputNum" :placeholder="placeholder">
      </div>
      <VirtualKeyboard @handleInputNum="handleInputNum"
        :list="keyboardList">
      </VirtualKeyboard>
    </template>
    <template slot="footer">
      <a href="javascript:;" class="btn btn-default"
        @click="close">取消</a>
      <a href="javascript:;" class="btn btn-primary"
        @click="submit">确定</a>
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
    },
    title: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    keyboardList: {
      type: Array,
      default () {
        return []
      }
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
      if (val.id === 12) {
        this.inputNum = this.inputNum.substring(0, this.inputNum.length-1)
      } else {
        this.inputNum += val.value
      }
    },
    close () {
      this.$emit('close')
    },
    submit () {
      if (this.inputNum === '123') {
        this.$emit('close')
        this.inputNum = ''
      } else {
        this.$toast('输入错误！')
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
