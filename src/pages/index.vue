<template>
  <div class="container">

    <!-- 侧边栏（导航） -->
    <div class="index-sidebar">
      <div class="index-logo">
        <img src="../assets/logo-white.png">
      </div>
      <div class="index-con">
        <div class="index-con-item">
          <ul>
            <li v-for="item in sidebarList1" :key="item.id">
              <a href="javascript:;" @click="goto(item)">
                <img :src="item.url2" v-if="isSelect === item.name">
                <img :src="item.url" v-else>
              </a>
            </li>
          </ul>
        </div>
        <div class="index-con-item">
          <ul>
            <li v-for="item in sidebarList2" :key="item.id">
              <a href="javascript:;" @click="goto2(item)">
                <img :src="item.url">
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="index-time">
        {{ nowTime }}
      </div>
    </div>
    <keep-alive>
      <router-view/>
    </keep-alive>


      <!-- 备用金窗口 -->
    <SpareGoldDialog :isShow="isShowSpareGoldDialog"
      @close="handleCloseSpareGoldDialog"
      @submit="handleSaveByj">
    </SpareGoldDialog>
  </div>
</template>

<script>
import SpareGoldDialog from '@/components/dialog/spareGoldDialog'
import axios from 'axios'
import httpUrl from '@/http_url'
export default {
  components: {
    SpareGoldDialog
  },
  data () {
    return {
      epid: 0,
      shiftflag: 0,
      shift: 1,
      isShowSpareGoldDialog: false,
      nowTime: '',
      isSelect: 'order',
      sidebarList1: [
        {
          id: 1,
          name: 'order',
          url: require('../assets/icon-index/order-1.png'),
          url2: require('../assets/icon-index/order-2.png')
        },
        {
          id: 2,
          name: 'card',
          url: require('../assets/icon-index/card-1.png'),
          url2: require('../assets/icon-index/card-2.png')
        },
        {
          id: 3,
          name: 'close',
          url: require('../assets/icon-index/close-1.png'),
          url2: require('../assets/icon-index/close-2.png')
        },
        {
          id: 4,
          name: 'report',
          url: require('../assets/icon-index/report-1.png'),
          url2: require('../assets/icon-index/report-2.png')
        },
        {
          id: 5,
          name: 'setting',
          url: require('../assets/icon-index/setting-1.png'),
          url2: require('../assets/icon-index/setting-2.png')
        }
      ],
      sidebarList2: [
        {
          id: 1,
          url: require('../assets/icon-index/quite-1.png')
        }
      ]
    }
  },
  created () {
    this.getLocalDatas()
    this.getTime()
  },
  mounted () {
    // 刷新页面侧边栏导航状态不消失
    let path = this.$route.path
    let lastNum = path.lastIndexOf('/')
    if (lastNum === 6) {
      this.isSelect = path.substring(7)
    } else {
      this.isSelect = path.substring(7,lastNum)
    }
  },
  computed: {
    routePath () {
      return this.$route.path
    }
  },
  watch: {
    // 实时监听路由地址，点击浏览器返回按键时，侧边栏导航状态实时更新
    routePath (path) {
      let lastNum = path.lastIndexOf('/')
      if (lastNum === 6) {
        this.isSelect = path.substring(7)
      } else {
        this.isSelect = path.substring(7,lastNum)
      }
    }
  },
  methods: {
    // 获取本地数据
    getLocalDatas () {
      this.epid = JSON.parse(localStorage.getItem('epid'))
      this.shiftflag = JSON.parse(localStorage.getItem('shiftflag'))
      // this.privilege = JSON.parse(localStorage.getItem('privilege'))
      this.shift = JSON.parse(localStorage.getItem('shift'))

      // 没有未关班记录
      if (this.shiftflag === 0) {
        // 班次为1表示该账户第一次登录
        if (this.shift === 1) {
          this.isShowSpareGoldDialog = true
        }
      } else if (this.shiftflag === 1) { // 有未关班记录
        // 跳转到交班关班页面
        this.$router.push({name: 'close'})
      }
    },

    // 备用金
    handleSaveByj (money) {
      let a = {
        epid: this.epid,
        money: money
      }
      let data = "bizContent=" + JSON.stringify(a)
      axios({
        method: "post",
        url: httpUrl.saveByj,
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        },
        data: data
      })
      .then(res => {
        if (res.data.errcode === 0) {
          this.$toast(res.data.msg)
          this.isShowSpareGoldDialog = false
        } else {
          this.$toast(res.data.msg)
        }
      })
      .catch(err => console.log(err))
    },

    // 页面跳转
    goto (val) {
      this.$router.push({name: val.name})
      this.isSelect = val.name
    },

    // 退出
    goto2 (item) {
      if (item.id === 1) {
        // 清空 localStorage
        localStorage.clear()
        // 跳转到登录页面
        this.$router.push({name: 'login'})
      }
    },

    // 关闭备用金窗口
    handleCloseSpareGoldDialog (val) {
      this.isShowSpareGoldDialog = false
    },

    // 实时显示时间
    getTime() {
      let t = new Date()
      let h = t.getHours()
      let m = t.getMinutes()
      // let s = t.getSeconds()
      this.nowTime = h + ':' + m
      let _this = this
      setTimeout(() => {
        _this.getTime()
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
  .container {
    display: flex;
    .index-sidebar {
      width: 60px;
      height: 768px;
      background-color: #29292a;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-right: 10px;
      .index-logo {
        height: 60px;
        background-color: $primary-color;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 30px;
        }
      }
      .index-con {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        .index-con-item {
          padding-top: 20px;
          padding-bottom: 20px;
          width: 100%;
          ul li a {
            display: block;
            padding: 10px 0;
            text-align: center;
            img {
              width: 40px;
            }
          }
        }
      }
      .index-time {
        height: 60px;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
</style>
