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
          <div class="item-price">15.00</div>
          <div class="item-name">卡布奇诺卡布奇诺卡布奇诺</div>
          <div class="item-real-price">特价 10.00</div>
        </div>
        <div class="option-item item-right">&gt;</div>
      </div>
      <div class="index-option-else">
        <div class="else-item" v-for="item in 4">
          不加冰
        </div>
        <div class="else-item else-right">&gt;</div>
      </div>
      <div class="index-option-handle">
        <table class="handle-keyboard1">
          <tr>
            <td>7</td>
            <td>8</td>
            <td>9</td>
          </tr>
          <tr>
            <td>4</td>
            <td>5</td>
            <td>6</td>
          </tr>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
          </tr>
          <tr>
            <td>0</td>
            <td>.</td>
            <td>←</td>
          </tr>
        </table>
        <table class="handle-keyboard2">
          <tr>
            <td rowspan="2">数量</td>
            <td>台卡号</td>
            <td>优惠</td>
          </tr>
          <tr>
            <td>挂单</td>
            <td>取单</td>
          </tr>
          <tr>
            <td>删除</td>
            <td>反结</td>
            <td>开钱箱</td>
          </tr>
        </table>
        <table class="handle-keyboard3">
          <tr>
            <td>现金</td>
            <td>移动支付</td>
          </tr>
          <tr>
            <td>团购券</td>
            <td>银行卡</td>
          </tr>
          <tr>
            <td>会员卡</td>
            <td>
              <div style="transform: rotate(90deg);">&gt;</div>
            </td>
          </tr>
        </table>
      </div>
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
      ],
      keyboard1List: [
        {
          id: 1,
          name: '7'
        },
        {
          id: 2,
          name: '8'
        },
        {
          id: 3,
          name: '9'
        },
        {
          id: 4,
          name: '4'
        },
        {
          id: 5,
          name: '5'
        },
        {
          id: 6,
          name: '6'
        },
        {
          id: 7,
          name: '1'
        },
        {
          id: 8,
          name: '2'
        },
        {
          id: 9,
          name: '3'
        },
        {
          id: 10,
          name: '0'
        },
        {
          id: 11,
          name: '.'
        },
        {
          id: 12,
          name: '删除'
        }
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
    border: 1px solid $border-color-lighter;
    border-bottom: none;
    background-color: #f5f5f5;
  }
  .index-order-input {
    height: 60px;
    border: 1px solid $border-color-lighter;
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
    border: 1px solid $border-color-lighter;
    border-bottom: none;
  }
  .index-order-total {
    height: 50px;
    border: 1px solid $border-color-lighter;
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
  width: 614px;
  height: 748px;
  margin-right: 10px;
  margin-top: 10px;
  .index-option-topbar {
    height: 60px;
    margin-bottom: 10px;
    ul {
      display: flex;
      justify-content: space-between;
      li {
        a {
          height: 60px;
          width: 96px;
          font-size: 18px;
          color: #315886;
          background-color: #cee6ee;
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
    border-right: 1px solid $border-color-lighter;
    border-bottom: 1px solid $border-color-lighter;
    .option-item {
      background-color: #f5f5f5;
      box-sizing: border-box;
      width: 20%;
      height: 100px;
      border: 1px solid $border-color-lighter;
      border-right: none;
      border-bottom: none;
      display: flex;
      flex-direction: column;
      .item-price {
        flex: 1;
        color: #9e9e9e;
        text-align: right;
        padding-right: 5px;
      }
      .item-name {
        flex: 2;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
      }
      .item-real-price {
        flex: 1;
        color: #ed7e38;
        font-size: 14px;
        padding-left: 5px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
      }
    }
    .item-right {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 30px;
    }
  }
  .index-option-else {
    display: flex;
    border-right: 1px solid $border-color-lighter;
    margin-bottom: 10px;
    .else-item {
      background-color: #ffb03b;
      box-sizing: border-box;
      width: 20%;
      border: 1px solid $border-color-lighter;
      border-top: none;
      border-right: none;
      color: #fff;
      height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .else-right {
      font-size: 30px;
    }
  }
  .index-option-handle {
    height: 207px;
    display: flex;
    .handle-keyboard1 {
      height: 100%;
      width: 180px;
      tr td {
        border: 1px solid $border-color-lighter;
        width: 33.33%;
        text-align: center;
        font-size: 30px;
        color: #6a6a6a;
        background-color: #f4f4f4;
      }
    }
    .handle-keyboard2 {
      height: 100%;
      width: 260px;
      tr td {
        background-color: #72a6ba;
        width: 33.33%;
        text-align: center;
        font-size: 20px;
        color: #fff;
      }
    }
    .handle-keyboard3 {
      height: 100%;
      width: 174px;
      tr td {
        background-color: $primary-color;
        width: 33.33%;
        text-align: center;
        font-size: 20px;
        color: #fff;
      }
    }
  }
}
</style>
