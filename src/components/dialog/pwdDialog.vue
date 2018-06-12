<template>
  <DialogWrapper :isShow="isShow" :isBig="true" title="修改密码">
    <template slot="content">
      <div class="form-group">
        <label for="input1">请输入工号：</label>
        <input id="input1" type="text" class="form-control" v-model="epno">
      </div>
      <div class="form-group">
        <label for="input2">请输入密码：</label>
        <input id="input2" type="password" class="form-control" v-model="userpwd">
      </div>
      <div class="form-group">
        <label for="input3">输入新密码：</label>
        <input id="input3" type="password" class="form-control" v-model="newpwd">
      </div>
      <div class="form-group">
        <label for="input4">确认新密码：</label>
        <input id="input4" type="password" class="form-control" v-model="newpwd2">
      </div>
      <div class="form-group tip">
        <p>密码只能为6位以内的数字！</p>
      </div>
    </template>
    <template slot="footer">
      <a href="javascript:;" class="btn btn-default"
        @click="close">取消</a>
      <a @click="login" class="btn btn-primary">确定</a>
    </template>
  </DialogWrapper>
</template>

<script>
import DialogWrapper from '@/components/dialog/dialogWrapper'
import axios from 'axios'
import httpUrl from '@/http_url'
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
  data () {
    return {
      epno: '',
      userpwd: '',
      newpwd: '',
      newpwd2: ''
    }
  },
  methods: {
    close () {
      this.$emit('close')
    },
    login () {
      let a = {
        epno: this.epno,
        userpwd: this.userpwd,
        newpwd: this.newpwd
      }
      let data = "bizContent=" + JSON.stringify(a)
      axios({
        method: "post",
        url: httpUrl.changePwd,
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        },
        data: data
      })
      .then(res => {
        if (res.data.errcode === 0) {
          this.$toast(res.data.msg)
          this.$emit('close')
        } else {
          this.$toast(res.data.msg)
        }
      })
      .catch(err => console.log(err))
    }
  }
}
</script>

<style lang="scss" scoped>
.tip {
  margin-bottom: 0;
  p {
    color: $primary-color;
  }
}
.btn {
  width: 50%;
}
</style>
