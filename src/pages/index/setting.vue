<template>
  <div>
    <h1>设置</h1>
    <div class="con">
      <div class="box-bg">
        <div class="cell" v-for="item in list" @click="handleClick(item)">
          {{ item.num }}
        </div>
        <div class="cell" @click="handleNext">下一页</div>
      </div>
    </div>
    <button @click="handleAdd">add button</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [1,1,1,1]
    }
  },
  watch: {
    list (val) {
      if (val.length < 9) {
        let n = 9 - val.length
        for (let i=0;i<n;i++) {
          val.push(i)
        }
      }
    }
  },
  methods: {
    handleClick (item) {
      if (item.num) {
        console.log(item.num)
      }
    },
    handleNext () {
      console.log(222)
      this.list
    },
    handleAdd () {
      let arr = [{num: 991},{num: 992},{num: 993},{num: 994},{num: 995},{num: 996},{num: 997}]
      this.list = arr
    },
    touchStart () {
      console.log(111)
    },
    touchMove () {
      console.log(222)
    },
    touchEnd () {
      console.log(333)
    }
  }
}
</script>

<style lang="scss" scoped>
.con {
  position: relative;
  width: 500px;
  height: 500px;
  border-left: 1px solid #9c9c9c;
  border-top: 1px solid #9c9c9c;
}
.box-bg {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  z-index: 1;
  .cell {
    width: 100px;
    height: 80px;
    background-color: #ffb526;
    border-right: 1px solid #9c9c9c;
    border-bottom: 1px solid #9c9c9c;
    box-sizing: border-box;
  }
}
</style>
