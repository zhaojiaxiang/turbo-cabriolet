<template>
  <div>
    <el-dialog title="邮件发送" :visible.sync="dialogEdit" :close-on-click-modal="false">
      <el-form label-position="right" label-width="80px">
        <el-form-item label="收件人">
          <el-select v-model="address" class="input-long" multiple clearable>
            <el-option
              v-for="item in addresslist"
              :key="item.name"
              :label="item.name"
              :value="item.email"
            >
              <span style="float: left">{{ item.name }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{
                item.email
              }}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-table
        :data="tableData"
        height="240"
        style="width:100%"
        size="medium"
        border
      >
        <el-table-column
          prop="fsystem"
          label="系统"
          min-width="50"
        />
        <el-table-column
          prop="fcomment"
          label="程序"
          min-width="80"
        />
        <el-table-column
          prop="fslipno"
          label="联络票号"
          min-width="130"
        />
        <el-table-column
          prop="fchkoutobj"
          label="文件名称"
          min-width="200"
          show-overflow-tooltip
        />
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button plain type="primary" @click="sendData">邮件发送</el-button>
        <el-button plain @click="dialogEdit = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getCheckoutList,
  getAddressList,
  sendMail
} from '@/api/checkouts';

export default {
  data() {
    return {
      user: '',
      dialogEdit: false,
      address: [],
      addresslist: [],
      tableData: [],
      loading: false
    };
  },

  methods: {
    init(user) {
      this.getAddressList();
      this.getCheckoutList(user);
      this.user = user;
      this.dialogEdit = true;
    },

    async getAddressList() {
      this.address = [];
      this.addresslist = [];
      var resp = await getAddressList()
      var dataList = [];
      dataList = resp.data;
      for (var i in dataList) {
        var name = dataList[i].name;
        var email = dataList[i].email;

        var row = {
          name: name,
          email: email
        };
        this.addresslist.push(row);
      }
    },

    async getCheckoutList(user) {
      this.tableData = [];
      var resp = await getCheckoutList(user, '1-ASK')

      if (resp.result === 'NG') { return }

      var dataList = [];
      dataList = resp.data.results;
      for (var i in dataList) {
        var fsystem = dataList[i].fsystem;
        var fcomment = dataList[i].fcomment;
        var fslipno = dataList[i].fslipno;
        var fchkoutobj = dataList[i].fchkoutobj;

        var row = {
          fsystem: fsystem,
          fcomment: fcomment,
          fslipno: fslipno,
          fchkoutobj: fchkoutobj
        };
        this.tableData.push(row);
      }
    },

    async sendData() {
      if (this.tableData.length < 1) {
        this.$message.error('没有需要迁出的文件');
        return;
      }
      if (this.address.length < 1) {
        this.$message.error('收件人不能为空');
        return;
      }

      var sendlist = '';
      for (var i in this.address) {
        sendlist += this.address[i] + ',';
      }
      sendlist = sendlist.substring(0, sendlist.length - 1);
      var send = {
        user: this.user,
        addresslist: sendlist,
        tableData: this.tableData
      };
      var resp = await sendMail(send)

      if (resp.result === 'OK') {
        this.dialogEdit = false;
        this.$message({
          message: '邮件发送成功',
          type: 'success'
        });
      }
    }
  }
};
</script>
<style scoped>
.input-short {
  width: 40%;
}

.input-long {
  width: 70%;
}
</style>
