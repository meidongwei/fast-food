<template>
  <div class="con-base">
    <div class="item-avatar-box">
      <div class="avatar">
        <img src="@/assets/logo.png">
      </div>
      <div class="cardnum-box">
        <div class="top">1648 4678 4657 4782</div>
        <div class="bottom">
          <div class="name">瓦利斯</div>
          <div class="phone">15615462234</div>
        </div>
      </div>
    </div>
    <div class="item-money-box">
      <div class="top">余额：<span>4567.00</span>元</div>
      <div class="bottom">黄金 VIP 会员卡</div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
  .con-base {
    width: 650px;
    margin-bottom: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .item-avatar-box {
      display: flex;
      .avatar {
        height: 50px;
        margin-right: 15px;
        img {
          height: 100%;
        }
      }
      .cardnum-box {
        .top {
          font-size: 22px;
          color: #666666;
        }
        .bottom {
          display: flex;
          font-size: 18px;
          color: #9d9d9d;
        }
      }
    }
    .item-money-box {
      text-align: right;
      .top {
        font-size: 18px;
        color: #666666;
        span {
          font-size: 24px;
          color: #fc7b38;
        }
      }
      .bottom {
        font-size: 18px;
        color: #9d9d9d;
      }
    }
  }
</style>
