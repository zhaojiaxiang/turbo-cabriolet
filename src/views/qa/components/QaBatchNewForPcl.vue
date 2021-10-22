<template>
  <el-dialog
    title="批量添加PCL测试用例"
    :visible.sync="dialogFormVisible"
    :close-on-click-modal="false"
  >
    <el-form>
      <el-form-item>
        <el-input
          disabled
          autofocus="true"
          placeholder="Ctrl+V实现测试Case粘贴并自动批量添加"
        />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button
        id="submitbtn"
        v-loading.fullscreen.lock="fullscreenLoading"
        type="primary"
        @click="onBatchSubmit"
      >确 定</el-button>
      <el-button @click="dialogFormVisible = false">取 消</el-button>
    </div>
    <el-descriptions title="结合测试批量上传格式(Excel中复制)" direction="vertical" :column="4" border>
      <el-descriptions-item label="分类1(必输项)">MO</el-descriptions-item>
      <el-descriptions-item label="分类2(必输项)">新建</el-descriptions-item>
      <el-descriptions-item label="测试用例(必输项)">这是一个测试用例</el-descriptions-item>
      <el-descriptions-item label="排序规则">001(字符串即可)</el-descriptions-item>
    </el-descriptions>
  </el-dialog>
</template>

<script>
import store from '@/store';
export default {
  data() {
    return {
      dialogFormVisible: false,
      qaheadid: 0,
      qadetails: [],
      fullscreenLoading: false
    };
  },
  mounted() {
    this.$el.addEventListener('paste', event => {
      event.stopPropagation();
      event.preventDefault(); // 消除默认粘贴

      this.qadetails = [];

      var clipboardData = event.clipboardData || window.clipboardData;
      var pastedData = clipboardData.getData('Text');

      this.qadetails = pastedData
        .split('\n')
        .filter(function(item) {
          // 兼容Excel行末\n，防止出现多余空行
          return item !== '';
        })
        .map(function(item) {
          return item.split('\t');
        });

      document.getElementById('submitbtn').click();
    });
  },
  methods: {
    handleDialog(id) {
      this.dialogFormVisible = !this.dialogFormVisible;
      this.qaheadid = id;
    },

    async onBatchSubmit() {
      this.fullscreenLoading = true;
      var batch_data = [];

      for (var i in this.qadetails) {
        if (this.qadetails[i].length < 3) {
          this.$message.error(
            '粘贴文本格式错误: 分类1，分类2，测试用例，排序规则(非必须)'
          );
          this.fullscreenLoading = false;
          this.qadetails = [];
          return;
        }
        if (this.qadetails[i].length === 3) {
          this.qadetails[i][3] = '';
        }

        if (this.qadetails[i][0].length > 60) {
          this.$message.error('分类1长度不可大于60');
          return;
        }

        if (this.qadetails[i][1].length > 60) {
          this.$message.error('分类2长度不可大于60');
          return;
        }

        var form = {};
        form['fregression'] = 'N';
        form['fclass1'] = this.qadetails[i][0];
        form['fclass2'] = this.qadetails[i][1];
        form['fcontent'] = this.qadetails[i][2];
        form['fsortrule'] = this.qadetails[i][3];
        form['qahf'] = this.qaheadid;
        batch_data.push(form);
      }

      var batch_json = { data: batch_data };

      var args = { id: this.qaheadid, data: batch_json };

      var resp = await store.dispatch('qa/batchNewQaDetail', args);

      if (resp.result === 'OK') {
        if (this.$route.name === 'TaskPclTestList') {
          var class1 = this.$route.query.class1;
          var class2 = this.$route.query.class2;
          var args2 = {
            id: this.$route.query.qahf_id,
            class1: class1,
            class2: class2
          };
          await store.dispatch('qa/refreshPclListViaClass', args2);
        } else {
          await store.dispatch(
            'qa/refreshPclQaClass1',
            this.$route.query.qahf_id
          );
        }
        this.dialogFormVisible = false;
        this.fullscreenLoading = false;
        this.qadetails = [];
      }
    }
  }
};
</script>

<style scoped>
.width-sytle {
  width: 90%;
}
</style>
