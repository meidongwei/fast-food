<template>
  <div class="dialog-con" v-if="isShow">
    <div class="dialog-bg"></div>
    <div class="dialog-box">
      <div class="dialog-header">
        <h3>温馨提示</h3>
      </div>
      <div class="dialog-content">
        <p>是否确定要退出系统？</p>
      </div>
      <div class="dialog-footer">
        <a href="javascript:;" class="btn btn-default"
          @click="close">取消</a>
        <a href="javascript:;" class="btn btn-primary">确定</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: {
    isShow: {
      type: Boolean
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
  .dialog-con {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .dialog-bg {
    background-color: rgba(0, 0, 0, .8);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
  }
  .dialog-box {
    width: 400px;
    background-color: #fff;
    z-index: 2;
    .dialog-header {
      padding: 10px 15px;
      border-bottom: 1px solid #eeeeee;
      h3 {
        font-weight: normal;
      }
    }
    .dialog-content {
      font-size: 20px;
      min-height: 150px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .dialog-footer {
      display: flex;
      .btn {
        width: 50%;
      }
    }
  }
</style>
