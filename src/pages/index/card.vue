<template>
  <div style="display:flex;">
    <div class="segment-left">
      <div class="left-title">会员管理</div>
      <div class="subBar">
        <ul>
          <li v-for="item in subBarList" :keys="item.id">
            <a href="javascript:;" @click="goto(item)"
              :class="isSelect === item.value ? 'subActive' : ''">
              {{ item.name }}
            </a>
          </li>
        </ul>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isSelect: 'cardAdd',
      subBarList: [
        {
          id: 1,
          name: '新增会员',
          value: 'cardAdd'
        },
        {
          id: 2,
          name: '会员查询',
          value: 'cardQuery'
        },
        {
          id: 3,
          name: '会员充值',
          value: 'cardRecharge'
        },
        {
          id: 4,
          name: '撤销充值',
          value: 'cardCancel'
        }
      ]
    }
  },
  mounted () {
    // 刷新页面侧边栏导航状态不消失
    this.isSelect = this.$route.name
  },
  methods: {
    goto (val) {
      this.$router.push({name: val.value})
      this.isSelect = val.value
    }
  }
}
</script>

<style lang="scss">
  .segment-left {
    box-sizing: border-box;
    border: 1px solid $border-color-lighter;
    width: 220px;
    height: 748px;
    margin-top: 10px;
    margin-right: 10px;
    .left-title {
      height: 55px;
      border-bottom: 1px solid $border-color-lighter;
      font-size: 20px;
      color: #696969;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .subBar {
      ul li a {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        border-bottom: 1px solid $border-color-lighter;
        width: 100%;
        height: 60px;
        box-sizing: border-box;
        font-size: 18px;
        padding-left: 15px;
      }
    }
    .subActive {
      background-color: #f4f4f4;
    }
  }
  .segment-right {
    box-sizing: border-box;
    border: 1px solid $border-color-lighter;
    width: 714px;
    height: 748px;
    margin-top: 10px;
    margin-right: 10px;
    .right-title {
      height: 55px;
      border-bottom: 1px solid $border-color-lighter;
      font-size: 20px;
      color: #696969;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding-left: 15px;
    }
  }
</style>
