<template>
  <div>
    <div class="segment-right" v-if="isShowLock">
      <div class="right-title">会员查询</div>
      <div class="right-content">
        <div class="content-box">
          <div class="box-form">
            <div class="form-group">
              <label for="cardnum">会员卡号：</label>
              <input id="cardnum" type="text" class="form-control"
                v-model="cardnum"
                placeholder="请刷卡/输入会员卡号/手机号">
            </div>
            <table>
              <tr v-for="tr in numList">
                <td v-for="td in tr" :keys="td.id"
                  @click="handleInputNum(td.value)">
                  {{ td.value }}
                </td>
              </tr>
            </table>
          </div>
          <div class="box-btn">
            <a href="javascript:;" class="btn btn-primary"
              @click="handleSubmit">确定</a>
          </div>
        </div>
      </div>
    </div>
    <div class="segment-right" v-if="!isShowLock">
      <div class="right-title">
        <div class="title-tab">
          <span class="active">微信卡</span>
          <span>实体卡</span>
        </div>
        <div class="title-update">
          <a href="javascript:;" class="link" @click="handleUpdateMsg">编辑</a>
        </div>
      </div>
      <div class="right-content right-con">
        <div class="con-form">
          <div class="con-item">
            <div class="form-group">
              <label for="cardphone">手机号码：</label>
              <input id="cardphone" type="number" class="form-control" disabled>
            </div>
            <div class="form-group">
              <label for="cardname">会员姓名：</label>
              <input id="cardname" type="text" class="form-control"
                placeholder="请输入会员姓名" :disabled="isDisabled">
            </div>
            <div class="form-group">
              <label for="cardbirth">会员生日：</label>
              <input id="cardbirth" type="text" class="form-control"
                placeholder="请选择会员生日" :disabled="isDisabled">
            </div>
            <div class="form-group">
              <label for="cardyucun">预存余额：</label>
              <input id="cardyucun" type="text" class="form-control" disabled>
            </div>
          </div>
          <div class="con-item">
            <div class="form-group">
              <label for="cardnum">会员卡号：</label>
              <input id="cardnum" type="text" class="form-control" disabled>
            </div>
            <div class="form-group">
              <label>会员等级：</label>
              <select name="" class="form-control" :disabled="isDisabled">
                <option value="">普通会员</option>
                <option value="">白银会员</option>
                <option value="">钻石会员</option>
              </select>
            </div>
            <div class="form-group">
              <label>会员性别：</label>
              <select name="" class="form-control" :disabled="isDisabled">
                <option value="">男</option>
                <option value="">女</option>
              </select>
            </div>
            <div class="form-group">
              <label for="cardjifen">积分余额：</label>
              <input id="cardjifen" type="text" class="form-control" disabled>
            </div>
          </div>
        </div>
        <div class="con-list">
          <ul>
            <li v-for="item in couponList" :keys="item.id">
              <span class="type"
                :class="item.type === '代' ? 'type-color1' : 'type-color2'">
                {{ item.type }}
              </span>
              <span>{{ item.name }}</span>
              <span>有效期截止{{ item.endDate }}</span>
              <span><span>{{ item.number }}</span> 张可用</span>
            </li>
          </ul>
        </div>
        <div class="con-btn" v-if="!isDisabled">
          <a href="javascript:;" class="btn btn-danger">重置密码</a>
          <a href="javascript:;" class="btn btn-default-dark">取消</a>
          <a href="javascript:;" class="btn btn-primary"
            @click="handleSave">保存</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isDisabled: true,
      cardnum: '',
      isShowLock: true,
      numList: [
        [
          { id: 1, value: '7' },
          { id: 2, value: '8' },
          { id: 3, value: '9' },
        ],
        [
          { id: 1, value: '4' },
          { id: 2, value: '5' },
          { id: 3, value: '6' },
        ],
        [
          { id: 1, value: '1' },
          { id: 2, value: '2' },
          { id: 3, value: '3' },
        ],
        [
          { id: 1, value: '0' },
          { id: 2, value: '00' },
          { id: 3, value: 'x' },
        ]
      ],
      couponList: [
        {
          id: 1,
          type: '代',
          name: '10元代金券',
          endDate: '2017-05-07',
          number: 3
        },
        {
          id: 2,
          type: '菜',
          name: '10元代金券',
          endDate: '2017-05-07',
          number: 3
        },
        {
          id: 3,
          type: '代',
          name: '10元代金券',
          endDate: '2017-05-07',
          number: 3
        },
        {
          id: 4,
          type: '代',
          name: '10元代金券',
          endDate: '2017-05-07',
          number: 3
        }
      ]
    }
  },
  methods: {
    handleInputNum (val) {
      if (val === 'x') {
        this.cardnum = this.cardnum.substring(0, this.cardnum.length-1)
      } else {
        this.cardnum += val
      }
    },
    handleSubmit () {
      if (this.cardnum === '123123') {
        // 请求会员卡信息
        this.isShowLock = false
      }
    },
    handleUpdateMsg () {
      this.isDisabled = false
    },
    handleSave () {
      this.isDisabled = true
    }
  }
}
</script>

<style lang="scss" scoped>
  .form-group {
    label {
      font-size: 16px;
    }
    .form-control {
      font-size: 16px;
      width: 230px;
    }
  }
  .right-content {
    height: 690px;
    display: flex;
    justify-content: center;
    align-items: center;
    .content-box {
      width: 500px;
      // border: 1px solid red;
      .box-form {
        margin-bottom: 50px;
        // border: 1px solid blue;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        .form-group {
          margin-bottom: 20px;
          label {
            font-size: 20px;
            color: #656565;
          }
          .form-control {
            height: 50px;
            width: 320px;
            box-sizing: border-box;
            font-size: 20px;
            padding: 0 10px;
            background-color: #fff;
            border: 0px;
            border: none;
            border-bottom: 1px solid $border-color-lighter;
            -webkit-appearance: none;
            -webkit-border-radius: 0px;
          }
        }
        table {
          border-collapse: collapse;
          width: 450px;
          tr td {
            border: 1px solid $border-color-lighter;
            height: 80px;
            width: 33.33%;
            text-align: center;
            font-size: 30px;
            cursor: pointer;
          }
        }
      }
      .box-btn {
        display: flex;
        justify-content: center;
        margin-bottom: 10px;
        a {
          display: block;
          width: 50%;
        }
      }
    }
  }
  .right-title {
    display: flex;
    justify-content: space-between;
    .title-tab {
      display: flex;
      height: 100%;
      span {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 15px;
        margin-right: 15px;
        box-sizing: border-box;
      }
      span.active {
        position: relative;
      }
      span.active::after {
        content: '';
        height: 2px;
        width: 100%;
        background-color: $primary-color;
        position: absolute;
        left: 0;
        bottom: 0;
        right: 0;
      }
    }
  }
  .right-con {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    box-sizing: border-box;
    padding-top: 50px;
    .con-form {
      display: flex;
      margin-bottom: 20px;
      .con-item:first-child {
        margin-right: 20px;
      }
    }
    .con-list {
      width: 650px;
      margin-bottom: 20px;
      ul li {
        // border: 1px solid red;
        width: 100%;
        height: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 16px;
        margin-bottom: 10px;
        color: #696969;
        span span {
          color: $primary-color;
        }
        span.type {
          height: 35px;
          width: 35px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #fff;
        }
        span.type-color1 {
          background-color: #f56c5e;
        }
        span.type-color2 {
          background-color: #40a7bb;
        }
      }
    }
    .con-btn {
      display: flex;
      justify-content: center;
      // border: 1px solid red;
      width: 100%;
      .btn {
        margin-right: 10px;
        width: 24%;
      }
      .btn:nth-child(3) {
        margin-right: 0;
      }
    }
  }
</style>
