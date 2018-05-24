<template>
  <div>
    <LockComponent :title="lockTitle"
      @handleSubmit="handleSubmit" v-if="isShowLock">
    </LockComponent>
    <SegmentRight v-if="!isShowLock">
      <SegmentRightTitle>
        <SubTab></SubTab>
      </SegmentRightTitle>
      <SegmentRightContent class="right-con">
        <CardBaseInfo></CardBaseInfo>
        <div class="cancelList">
          <div class="item" v-for="item in cancelList" :keys="item.id">
            <table>
              <tr>
                <td>{{ item.id }}</td>
                <td>实收金额：{{ item.realMoney }}.00</td>
                <td>{{ item.type }}</td>
                <td rowspan="2">
                  <a href="javascript:;" class="btn btn-primary">撤销</a>
                </td>
              </tr>
              <tr>
                <td>{{ item.date }}</td>
                <td>奖励金额：{{ item.jiangliMoney }}.00</td>
                <td>充值金额：{{ item.rechargeMoney }}</td>
              </tr>
            </table>

          </div>
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
import CardBaseInfo from '@/components/cardBaseInfo'
export default {
  components: {
    SubTab,
    SegmentRight,
    SegmentRightTitle,
    SegmentRightContent,
    LockComponent,
    CardBaseInfo
  },
  data () {
    return {
      lockTitle: '撤销充值',
      cardnum: '',
      isShowLock: true,
      cancelList: [
        {
          id: 1,
          realMoney: 200,
          type: '现金',
          date: '15:21:16',
          jiangliMoney: 200,
          rechargeMoney: 200
        },
        {
          id: 2,
          realMoney: 200,
          type: '现金',
          date: '15:21:16',
          jiangliMoney: 200,
          rechargeMoney: 200
        },
        {
          id: 3,
          realMoney: 200,
          type: '现金',
          date: '15:21:16',
          jiangliMoney: 200,
          rechargeMoney: 200
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
    .cancelList {
      width: 650px;
      border: 1px solid $border-color-lighter;
      border-bottom: none;
      .item {
        border-bottom: 1px solid $border-color-lighter;
        padding: 10px;
        table {
          width: 100%;
          border-collapse: collapse;
          tr td {
            padding: 10px;
            .btn {
              padding: 10px 20px;
            }
          }
          tr:nth-child(1) {
            color: #666666;
          }
          tr:nth-child(2) {
            color: #9D9D9D;
          }
        }
      }
    }
  }
</style>
