<template>
  <DialogWrapper :isShow="isShow" :isBig="true" title="选择会员卡"
    :isShowX="true" @close="close">
    <template slot="content">
      <div class="con">
        <p class="title"> 手机号<span>18503118888</span> 关联了 <span>3</span> 张微生活会员卡，请选择：</p>
        <ul>
          <li @click="gotoInfo">
            <div class="top">
              <div class="left">微信电子卡</div>
              <div class="center">卜蒙蒙</div>
              <div class="right">普通会员</div>
            </div>
            <div class="bottom">上次使用时间：2016-05-18 17:59:00</div>
          </li>
          <li @click="gotoInfo">
            <div class="top">
              <div class="left">微信电子卡</div>
              <div class="center">卜蒙蒙</div>
              <div class="right">普通会员</div>
            </div>
            <div class="bottom">上次使用时间：2016-05-18 17:59:00</div>
          </li>
          <li @click="gotoInfo">
            <div class="top">
              <div class="left">微信电子卡</div>
              <div class="center">卜蒙蒙</div>
              <div class="right">普通会员</div>
            </div>
            <div class="bottom">上次使用时间：2016-05-18 17:59:00</div>
          </li>
        </ul>
      </div>
    </template>
    <template slot="footer">
      <div class="footer">
        <a href="javascript:;" class="btn btn-default"
          @click="">上一页</a>
        <a href="javascript:;" class="btn btn-primary"
          @click="">下一页</a>
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
    }
  },
  methods: {
    close () {
      this.$emit('close')
    },
    gotoInfo () {
      this.$emit('gotoInfo')
    }
  }
}
</script>

<style lang="scss" scoped>
.con {
  width: 100%;
  padding: 0 15px;
  box-sizing: border-box;
  .title {
    font-size: 20px;
    margin-bottom: 15px;
    color: #787878;
    span {
      color: red;
    }
  }
  ul {
    li {
      padding: 15px;
      .top {
        display: flex;
        justify-content: space-between;
        font-size: 24px;
        color: #787878;
        margin-bottom: 5px;
        .left {
          color: #4a4a4a;
        }
      }
      .bottom {
        font-size: 20px;
        color: #ababab;
      }
    }
    li:nth-child(2n+1) {
      background-color: #f6f6f6;
    }
    li:active {
      background-color: #e9e9e9;
    }
  }
}
.footer {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .btn {
    margin: 15px;
    margin-top: 0;
  }
}
</style>
