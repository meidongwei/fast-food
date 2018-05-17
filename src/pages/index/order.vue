<template>
  <div style="display:flex;">
    <div class="index-order">
      <div class="index-order-top"></div>
      <div class="index-order-input">
        <input type="text" placeholder="数量/台卡号/现金/订单号">
      </div>
      <div class="index-order-con"></div>
      <div class="index-order-total">
        <span>消费合计：</span>
        <span>0.00</span>
      </div>
      <div class="index-order-else">
        <span>现金退款：</span>
        <span>0.00</span>
      </div>
    </div>
    <div class="index-option">
      <div class="index-option-topbar">
        <ul>
          <li>
            <a href="javascript:;">全部</a>
          </li>
          <li v-for="item in topbarList">
            <a href="javascript:;">{{ item.name }}</a>
          </li>
          <li>
            <a href="javascript:;">&gt;</a>
          </li>
        </ul>
      </div>
      <div class="index-option-con">
        <div class="option-item" v-for="item in 19">
          {{ item }}
        </div>
      </div>
      <div class="index-option-else"></div>
      <div class="index-option-handle"></div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      topbarList: [
        {
          id: 1,
          name: '汉堡包套餐',
        },
        {
          id: 2,
          name: '饮料',
        },
        {
          id: 3,
          name: '披萨',
        },
        {
          id: 4,
          name: '甜品',
        },
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.index-order {
  width: 320px;
  height: 748px;
  margin-right: 10px;
  margin-top: 10px;
  .index-order-top {
    height: 60px;
    border: 1px solid #c6c6c6;
    border-bottom: none;
    background-color: #f5f5f5;
  }
  .index-order-input {
    height: 60px;
    border: 1px solid #c6c6c6;
    border-bottom: none;
    input {
      border: none;
      height: 100%;
      width: 100%;
      font-size: 20px;
      padding: 0 10px;
      box-sizing: border-box;
    }
  }
  .index-order-con {
    height: 514px;
    border: 1px solid #c6c6c6;
    border-bottom: none;
  }
  .index-order-total {
    height: 50px;
    border: 1px solid #c6c6c6;
    border-bottom: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
  }
  .index-order-else {
    height: 60px;
    background-color: $primary-color;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    color: #fff;
  }
}
.index-option {
  background-color: #f5f5f5;
  width: 614px;
  height: 748px;
  margin-right: 10px;
  margin-top: 10px;
  .index-option-topbar {
    height: 60px;
    ul {
      display: flex;
      justify-content: space-between;
      li {
        a {
          height: 60px;
          width: 96px;
          font-size: 18px;
          color: #315886;
          background-color: #c5dfee;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
        }
      }
    }
  }
  .index-option-con {
    display: flex;
    flex-wrap: wrap;
    // justify-content: space-between;
    .option-item {
      width: 120px;
      height: 60px;
      border: 1px solid red;
    }
  }
}
</style>
