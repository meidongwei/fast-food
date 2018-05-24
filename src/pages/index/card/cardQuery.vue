<template>
  <div>
    <LockComponent :title="lockTitle"
      @handleSubmit="handleSubmit" v-if="isShowLock">
    </LockComponent>
    <SegmentRight v-if="!isShowLock">
      <SegmentRightTitle>
        <SubTab></SubTab>
        <div class="title-update">
          <a href="javascript:;" class="link" @click="handleUpdateMsg">编辑</a>
        </div>
      </SegmentRightTitle>
      <SegmentRightContent class="right-con">
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
      </SegmentRightContent>
    </SegmentRight>
  </div>
</template>

<script>
import SubTab from '@/components/subTab'
import SegmentRight from '@/components/segmentRight'
import SegmentRightTitle from '@/components/segmentRightTitle'
import SegmentRightContent from '@/components/segmentRightContent'
import LockComponent from '@/components/lockComponent'
export default {
  components: {
    SubTab,
    SegmentRight,
    SegmentRightTitle,
    SegmentRightContent,
    LockComponent
  },
  data () {
    return {
      isDisabled: true,
      lockTitle: '会员查询',
      isShowLock: true,
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
    handleUpdateMsg () {
      this.isDisabled = false
    },
    handleSave () {
      this.isDisabled = true
    },
    handleSubmit () {
      this.isShowLock = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .right-con {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
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
