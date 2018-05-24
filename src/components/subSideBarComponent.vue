<template>
  <SegmentLeft>
    <SegmentLeftTitle>{{ title }}</SegmentLeftTitle>
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
  </SegmentLeft>
</template>

<script>
import SegmentLeft from '@/components/segmentLeft'
import SegmentLeftTitle from '@/components/segmentLeftTitle'
export default {
  components: {
    SegmentLeft,
    SegmentLeftTitle
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    isSelect: {
      type: String,
      default: ''
    },
    subBarList: {
      type: Array,
      default: []
    }
  },
  data () {
    return {}
  },
  methods: {
    goto (val) {
      this.$emit('goto', val)
    }
  }
}
</script>

<style lang="scss">
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
</style>
