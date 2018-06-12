<template>
  <SegmentRight>
    <SegmentRightContent></SegmentRightContent>
  </SegmentRight>
</template>

<script>
import SegmentRight from '@/components/segmentRight'
import SegmentRightContent from '@/components/segmentRightContent'
import axios from 'axios'
import httpUrl from '@/http_url'
export default {
  components: {
    SegmentRight,
    SegmentRightContent
  },
  data () {
    return {
      paymentsList: []
    }
  },
  created () {
    this.startShift()
  },
  methods: {
    // 查询支付方式
    startShift () {
      let a = {
        epid: JSON.parse(localStorage.getItem('epid'))
      }
      let data = "bizContent=" + JSON.stringify(a)
      axios({
        method: "post",
        url: httpUrl.startShift,
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        },
        data: data
      })
      .then(res => {
        if (res.data.errcode === 0) {
          this.paymentsList = res.data.payments
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
</style>
