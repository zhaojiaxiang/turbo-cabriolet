<template>
  <div class="goTop div-container">
    <el-row>
      <el-col :span="24">
        <div>
          <QaMclTargetActual />
        </div>
      </el-col>
    </el-row>
    <el-table
      :data="qadetails"
      tooltip-effect="dark"
      border
      size="medium"
      style="margin-top:10px"
    >
      <el-table-column label="序号" type="index" width="50" />
      <el-table-column prop="fsortrule" label="排序号" width="70" />
      <el-table-column
        prop="fclass1"
        label="分类1"
        width="100"
        show-overflow-tooltip
      />
      <el-table-column
        prop="fclass2"
        label="分类2"
        width="100"
        show-overflow-tooltip
      />
      <el-table-column prop="fregression" label="回归？" width="70">
        <template slot-scope="scope">
          <el-tag :type="regressionTag" disable-transitions>{{
            scope.row.fregression
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="fapproval" label="状态" width="70" />
      <el-table-column prop="fcontent" label="测试用例" show-overflow-tooltip />
      <el-table-column
        prop="ftestdte"
        label="测试日"
        width="100"
      />
      <el-table-column
        prop="ftestusr"
        label="测试者"
        width="100"
      />
      <el-table-column
        prop="fresult"
        label="结果"
        width="100"
        :filters="[
          { text: 'NULL', value: null },
          { text: 'OK', value: 'OK' },
          { text: 'NG', value: 'NG' },
          { text: 'NGOK', value: 'NGOK' },
          { text: 'CANCEL', value: 'CANCEL' }
        ]"
        :filter-method="filterResult"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag :type="handleTag(scope.row.fresult)">{{
            scope.row.fresult
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="贴图" width="100">
        <template slot-scope="scope">
          <el-link
            v-show="scope.row.fcontent_text"
            type="primary"
            :underline="false"
            style="margin-left:15px"
            @click="handleContentText(scope.row.id)"
          >{{ scope.row.test_tag }}</el-link>
        </template>
      </el-table-column>
    </el-table>

    <el-backtop target=".goTop" :bottom="100">
      <i class="el-icon-caret-top" />
    </el-backtop>

    <DialogQAContentText ref="DialogQAContentText" />
  </div>
</template>

<script>
import { getQaDetailByQaHead } from '@/api/qa'
import QaMclTargetActual from '@/views/qa/components/QaMclTargetActual';
import DialogQAContentText from '@/views/common/DialogQAContentText';
export default {
  components: {
    QaMclTargetActual,
    DialogQAContentText
  },
  data() {
    return {
      qadetails: []
    };
  },
  mounted: async function() {
    this.qaheadId = this.$route.query.qahf_id;
    this.refreshQaList();
  },

  methods: {
    handleTag(result) {
      if (!result) {
        return '';
      } else if (result === 'OK' || result === 'NGOK') {
        return 'success';
      } else if (result === 'NG') {
        return 'danger';
      } else {
        return 'info';
      }
    },
    handleContentText(id) {
      // this.$router.push({
      //   name: 'QaContentText',
      //   query: { type: 'display', qadf_id: id }
      // });
      this.$refs.DialogQAContentText.handleDialog(id, 'display')
    },

    filterResult(value, row) {
      return row.fresult === value;
    },

    async refreshQaList() {
      var resp = await getQaDetailByQaHead(this.qaheadId)

      if (resp.result === 'OK') {
        var qadata = resp.data;
        for (var i in qadata) {
          if (qadata[i].fregression === 'Y') {
            qadata[i].fregression = '是';
            this.regressionTag = '';
          } else {
            qadata[i].fregression = '否';
            this.regressionTag = 'info';
          }
          if (qadata[i].fapproval === 'Y') {
            qadata[i].fapproval = '已审核';
            this.approvalTag = '';
          } else {
            qadata[i].fapproval = '未审核';
            this.approvalTag = 'info';
          }
        }
        this.qadetails = resp.data;
      }
    }
  }
};
</script>

<style scoped>
.div-container {
  padding: 8px 32px 8px 32px;
  background-color: rgb(240, 242, 245);
  position: relative;
}

.goTop {
  height: calc(100vh - 70px);
  overflow-x: hidden;
}
</style>
