<template>
  <div class="dialog-con" v-if="isShow">
    <div class="dialog-bg"></div>
    <div class="dialog-box" :class="[{bigBox: isBig}, {superBox: isSuperBig}]">
      <div class="dialog-header">
        <h3>{{ title }}</h3>
        <a href="javascript:;" class="delete"
          v-if="isShowX" @click="close">X</a>
      </div>
      <div class="dialog-content">
        <slot name="content"></slot>
      </div>
      <div class="dialog-footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    isShowX: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    isBig: {
      type: Boolean,
      default: false
    },
    isSuperBig: {
      type: Boolean,
      default: false
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
    z-index: 2;
    .dialog-bg {
      background-color: rgba(0, 0, 0, .8);
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
    }
    .dialog-box.bigBox {
      width: 700px;
    }
    .dialog-box.superBox {
      width: 860px;
    }
    .dialog-box {
      width: 400px;
      background-color: #fff;
      z-index: 2;
      .dialog-header {
        height: 50px;
        border-bottom: 1px solid #eeeeee;
        display: flex;
        justify-content: space-between;
        align-items: center;
        h3 {
          font-weight: normal;
          padding-left: 15px;
        }
        .delete {
          font-size: 20px;
          padding: 0 20px;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
      .dialog-content {
        // max-height: 400px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 40px 20px;
      }
      .dialog-footer {
        display: flex;
      }
    }
  }
</style>
