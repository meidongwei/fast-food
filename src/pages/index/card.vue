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

<style lang="scss" scoped>
</style>
