<template>
  <div class="title-tab">
    <span class="active">微信卡</span>
    <span>实体卡</span>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  .title-tab {
    display: flex;
    height: 100%;
    span {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 15px;
      margin-right: 15px;
      box-sizing: border-box;
    }
    span.active {
      position: relative;
    }
    span.active::after {
      content: '';
      height: 2px;
      width: 100%;
      background-color: $primary-color;
      position: absolute;
      left: 0;
      bottom: 0;
      right: 0;
    }
  }
</style>
