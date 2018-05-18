<template>
  <div class="segment-right">
    <div class="right-title">新增会员</div>
    <div class="right-content">
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
        <div class="box-btn">
          <a href="javascript:;" class="btn btn-primary">确定</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
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
        // hiuhkkkjnlknlklknkbjkbjhbkjbkjkllkjlkjkljlkj
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
</style>
