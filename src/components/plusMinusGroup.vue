<template>
  <div class="box">
    <a href="javascript:;" class="left"
      :class="[{'btn-default': num <= 1},
      {'btn-primary': num > 1}]">
      <span>-</span>
    </a>
    <div class="num">{{ num }}</div>
    <a href="javascript:;" class="right btn-primary">
      <span>+</span>
    </a>
  </div>
</template>

<script>
export default {
  data () {
    return {
      num: 1
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  .left,.right {
    width: 40px;
    height: 40px;
    font-size: 30px;
    position: relative;
    span {
      position: absolute;
      left: 10px;
      top: 7px;
      height: 20px;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .num {
    background-color: #f5f5f5;
    width: 50px;
    font-size: 20px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
