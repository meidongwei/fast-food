<template>
  <DialogWrapper :isShow="isShow" :isBig="true" title="修改密码">
    <template slot="content">
      <div class="form-group">
        <label for="input1">请输入工号：</label>
        <input id="input1" type="text" class="form-control">
      </div>
      <div class="form-group">
        <label for="input2">请输入密码：</label>
        <input id="input2" type="password" class="form-control">
      </div>
      <div class="form-group">
        <label for="input3">输入新密码：</label>
        <input id="input3" type="password" class="form-control">
      </div>
      <div class="form-group">
        <label for="input4">确认新密码：</label>
        <input id="input4" type="password" class="form-control">
      </div>
      <div class="form-group tip">
        <p>密码只能为6位以内的数字！</p>
      </div>
    </template>
    <template slot="footer">
      <a href="javascript:;" class="btn btn-default"
        @click="close">取消</a>
      <a href="javascript:;" class="btn btn-primary">确定</a>
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
    return {}
  },
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
.tip {
  margin-bottom: 0;
  p {
    color: $primary-color;
  }
}
.btn {
  width: 50%;
}
</style>
