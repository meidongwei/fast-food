<template>
  <router-view/>
</template>

<script>
export default {
}
</script>

<style lang="scss">
  // 样式重置
  * {
    padding: 0;
    margin: 0;
    // 屏蔽双击、长按选中文字功能
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  a {
    text-decoration: none;
    color: #787878;
  }
  ul li {
    list-style: none;
  }

  // 链接
  a.link {
    color: $primary-color;
  }

  // 按钮
  .btn {
    padding: 15px 20px;
    font-size: 16px;
    border: none;
    text-align: center;
    cursor: pointer;
  }
  .btn-default {
    background-color: #f5f5f5;
    color: #3d3d3d;
  }
  .btn-default-dark {
    background-color: #797979;
    color: #fff;
  }
  .btn-danger {
    background-color: #f56c5e;
    color: #fff;
  }
  .btn-primary {
    background-color: $primary-color;
    color: #fff;
  }
  .btn-primary-circle {
    border: 1px solid $primary-color;
    color: $primary-color;
    background-color: #fff;
  }

  // 更改 input placeholder 颜色
  input::-webkit-input-placeholder{
    color: #d7d7d7;
  }
  input::-moz-placeholder{
    color: #d7d7d7;
  }
  input:-moz-placeholder{
    color: #d7d7d7;
  }
  input:-ms-input-placeholder{
    color: #d7d7d7;
  }

  // 布局容器
  .container {
    width: 1024px;
    height: 768px;
  }
</style>
