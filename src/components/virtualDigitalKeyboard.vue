<template>
  <table>
    <tr v-for="tr in numList">
      <td v-for="td in tr" :keys="td.id"
        @click="handleInputNum(td.value)">
        {{ td.value }}
      </td>
    </tr>
  </table>
</template>

<script>
export default {
  data () {
    return {
      numList: [
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
  methods: {
    handleInputNum (val) {
      this.$emit('handleInputNum', val)
    }
  }
}
</script>

<style lang="scss" scoped>
  table {
    border-collapse: collapse;
    width: 450px;
    tr td {
      border: 1px solid $border-color-lighter;
      height: 80px;
      width: 33.33%;
      text-align: center;
      font-size: 30px;
      cursor: pointer;
    }
  }
</style>
