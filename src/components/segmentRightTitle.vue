<template>
  <div class="right-title">
    <slot></slot>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  .right-title {
    height: 55px;
    border-bottom: 1px solid $border-color-lighter;
    font-size: 20px;
    color: #696969;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 15px;
    padding-right: 15px;
  }
</style>
