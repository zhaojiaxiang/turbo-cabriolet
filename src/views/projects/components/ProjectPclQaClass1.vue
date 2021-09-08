<template>
  <div class="div-container">
    <el-row class="row-top">
      <el-col :span="24">
        <div>
          <QaPclTargetActual />
        </div>
      </el-col>
    </el-row>
    <el-table
      :data="qa_pcl_class1_list"
      tooltip-effect="dark"
      border
      size="medium"
      class="row-top"
    >
      <el-table-column label="序号" type="index" width="50" />
      <el-table-column
        prop="fclass1"
        sortable
        label="分类1"
        width="400"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <el-link
            type="primary"
            :underline="false"
            @click="openClass2(scope.row.fclass1)"
          >{{ scope.row.fclass1 }}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="class2_cnt" label="分类2数量" width="150" />
      <el-table-column prop="test_cnt" label="测试用例数量" width="150" />
      <el-table-column prop="tested_cnt" label="已经测试数量" width="150" />
      <el-table-column prop="ng" label="未处理NG数量" width="150" />
      <el-table-column prop="canceled_cnt" label="取消数量" width="150" />
    </el-table>
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
      qaheadId: ''
    }
  },
  computed: {
    ...mapGetters(['qa_pcl_class1_list'])
  },
  created: async function() {
    this.qaheadId = this.$route.query.qahf_id;
    await store.dispatch('qa/refreshPclQaClass1', this.qaheadId)
  },

  methods: {
    openClass2(class1) {
      this.$router.push({
        name: 'ProjectPclQaClass2',
        query: {
          qahf_id: this.qaheadId,
          class1: class1
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.div-container {
  padding: 8px 32px 8px 32px;
  background-color: rgb(240, 242, 245);
  position: relative;
}

.row-top{
  margin-top: 10px;
}
</style>
