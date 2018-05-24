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
      title: '交班关班',
      isSelect: 'closePage',
      subBarList: [
        {
          id: 1,
          name: '交班关班',
          value: 'closePage'
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
