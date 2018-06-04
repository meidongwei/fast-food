<template>
  <DialogWrapper :isShow="isShow" :isBig="isBig" title="云端服务器设置">
    <template slot="content">
      <div class="form-group">
        <label for="input1">云端IP：</label>
        <input id="input1" type="text" class="form-control">
      </div>
      <div class="form-group">
        <label for="input2">云端端口：</label>
        <input id="input2" type="text" class="form-control">
      </div>
      <div class="form-group">
        <label for="input3">网关IP：</label>
        <input id="input3" type="text" class="form-control">
      </div>
      <div class="form-group">
        <label for="input4">网关端口：</label>
        <input id="input4" type="text" class="form-control">
      </div>
      <div class="btn-box">
        <a href="javascript:;" class="btn btn-primary-circle"
          @click="testLink">测试链接</a>
      </div>
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
export default {
  components: {
    DialogWrapper
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isBig: true
    }
  },
  methods: {
    close () {
      this.$emit('close')
    },
    submit () {
      console.log('保存云端服务器IP、端口设置')
      this.$emit('submit')
    },
    testLink () {
      setTimeout(() => {
        this.$toast('连接成功！')
      }, 2000)
    }
  }
}
</script>

<style lang="scss" scoped>
  .form-group {
    margin-bottom: 15px;
    label {
      width: 110px;
    }
  }
  .btn-box {
    margin-bottom: 0;
    a {
      width: 80px;
    }
  }
  .btn {
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
