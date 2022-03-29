<template>
  <div class="div-style-1">
    <el-table :data="slip_table" border size="medium">
      <el-table-column
        prop="fstatus"
        label="状态"
        fixed
        width="80"
        :filters="[
          { text: '待办', value: '待办' },
          { text: '进行中', value: '进行中' },
          { text: '已完成', value: '已完成' },
          { text: '已发布', value: '已发布' }
        ]"
        :filter-method="filterStatus"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-dropdown trigger="click" @command="handleStatus">
            <el-tag
              :class="statusTagClass(scope.row.fstatus)"
              disable-transitions
              effect="plain"
            >{{ scope.row.fstatus }}</el-tag>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-show="
                  true
                    ? scope.row.fstatus != '待办'
                    : scope.row.fstatus == '待办'
                "
                :command="beforeHandleStatus('1', scope.row)"
              >待办</el-dropdown-item>
              <el-dropdown-item
                v-show="
                  true
                    ? scope.row.fstatus != '进行中'
                    : scope.row.fstatus == '进行中'
                "
                :command="beforeHandleStatus('2', scope.row)"
              >开始</el-dropdown-item>
              <el-dropdown-item
                v-show="
                  true
                    ? scope.row.fstatus != '已完成'
                    : scope.row.fstatus == '已完成'
                "
                :command="beforeHandleStatus('3', scope.row)"
              >完成</el-dropdown-item>
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
        fixed
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
      <el-table-column fixed prop="fslipno" label="联络票号" min-width="160">
        <template slot-scope="scope">
          <el-link
            type="primary"
            :underline="false"
            @click="openSlipNoQa(scope.row.fslipno, scope.row.fstatus)"
          >{{ scope.row.fslipno }}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="fodrno" label="订单号" min-width="100" />
      <el-table-column
        prop="fbrief"
        label="详情"
        min-width="370"
        show-overflow-tooltip
      />
      <el-table-column prop="plan" label="计划" width="220" />
      <el-table-column prop="actual" label="实际" width="220" />
      <el-table-column prop="freleasedt" label="发布" width="110" />
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-link
            type="primary"
            :underline="false"
            icon="el-icon-edit-outline"
            @click="openSlipNoModifiy(scope.row.id)"
          />
          <el-link
            v-show="
              true ? scope.row.fstatus == '待办' : scope.row.fstatus != '待办'
            "
            style="margin-left: 40px"
            type="primary"
            :underline="false"
            icon="el-icon-delete"
            @click="deleteInitLiaison(scope.row.id, scope.row.fslipno)"
          />
          <el-link
            v-show=" true ? (scope.row.fstatus == '已完成' || scope.row.fstatus == '已发布') : (scope.row.fstatus != '已完成' & scope.row.fstatus != '已发布') "
            style="margin-left: 40px"
            type="primary"
            :underline="false"
            icon="el-icon-tickets"
            @click="openQaList(scope.row.fslipno)"
          />
        </template>
      </el-table-column>
    </el-table>
    <el-row>
      <el-col :xs="24" :sm="24" :lg="24">
        <el-pagination
          background
          :current-page="slip_current_page"
          :page-sizes="[5, 10, 15, 20, 30, 50, 100]"
          :page-size="slip_page_size"
          :page-count="slip_page_count"
          layout="total, sizes, prev, pager, next, jumper"
          :total="slip_count"
          @size-change="handleSizeChange"
          @current-change="handlePage"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getSingleLiaison } from '@/api/workbench';
import store from '@/store';
import { mapGetters } from 'vuex';
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters([
      'slip_no_items',
      'slip_current_page',
      'slip_page_size',
      'slip_page_count',
      'slip_count',
      'slip_table'
    ])
  },
  mounted: function() {
    store.commit('workbench/SET_SLIP_CURRENT_PAGE', 1);
    this.refreshLiaisons();
  },
  methods: {
    handlePage(page) {
      store.commit('workbench/SET_SLIP_CURRENT_PAGE', page);
      this.refreshLiaisons();
    },

    handleSizeChange(size) {
      store.commit('workbench/SET_SLIP_PAGE_SIZE', size);
      this.refreshLiaisons();
    },

    openSlipNoModifiy(id) {
      this.bus.$emit('openSlipNoModifiy', id);
    },
    openSlipNoQa(fslipno, fstatus) {
      if (fstatus !== '待办') {
        this.$router.push({ name: 'QA', query: { slip_no: fslipno }});
      } else {
        this.$message.error('请先开始该项目');
      }
    },

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

    filterStatus(value, row) {
      return row.fstatus === value;
    },
    filterType(value, row) {
      return row.ftype === value;
    },

    canOpenReport(status) {
      if (status === '已完成') {
        return true;
      } else if (status === '已发布') {
        return true;
      }
      return false;
    },

    openQaList(slipno) {
      // 打开报表
      this.$router.push({ name: 'ReportSingle', query: { slipno: slipno }});
    },

    async refreshLiaisons() {
      await store.dispatch('workbench/getLiaisonsViaPagination');
    },

    async handleStatus(command) {
      var liaison_resp = await getSingleLiaison(command.row.id);

      if (liaison_resp.result === 'OK') {
        var liaison = liaison_resp.data;
        var status = command.command;
        if (status === '3' && Number(liaison.factmanpower) === 0) {
          this.$message.error('请先填写实际工数');
          return;
        }
        if (status === liaison.fstatus) {
          return;
        }
        var statusInfo = {
          fslipno: liaison.fslipno,
          fodrno: liaison.fodrno,
          fstatus: status
        };

        var args = { id: command.row.id, data: statusInfo };

        const { result } = await store.dispatch(
          'workbench/updateLiaisonStatus',
          args
        );
        if (result === 'OK') {
          this.$message({
            message: statusInfo.fslipno + '状态更新成功！',
            type: 'success'
          });
        }
      }
    },
    beforeHandleStatus(item, row) {
      return {
        command: item,
        row: row
      };
    },
    deleteInitLiaison(id, slipno) {
      this.$confirm('此操作将永久删除' + slipno + ', 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async action => {
          if (action === 'confirm') {
            var { result } = await store.dispatch(
              'workbench/deleteLiaison',
              id
            );
            if (result === 'OK') {
              this.$message({
                message: slipno + '已经删除！',
                type: 'success'
              });
            }
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消删除'
          });
        });
    }
  }
};
</script>

<style scoped>
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

.body-style {
  padding: 8px 10px;
}
.div-style-1 {
  margin: 0px;
  box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
}
</style>
