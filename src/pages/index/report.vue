<template>
  <div style="display:flex;">
    <subSideBarComponent :isSelect="isSelect" :title="title"
      :subBarList="subBarList" @goto="goto">
    </subSideBarComponent>
    <router-view/>
  </div>
</template>

<script>
import SubSideBarComponent from '@/components/subSideBarComponent'
export default {
  components: {
    SubSideBarComponent
  },
  data () {
    return {
      title: '报表',
      isSelect: 'zdcx',
      subBarList: [
        {
          id: 1,
          name: '账单查询',
          value: 'zdcx'
        },
        {
          id: 2,
          name: '营业汇总表',
          value: 'yyhz'
        },
        {
          id: 3,
          name: '菜品销售统计表',
          value: 'cpxstj'
        },
        {
          id: 4,
          name: '退菜统计表',
          value: 'tctj'
        },
        {
          id: 5,
          name: '赠菜统计表',
          value: 'zctj'
        }
      ]
    }
  },
  methods: {
    goto () {

    }
  }
}
</script>

<style lang="css">
</style>
