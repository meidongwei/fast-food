<template>
  <router-view/>
</template>

<script>
export default {
  created () {
    // 禁止弹出右键窗口
    // document.oncontextmenu=new Function("event.returnValue=false")
  }
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
  body {
    // 由于项目放在“壳”中后，开机动画（图片）会有滚动条，所以
    // 添加 overflow 隐藏掉
    // 不过 body 元素失去了回弹效果，比较生硬
    overflow: hidden;
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
    display: inline-block;
    padding: 15px 20px;
    font-size: 16px;
    border: none;
    text-align: center;
    cursor: pointer;
  }
  .btn-sm {
    padding: 10px 20px;
  }
  .btn-default {
    background-color: #BBBBBB;
    color: #fff;
  }
  .btn-default:active {
    background-color: #9f9f9f;
  }
  .btn-default-lighter {
    background-color: #f5f5f5;
    color: #3d3d3d;
  }
  .btn-default-dark {
    background-color: #797979;
    color: #fff;
  }
  .btn-default-dark:active {
    background-color: #616161;
  }
  .btn-danger {
    background-color: #f56c5e;
    color: #fff;
  }
  .btn-primary {
    background-color: $primary-color;
    color: #fff;
  }
  .btn-primary:active {
    background-color: #25957C;
  }
  .btn-primary-circle {
    border: 1px solid $primary-color;
    color: $primary-color;
    background-color: #fff;
  }
  .btn-primary-circle:active {
    color: #fff;
    background-color: $primary-color;
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

  // 表单样式
  .form-group {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    label {
      font-size: 18px;
      color: #656565;
    }
    label.flag {
      position: relative;
    }
    label.flag::after {
      content: '*';
      color: red;
      position: absolute;
      left: -15px;
      top: 3px;
    }
    .form-control {
      height: 50px;
      width: 230px;
      box-sizing: border-box;
      font-size: 16px;
      padding: 0 10px;
      background-color: #fff;
      border: 0px;
      border: none;
      border-bottom: 1px solid $border-color-lighter;
      -webkit-appearance: none;
      -webkit-border-radius: 0px;
    }
  }
  .btn-box {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
    width: 100%;
    a {
      display: block;
      width: 290px;
    }
  }
</style>
