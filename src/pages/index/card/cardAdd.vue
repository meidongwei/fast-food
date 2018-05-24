<template>
  <SegmentRight>
    <SegmentRightTitle>新增会员</SegmentRightTitle>
    <SegmentRightContent>
      <div class="content-box">
        <div class="box-form">
          <div class="form-group">
            <label class="flag" for="cardnum">会员卡号：</label>
            <input id="cardnum" type="text" class="form-control"
              placeholder="请输入会员卡号">
          </div>
          <div class="form-group">
            <label class="flag" for="cardphone">会员电话：</label>
            <input id="cardphone" type="number" class="form-control"
              placeholder="请输入手机号">
          </div>
          <div class="form-group">
            <label for="cardname">会员姓名：</label>
            <input id="cardname" type="text" class="form-control"
              placeholder="请输入会员姓名">
          </div>
          <div class="form-group">
            <label>会员性别：</label>
            <select name="" class="form-control">
              <option value="">男</option>
              <option value="">女</option>
            </select>
          </div>
          <div class="form-group">
            <label for="cardbirth">会员生日：</label>
            <input id="cardbirth" type="text" class="form-control"
              placeholder="请选择会员生日">
          </div>
        </div>
        <div class="btn-box">
          <a href="javascript:;" class="btn btn-primary">确定</a>
        </div>
      </div>
    </SegmentRightContent>
  </SegmentRight>
</template>

<script>
import SegmentRight from '@/components/segmentRight'
import SegmentRightTitle from '@/components/segmentRightTitle'
import SegmentRightContent from '@/components/segmentRightContent'
export default {
  components: {
    SegmentRight,
    SegmentRightTitle,
    SegmentRightContent
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.form-group {
  label {
    font-size: 20px;
  }
  .form-control {
    font-size: 20px;
    width: 320px;
  }
}

  .content-box {
    width: 500px;
    .box-form {
      margin-bottom: 50px;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
    }
  }
</style>
