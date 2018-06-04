<template>
  <DialogWrapper :isShow="isShow" :isSuperBig="true"
    :isShowX="true" @close="close" title="取单">
    <template slot="content">
      <div class="con">
        <div class="cell" v-for="item in list" :keys="item.id"
          @click="selectItemOfQudan(item)">
          <div class="header">
            <div class="num">{{ item.deskNum }}</div>
            <div class="date">{{ item.date }}</div>
            <a href="javascript:;" class="delete"
              @click="deleteItemOfQudan(item.id)">
              <img src="../../assets/delete.png">
            </a>
          </div>
          <ul class="list">
            <li v-for="cell in item.data">
              <div class="desc">{{ cell.name }}</div>
              <div class="count">{{ cell.count }}</div>
            </li>
          </ul>
          <div class="more" v-if="item.data.length>6">. . .</div>
        </div>
      </div>
    </template>
    <template slot="footer">
      <div class="footer">
        <a href="javascript:;" class="btn btn-primary"
          @click="toPreviousPage">上一页</a>
        <div class="pageNum">{{ pageNum }}</div>
        <a href="javascript:;" class="btn btn-default"
          @click="toNextPage">下一页</a>
      </div>
    </template>
  </DialogWrapper>
</template>

<script>
import DialogWrapper from '@/components/dialog/dialogWrapper'
export default {
  components: {
    DialogWrapper
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    // 传进来的数据源（最全的数据）
    listSource: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      pageNum: 1, // 当前页
      pageSize: 3, // 一页显示3条数据
      nextPageNum: 0, // 下一页
      prePageNum: 0, // 上一页
      startIndex: 0, // 下一页（上一页）开始索引
      endIndex: 3, // 下一页（上一页）结束索引
    }
  },
  computed: {
    /**
     * 要显示的分页数据
     * 计算属性：根据一个属性变化而变化，不可手动更改赋值
     * 所以把 startIndex 和 endIndex 动态绑定
     * 以后只需改变这两个值，就可以改变计算属性 list 的值
     */
    list () {
      let list = this.listSource
      return list.slice(this.startIndex, this.endIndex)
    }
  },
  methods: {
    // 关闭取单窗口
    close () {
      this.$emit('close')
    },

    // 删除取单列表中的一项
    deleteItemOfQudan (id) {
      this.$emit('deleteItemOfQudan', id)
    },

    // 选择取单列表中的一项
    selectItemOfQudan (item) {
      this.$emit('selectItemOfQudan', item)
    },

    // 下一页
    toNextPage () {
      let list = this.listSource
      let pageTotal = Math.ceil(list.length/3)
      if (pageTotal > this.pageNum) {
        this.nextPageNum = this.pageNum + 1
        this.startIndex = this.nextPageNum * this.pageSize - this.pageSize
        this.endIndex = this.nextPageNum * this.pageSize
        this.pageNum += 1
      } else {
        this.$toast('没有了')
      }
    },

    // 上一页
    toPreviousPage () {
      if (this.pageNum - 1 > 0) {
        this.prePageNum = this.pageNum - 1
        this.startIndex = this.prePageNum * this.pageSize - this.pageSize
        this.endIndex = this.prePageNum * this.pageSize
        this.pageNum -= 1
      } else {
        this.$toast('到头了')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.con {
  width: 820px;
  display: flex;
  margin-top: -20px;
  .cell {
    height: 360px;
    width: 265px;
    border: 1px solid $border-color-lighter;
    margin-right: 10px;
    .header {
      height: 50px;
      border-bottom: 1px dashed $border-color-lighter; // dotted
      display: flex;
      justify-content: space-between;
      align-items: center;
      .num {
        color: #F96F5C;
        font-size: 22px;
        padding-left: 10px;
      }
      .date {
        color: #bbbbbb;
        font-size: 20px;
        padding: 0 20px;
      }
      .delete {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        padding: 0 10px;
        img {
          width: 30px;
        }
      }
    }
    .list {
      height: 265px;
      padding-top: 10px;
      overflow-y: hidden;
      li {
        display: flex;
        justify-content: space-between;
        padding: 10px;
      }
    }
    .more {
      text-align: center;
    }
  }
  .cell:nth-child(3) {
    margin-right: 0;
  }
  .cell:active {
    border: 1px solid $primary-color;
  }
}
.footer {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  margin-top: -20px;
  .pageNum {
    border: 1px solid $border-color-lighter;
    padding: 0 20px;
    margin: 0 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
