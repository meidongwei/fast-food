<template>
  <div>
    <h1>设置</h1>

    <div class="ccc">
      <div class="box">
        <div class="cell" v-for="item in 8">
          {{ item }}
        </div>
      </div>
      <table>
        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td>翻页</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.ccc {
  background-color: #f5f5f5;
  position: relative;
  .box {
    // border: 1px solid blue;
    // box-sizing: border-box;
    width: 541px;
    height: 241px;
    display: flex;
    flex-wrap: wrap;
    position: absolute;
    .cell {
      height: 80px;
      width: 180px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
table {
  border-collapse: collapse;
  tr td {
    border: 1px solid red;
    height: 80px;
    width: 180px;
    box-sizing: border-box;
  }
}
</style>
