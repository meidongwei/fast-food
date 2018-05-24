<template>
  <div style="display:flex;">
    <subSideBarComponent :isSelect="isSelect" :title="title"
      :subBarList="subBarList" @goto="goto">
    </subSideBarComponent>
    <router-view/>
  </div>
</template>

<script>
import subSideBarComponent from '@/components/subSideBarComponent'
export default {
  components: {
    subSideBarComponent
  },
  data () {
    return {
      title: '会员管理',
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
  computed: {
    routePath () {
      return this.$route.name
    }
  },
  watch: {
    // 实时监听路由地址，点击浏览器返回按键时，侧边栏导航状态实时更新
    routePath (pathName) {
      this.isSelect = pathName
    }
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
  .form-group {
    margin-bottom: 20px;
    label {
      font-size: 16px;
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
