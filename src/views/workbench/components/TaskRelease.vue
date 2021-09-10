<template>
  <div class="div-container">
    <el-row class="row-top">
      <el-col :span="24">
        <div style="text-align:left; " class="vertical">
          <h3 style="margin:0 auto;">待发布</h3>
        </div>
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      border
      size="medium"
    >
      <el-table-column label="详情" type="expand" width="80">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="联络票：">
              <span>{{ props.row.fslipno }}</span>
            </el-form-item>
            <el-form-item label="SIR NO：">
              <span>{{ props.row.fsirno }}</span>
            </el-form-item>
            <el-form-item label="订单号：">
              <span>{{ props.row.fodrno }}</span>
            </el-form-item>
            <el-form-item label="开发概要：">
              <span>{{ props.row.fbrief }}</span>
            </el-form-item>
            <el-form-item label="问题描述：">
              <span>{{ props.row.fcontent }}</span>
            </el-form-item>
            <el-form-item label="问题分析：">
              <span>{{ props.row.fanalyse }}</span>
            </el-form-item>
            <el-form-item label="解决方案：">
              <span>{{ props.row.fsolution }}</span>
            </el-form-item>
            <el-form-item label="计划工时：">
              <span>{{ props.row.fplnmanpower }}</span>
            </el-form-item>
            <el-form-item label="实际工时：">
              <span>{{ props.row.factmanpower }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        prop="fstatus"
        label="状态"
        width="80"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-dropdown trigger="click" @command="handleStatus">
            <el-tag
              :class="statusTagClass(scope.row.fstatus)"
              disable-transitions
            >{{ scope.row.fstatus }}</el-tag>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-show="
                  true
                    ? scope.row.fstatus != '已发布'
                    : scope.row.fstatus == '已发布'
                "
                :command="beforeHandleStatus('4', scope.row)"
              >发布</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
      <el-table-column
        prop="ftype"
        label="类型"
        width="100"
        :filters="[
          { text: '追加开发', value: '追加开发' },
          { text: '改善需求', value: '改善需求' },
          { text: '维护阶段障碍', value: '维护阶段障碍' }
        ]"
        :filter-method="filterType"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag
            :type="typeTagClass(scope.row.ftype)"
            disable-transitions
            effect="plain"
          >{{ scope.row.ftype }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="fassignedto"
        label="对应者"
        min-width="90"
        :filters="user_filters"
        :filter-method="filterUser"
        filter-placement="bottom-end"
      />
      <el-table-column
        prop="fodrno"
        label="订单号"
        min-width="160"
        :filters="order_filters"
        :filter-method="filterOrder"
        filter-placement="bottom-end"
      />
      <el-table-column prop="fslipno" label="联络票号" min-width="160">
        <template slot-scope="scope">
          <el-link
            type="primary"
            :underline="false"
            @click="openSlipNoQa(scope.row.fslipno)"
          >{{ scope.row.fslipno }}</el-link>
        </template>
      </el-table-column>
      <el-table-column
        prop="fbrief"
        label="开发概要"
        min-width="370"
        show-overflow-tooltip
      />
      <el-table-column fixed="right" prop="actual" label="实际" width="220" />
      <el-table-column
        fixed="right"
        prop="factmanpower"
        label="实际工时"
        width="100"
      />

      <el-table-column
        fixed="right"
        prop="factmanpower"
        label="变更报表"
        width="100"
      >
        <template slot-scope="scope">
          <el-link :underline="false" type="primary" :icon="scope.row.icon" />
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-upload
            class="upload-demo"
            action="/api/file_upload/"
            :before-upload="beforeFileUpload"
            :limit="1"
          >
            <el-link
              :underline="false"
              type="primary"
              icon="el-icon-upload2"
              @click="cellclick(scope.row.id)"
            >上传</el-link>
          </el-upload>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import store from '@/store'
import {
  updateLiaisonStatus, liaisonFileUpdate, getSingleALlLiaisonBySlipNo
} from '@/api/workbench';
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      currentID: 0,
      tableData: [],
      user_filters: [],
      order_filters: []
    };
  },
  computed: {
    ...mapGetters(['task_release'])
  },
  created: function() {
    this.refreshLiaisons();
  },
  methods: {
    typeTagClass(type) {
      if (type === '追加开发') {
        return 'success';
      } else if (type === '改善需求') {
        return 'warning';
      } else {
        return 'danger';
      }
    },

    statusTagClass(status) {
      if (status === '待办') {
        return 'status-1';
      } else if (status === '进行中') {
        return 'status-2';
      } else if (status === '已完成') {
        return 'status-3';
      } else {
        return 'status-4';
      }
    },

    filterUser(value, row) {
      return row.fassignedto === value;
    },

    filterSlip(value, row) {
      return row.fslipno === value;
    },

    filterOrder(value, row) {
      return row.fodrno === value;
    },

    filterType(value, row) {
      return row.ftype === value;
    },
    goBack() {
      window.history.go(-1);
    },
    cellclick(id) {
      this.currentID = id;
    },
    openSlipNoQa(fslipno) {
      this.$router.push({ name: 'QaList', query: { slipno: fslipno }});
    },
    async refreshLiaisons() {
      this.tableData = [];

      await store.dispatch('workbench/getMyRelease')

      for (var i in this.task_release) {
        var isUserExisted = false;
        var isOrderExisted = false;
        var user_json = {};
        var order_json = {};

        var id = this.task_release[i].id;
        var ftype = this.task_release[i].ftype;
        var fstatus = this.task_release[i].fstatus;
        var fslipno = this.task_release[i].fslipno;
        var fodrno = this.task_release[i].fodrno;
        var fassignedto = this.task_release[i].fassignedto;
        var fbrief = this.task_release[i].fbrief;
        var fcontent = this.task_release[i].fcontent;
        var fanalyse = this.task_release[i].fanalyse;
        var fsolution = this.task_release[i].fsolution;
        var fsirno = this.task_release[i].fsirno;
        var factstart = this.task_release[i].factstart;
        var factend = this.task_release[i].factend;
        var freleasedt = this.task_release[i].freleasedt;
        var factmanpower = this.task_release[i].factmanpower;
        var fplnmanpower = this.task_release[i].fplnmanpower;
        var freleaserpt = this.task_release[i].freleaserpt;
        var actual = '';

        if (fstatus === '1') {
          fstatus = '待办';
        } else if (fstatus === '2') {
          fstatus = '进行中';
          actual = factstart;
        } else if (fstatus === '3') {
          fstatus = '已完成';
          actual = factstart + ' ~ ' + factend;
        } else if (fstatus === '4') {
          fstatus = '已发布';
          actual = factstart + ' ~ ' + factend;
        }
        var icon;
        if (freleaserpt) {
          icon = 'el-icon-document-checked';
        } else {
          icon = '';
        }

        user_json.text = fassignedto;
        user_json.value = fassignedto;

        order_json.text = fodrno;
        order_json.value = fodrno;

        for (var k in this.user_filters) {
          if (this.user_filters[k].text === fassignedto) {
            isUserExisted = true;
            continue;
          }
        }

        if (!isUserExisted) {
          this.user_filters.push(user_json);
        }

        for (var l in this.order_filters) {
          if (this.order_filters[l].text === fodrno) {
            isOrderExisted = true;
            continue;
          }
        }

        if (!isOrderExisted) {
          this.order_filters.push(order_json);
        }

        var liaison = {
          id: id,
          ftype: ftype,
          fstatus: fstatus,
          fslipno: fslipno,
          fodrno: fodrno,
          fassignedto: fassignedto,
          fbrief: fbrief,
          actual: actual,
          freleasedt: 'media/upload/file/' + freleasedt,
          factmanpower: factmanpower,
          icon: icon,
          fcontent,
          fanalyse,
          fsolution,
          fsirno,
          fplnmanpower
        };
        this.tableData.push(liaison);
      }
    },

    async beforeFileUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;

      const fileForm = new FormData();

      if (!isLt2M) {
        this.$message.error('上传文件大小不能超过 2MB!');
      }

      fileForm.append('file', file);
      fileForm.append('liaison', this.currentID);

      var resp = await liaisonFileUpdate(fileForm)

      if (resp.result === 'OK') {
        this.$message.success('文件上传成功');
        this.refreshLiaisons();
      }
    },

    async handleStatus(command) {
      console.log(command.row.id);
      var get_resp = await getSingleALlLiaisonBySlipNo(command.row.fslipno)
      console.log(get_resp);

      if (get_resp.result === 'OK') {
        var liaison = get_resp.data;
        var status = command.command;
        if (status === liaison.fstatus) {
          return;
        }
        var statusInfo = {
          fslipno: liaison.fslipno,
          fodrno: liaison.fodrno,
          fstatus: status
        };
        var put_resp = await updateLiaisonStatus(command.row.id, statusInfo)

        if (put_resp.result === 'OK') {
          this.$emit('refreshHome');
          this.$message({
            message: command.row.fslipno + '发布成功',
            type: 'success'
          });
          this.refreshLiaisons();
        }
      }
    },
    beforeHandleStatus(item, row) {
      return {
        command: item,
        row: row
      };
    }
  }
};
</script>

<style>
.card-shadow {
  box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
}
.status-1 {
  background-color: #fbe6d4;
  border-color: #fbe6d4;
  color: #ffa931;
}
.status-2 {
  background-color: #fecb89;
  border-color: #fecb89;
  color: #fff;
}
.status-3 {
  background-color: #ffa931;
  color: #fff;
  border-color: #ffa931;
}
.status-4 {
  background-color: #b9ac92;
  border-color: #b9ac92;
  color: #fff;
}

.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 120px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin: 0;
  width: 100%;
}

.div-container {
  padding: 4px 32px 4px 32px;
  position: relative;
}

.row-top {
  margin-top: 10px;
}

.vertical {
  display: table-cell;
  color: #606266;
  height: 36px;
  vertical-align: middle;
}
</style>
