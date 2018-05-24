<template>
  <div class="segment-right">
    <slot></slot>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  .segment-right {
    box-sizing: border-box;
    border: 1px solid $border-color-lighter;
    width: 714px;
    height: 748px;
    margin-top: 10px;
    margin-right: 10px;
  }
</style>
