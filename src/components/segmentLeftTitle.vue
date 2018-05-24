<template>
  <div class="left-title">
    <slot></slot>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
  .left-title {
    height: 55px;
    border-bottom: 1px solid $border-color-lighter;
    font-size: 20px;
    color: #696969;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
