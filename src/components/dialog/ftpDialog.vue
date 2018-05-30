<template>
  <DialogWrapper :isShow="isShow" :isBig="isBig" title="云端服务器设置">
    <template slot="content">
      <div class="control">
        <div>云端IP：</div>
        <input type="text">
      </div>
      <div class="control">
        <div>云端端口：</div>
        <input type="text">
      </div>
      <div class="control">
        <div>网关IP：</div>
        <input type="text">
      </div>
      <div class="control">
        <div>网关端口：</div>
        <input type="text">
      </div>
      <div class="control">
        <button class="btn btn-primary-circle">测试链接</button>
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
    return {
      isBig: true
    }
  },
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
  .control {
    display: flex;
    margin-bottom: 15px;
    div {
      font-size: 18px;
      width: 110px;
      display: flex;
      align-items: center;
    }
    input {
      border: none;
      width: 240px;
      border-bottom: 1px solid #eeeeee;
      padding: 8px;
      font-size: 20px;
    }
    .btn {
      width: 120px;
    }
  }
  .control:nth-child(5) {
    margin-bottom: 0;
  }
  .btn {
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
