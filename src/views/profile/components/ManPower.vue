<template>
  <div>
    <el-form label-width="100px">
      <el-form-item label="同步日期：">
        <el-checkbox-group v-model="weeksGroup" size="medium">
          <el-checkbox-button v-for="week in weeks" :key="week" :label="week">{{
            week
          }}</el-checkbox-button>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">确认修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import store from '@/store'
export default {
  data() {
    return {
      weeks: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      emaildays: '',
      weeksGroup: []
    }
  },
  created() {
    this.refreshManPower()
  },
  methods: {

    refreshManPower() {
      let mail_days = store.getters.user_mail_days
      mail_days = mail_days.replace('1', '周一')
      mail_days = mail_days.replace('2', '周二')
      mail_days = mail_days.replace('3', '周三')
      mail_days = mail_days.replace('4', '周四')
      mail_days = mail_days.replace('5', '周五')
      mail_days = mail_days.replace('6', '周六')
      mail_days = mail_days.replace('7', '周日')
      this.weeksGroup = mail_days.split(',')
    },

    async submit() {
      this.weeksGroup.sort()
      var weekGroupStr = this.weeksGroup.join(',')
      weekGroupStr = weekGroupStr.replace('周一', '1')
      weekGroupStr = weekGroupStr.replace('周二', '2')
      weekGroupStr = weekGroupStr.replace('周三', '3')
      weekGroupStr = weekGroupStr.replace('周四', '4')
      weekGroupStr = weekGroupStr.replace('周五', '5')
      weekGroupStr = weekGroupStr.replace('周六', '6')
      weekGroupStr = weekGroupStr.replace('周日', '7')

      await store.dispatch('user/updateManPower', weekGroupStr)

      this.$message.success('工时系统信息修改成功！')
      this.refreshManPower();
    }
  }
}
</script>
