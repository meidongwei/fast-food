<template>
  <div>
    <div class="start-bg" v-if="isShowStart">
      <img src="../assets/start.png">
    </div>
    <div class="container" v-if="!isShowStart">
      <div class="login-close">
        <a href="javascript:;" @click="handleShowQuiteDialog">
          <img src="../assets/5.png">
        </a>
      </div>
      <div class="login-title">
        <img src="../assets/logo.png">
        <p>餐行健·品智餐饮管理系统</p>
      </div>
      <div class="login-segment">
        <div class="login-box">
          <p>当前门店：亚运村店</p>
          <input type="text" class="input input-user"
            placeholder="请输入您的工号" v-model="userno"
            @focus="handleOpenKeyboard1">
          <input type="password" class="input input-pwd"
            placeholder="请输入密码" v-model="password"
            @focus="handleOpenKeyboard2">
          <button class="btn"
            :class="[{'btn-primary': isLogin}, {'btn-allowed': !isLogin}]"
            :disabled="!isLogin" @click="login">登录</button>
          <div class="setting">
            <a href="javascript:;" class="link"
              @click="handleShowPwdDialog">修改密码</a>
          </div>
        </div>
      </div>
      <div class="login-footer">
        <div class="tel">
          <img src="../assets/6.png">
          <p>服务热线：400-005-3223</p>
        </div>
        <div class="logo">
          <img src="../assets/7.png">
        </div>
      </div>
    </div>
    <GeneralDialog :isShow="isShowQuiteDialog" @close="handleCloseQuiteDialog"
      title="温馨提示" text="是否确定要退出系统？">
    </GeneralDialog>
    <PwdDialog :isShow="isShowPwdDialog" @close="handleClosePwdDialog">
    </PwdDialog>
    <Keypad :isShow="isShowKeypad1" @handleInputNum="handleInputNum1"
      @handleClearInput="handleClearInput1" @close="handleCloseKeypad1"
      :height="keyboardHeight1">
    </Keypad>
    <Keypad :isShow="isShowKeypad2" @handleInputNum="handleInputNum2"
      @handleClearInput="handleClearInput2" @close="handleCloseKeypad2"
      :height="keyboardHeight2">
    </Keypad>
  </div>
</template>

<script>
import GeneralDialog from '@/components/dialog/generalDialog'
import PwdDialog from '@/components/dialog/pwdDialog'
import Keypad from '@/components/keypad'
import axios from 'axios'
import httpUrl from '@/http_url'
export default {
  components: {
    GeneralDialog,
    PwdDialog,
    Keypad
  },
  data () {
    return {
      keyboardHeight1: 0,
      keyboardHeight2: 0,
      isShowKeypad1: false,
      isShowKeypad2: false,
      isShowStart: true,
      userno: '',
      password: '',
      isLogin: false,
      isShowQuiteDialog: false,
      isShowPwdDialog: false
    }
  },
  mounted () {
    setTimeout(() => {
      this.isShowStart = false
    }, 1000)
  },
  computed: {
    checkedInput () {
      const { userno, password } = this
      return { userno, password }
    }
  },
  watch: {
    checkedInput (val) {
      if (val.userno !== '' && val.password !== '') {
        this.isLogin = true
      } else {
        this.isLogin = false
      }
    }
  },
  methods: {
    login () {
      let a = {
        epno: this.userno,
        userpwd: this.password
      }
      let data = "bizContent=" + JSON.stringify(a)
      axios({
        method: "post",
        url: httpUrl.login,
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        },
        data: data
      })
      .then(res => {
        if (res.data.errcode === 0) {
          this.$toast(res.data.msg)
          // 常用信息存到本地
          localStorage.setItem('epid', JSON.stringify(res.data.epid))
          localStorage.setItem('shiftflag', JSON.stringify(res.data.shiftflag))
          localStorage.setItem('privilege', JSON.stringify(res.data.privilege))
          localStorage.setItem('shift', JSON.stringify(res.data.shift))
          // 跳转
          this.$router.push({name: 'index'})
        } else {
          this.$toast(res.data.msg)
        }
      })
      .catch(err => console.log(err))
    },
    handleShowQuiteDialog () {
      this.isShowQuiteDialog = true
    },
    handleCloseQuiteDialog () {
      this.isShowQuiteDialog = false
    },
    handleShowPwdDialog () {
      this.isShowPwdDialog = true
    },
    handleClosePwdDialog () {
      this.isShowPwdDialog = false
    },

    // 打开小键盘
    handleOpenKeyboard1 () {
      this.keyboardHeight1 = 322
      this.isShowKeypad2 = false
      this.isShowKeypad1 = true
    },

    // 输入
    handleInputNum1 (val) {
      if (val.id === 12) {
        this.userno = this.userno.substring(0, this.userno.length-1)
      } else {
        this.userno += val.value
      }
    },

    // 点击小键盘上“清空”，清空输入框
    handleClearInput1 () {
      this.userno = ''
    },

    // 点击小键盘上“确定”，关闭小键盘
    handleCloseKeypad1 () {
      this.isShowKeypad1 = false
    },

    handleOpenKeyboard2 () {
      this.keyboardHeight2 = 400
      this.isShowKeypad1 = false
      this.isShowKeypad2 = true
    },

    handleInputNum2 (val) {
      if (val.id === 12) {
        this.password = this.password.substring(0, this.password.length-1)
      } else {
        this.password += val.value
      }
    },

    handleClearInput2 () {
      this.password = ''
    },

    handleCloseKeypad2 () {
      this.isShowKeypad2 = false
    },
  }
}
</script>

<style lang="scss" scoped>
  .container {
    background: url('../assets/1.png') no-repeat;
    .login-close {
      width: 100%;
      text-align: right;
      box-sizing: border-box;
      padding: 30px;
    }
    .login-title {
      color: #fff;
      margin-bottom: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        margin-right: 15px;
      }
      p {
        font-size: 30px;
      }
    }
    .login-segment {
      margin-bottom: 50px;
      display: flex;
      justify-content: center;
      .login-box {
        box-sizing: border-box;
        width: 550px;
        height: 400px;
        background-color: #f5f5f5;
        border-radius: 3px;
        box-shadow: 1px 1px 5px #bdbdbd;
        padding: 30px 70px;
        p {
          color: #8f8f8f;
          margin-top: 15px;
          margin-bottom: 20px;
          font-size: 18px;
        }
        .input {
          box-sizing: border-box;
          display: block;
          width: 100%;
          height: 58px;
          margin-bottom: 20px;
          border: none;
          border: 1px solid #eeeeee;
          border-radius: 3px;
          font-size: 20px;
          padding-left: 65px;
          padding-right: 10px;
        }
        .input-user {
          background: #fff url('../assets/3.png') no-repeat 20px;
        }
        .input-pwd {
          background: #fff url('../assets/4.png') no-repeat 20px;
        }
        .btn {
          width: 100%;
          font-size: 20px;
          margin-bottom: 20px;
          border-radius: 3px;
        }
        .btn-allowed {
          background-color: #d9d9d9;
          color: #fff;
          cursor: not-allowed;
        }
        .setting {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          .link {
            font-size: 20px;
          }
        }
      }
    }
    .login-footer {
      height: 100px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .tel {
        font-size: 20px;
        color: #adadad;
        margin-bottom: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          margin-right: 15px;
        }
      }
      .logo {
        width: 150px;
        img {
          width: 100%;
        }
      }
    }
  }
  .start-bg {
    width: 1024px;
    height: 768px;
    box-sizing: border-box;
    img {
      width: 100%;
      height: 100%;
    }
  }
</style>
