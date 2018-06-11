<template>
  <div class="wrapper" v-if="isShow">
    <div class="box" :style="{top: height + 'px'}">
      <table>
        <tr v-for="tr in list">
          <td v-for="td in tr" :key="td.id"
            @click="handleInputNum(td)">
            {{ td.value }}
          </td>
        </tr>
      </table>
      <div class="right">
        <a href="javascript:;" class="btn" @click="handleClearInput">清空</a>
        <a href="javascript:;" class="btn" @click="handleClose">确定</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isShow: {
      type: Boolean
    },
    list: {
      type: Array,
      default () {
        return [
          [
            { id: 1, value: '7' },
            { id: 2, value: '8' },
            { id: 3, value: '9' },
          ],
          [
            { id: 4, value: '4' },
            { id: 5, value: '5' },
            { id: 6, value: '6' },
          ],
          [
            { id: 7, value: '1' },
            { id: 8, value: '2' },
            { id: 9, value: '3' },
          ],
          [
            { id: 10, value: '0' },
            { id: 11, value: '00' },
            { id: 12, value: 'x' },
          ]
        ]
      }
    },
    height: {
      type: Number
    }
  },
  methods: {
    handleInputNum (val) {
      this.$emit('handleInputNum', val)
    },
    handleClearInput () {
      this.$emit('handleClearInput')
    },
    handleClose () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}
.box {
  position: fixed;
  left: 308px;
  background-color: #fff;
  display: flex;
  box-shadow: 1px 1px 5px #cfcfcf;
  z-index: 2;
  table {
    border-collapse: collapse;
    width: 300px;
    height: 300px;
    tr td {
      border: 1px solid $border-color-lighter;
      height: 80px;
      width: 33.33%;
      text-align: center;
      font-size: 30px;
      cursor: pointer;
    }
  }
  .right {
    width: 108px;
    border: 1px solid $border-color-lighter;
    border-left: 0;
    .btn {
      width: 100%;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 23px;
    }
    .btn:nth-child(1) {
      height: 81px;
      border-bottom: 1px solid $border-color-lighter;
    }
    .btn:nth-child(2) {
      height: 242px;
    }
  }
}
</style>
