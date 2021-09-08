<template>
  <div class="goTop div-container">
    <el-row>
      <el-col :span="24" class="row-top">
        <div>
          <QaPclTargetActual />
        </div>
      </el-col>
    </el-row>

    <el-table
      v-loading="loading"
      :data="qa_pcl_list"
      tooltip-effect="dark"
      border
      size="medium"
      class="card-shadow row-top"
    >
      <el-table-column label="序号" type="index" width="50" />
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
            v-show="scope.row.fcontent_text.length > 0"
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
  </div>
</template>

<script>
import QaPclTargetActual from '@/views/qa/components/QaPclTargetActual';
import store from '@/store';
import { mapGetters } from 'vuex';
export default {
  components: {
    QaPclTargetActual
  },
  data() {
    return {
      loading: false,
      approvalTag: '',
      id: '',
      class1: '',
      class2: ''
    };
  },
  computed: {
    ...mapGetters(['qa_pcl_list'])
  },
  created: async function() {
    this.loading = true;
    this.id = this.$route.query.qahf_id;
    this.class1 = this.$route.query.class1;
    this.class2 = this.$route.query.class2;
    this.refreshQaList()
    this.loading = false;
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

    beforeHandleResult(item, row) {
      return {
        command: item,
        row: row
      };
    },

    handleContentText(id) {
      this.$router.push({
        name: 'QaContentText',
        query: { type: 'display', qadf_id: id }
      });
    },

    filterResult(value, row) {
      return row.fresult === value;
    },

    async refreshQaList() {
      var args = { 'id': this.id, 'class1': this.class1, 'class2': this.class2 }
      await store.dispatch('qa/refreshPclListViaClass', args)
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

.row-top{
  margin-top: 10px;
}

.card-shadow {
  box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
}
</style>
