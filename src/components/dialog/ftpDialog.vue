<template>
  <div class="dialog-con" v-if="isShow">
    <div class="dialog-bg"></div>
    <div class="dialog-box">
      <div class="dialog-header">
        <h3>云端服务器设置</h3>
      </div>
      <div class="dialog-content">
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
    width: 600px;
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
      min-height: 250px;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 20px;
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
          border-bottom: 1px solid #eeeeee;
          padding: 8px;
          font-size: 20px;
        }
        .btn {
          width: 120px;
          margin-bottom: 20px;
        }
      }
    }
    .dialog-footer {
      display: flex;
      .btn {
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
</style>
