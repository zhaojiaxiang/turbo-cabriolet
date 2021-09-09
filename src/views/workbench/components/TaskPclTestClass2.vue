<template>
  <div class="goTop div-container">

    <el-row class="row-top">
      <el-col :span="24">
        <div style="text-align:left; " class="vertical">
          <h4 style="margin:0 auto;">分类1：{{ class1 }}</h4>
        </div>
      </el-col>
    </el-row>

    <el-row class="row-top">
      <el-col :span="24">
        <div>
          <QaPclTargetActual />
        </div>
      </el-col>
    </el-row>

    <el-row class="row-top" />
    <el-table
      :data="qa_pcl_class2_list"
      tooltip-effect="dark"
      border
      size="medium"
    >
      <el-table-column label="序号" type="index" width="50" />
      <el-table-column
        prop="fclass2"
        sortable
        label="分类2"
        width="400"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <el-link
            type="primary"
            :underline="false"
            @click="openDetail(scope.row.fclass2)"
          >{{ scope.row.fclass2 }}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="test_cnt" label="测试用例数量" width="150" />
      <el-table-column prop="tested_cnt" label="已经测试数量" width="150" />
      <el-table-column prop="ng" label="未处理NG数量" width="150" />
      <el-table-column prop="canceled_cnt" label="取消数量" width="150" />
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
      class1: '',
      id: ''
    };
  },
  computed: {
    ...mapGetters(['qa_pcl_class2_list'])
  },
  created: async function() {
    this.id = this.$route.query.qahf_id;
    this.class1 = this.$route.query.class1;

    var args = { 'id': this.id, 'class1': this.class1 }

    await store.dispatch('qa/refreshPclQaClass2', args)
  },

  methods: {
    filterResult(value, row) {
      return row.fresult === value;
    },
    openDetail(class2) {
      this.$router.push({
        name: 'TaskPclTestList',
        query: {
          qahf_id: this.id,
          class1: this.class1,
          class2: class2
        }
      });
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
.vertical {
  display: table-cell;
  color: #606266;
  height: 36px;
  vertical-align: middle;
}
.goTop {
  height: calc(100vh - 70px);
  overflow-x: hidden;
}
.row-top{
  margin-top: 10px;
}
</style>
