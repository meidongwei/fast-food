<template>
  <div>
    <h1>设置</h1>
    <a href="javascript:;" class="btn btn-primary"
      @touchstart="clickStart"
      @touchend="clickEnd">button</a>
  </div>
</template>

<script>
export default {
  data () {
    return {
      stampStart: 0,
      stampEnd: 0
    }
  },
  methods: {
    clickStart () {
      this.stampStart = new Date().getTime()
      clearInterval(this.Loop)
      this.Loop = setTimeout(() => {
        console.log(111111)
      }, 1000)
    },
    clickEnd () {
      clearInterval(this.Loop)
      this.stampEnd = new Date().getTime()
      if (this.stampEnd - this.stampStart < 1000) {
        console.log(222222)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
h1 {
  margin-bottom: 50px;
}
</style>
