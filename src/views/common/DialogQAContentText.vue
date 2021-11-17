<template>
  <el-dialog
    title="贴图"
    :visible.sync="dialogFormVisible"
    :close-on-click-modal="false"
    width="70%"
  >
    <div class="div-container">
      <h3>{{ qadf.fsortrule }}. {{ qadf.fcontent }}</h3>
      <Myeditor
        v-show="isshow"
        :editordata="content_text"
        :isdisable="isdisable"
        @handleContentText="submitContentText"
        @receivedata="receivedata"
      />
      <MyReadOnlyeditor :proofs="proofs" />
    </div>
  </el-dialog>
</template>

<script>
import store from '@/store';
import Myeditor from './Myeditor';
import MyReadOnlyeditor from './MyReadOnlyeditor';
import {
  getQaDetailContentText,
  updateQaDetailContentText,
  getQadetailProofContentText,
  approvalQaDetailContentText,
  judgeTestType
} from '@/api/qa';
export default {
  name: 'QaContentText',
  components: {
    Myeditor,
    MyReadOnlyeditor
  },
  data() {
    return {
      dialogFormVisible: false,
      operate_type: '',
      isshow: true,
      isdisable: false,
      content_text: '',
      qadf: {},
      proofs: [],
      qadf_id: 0
    };
  },
  methods: {
    async handleDialog(id, type) {
      this.dialogFormVisible = !this.dialogFormVisible;
      // var id = this.qadf_id;
      // operate_type为操作类型，是测试、还是审核
      this.operate_type = type;
      var resp = await getQaDetailContentText(id);
      this.qadf = resp.data;

      if (resp.data.status === '4') {
        this.isshow = false;
      }

      if (resp.data.status === '3' || resp.data.status === '4') {
        this.isdisable = true;
      } else {
        this.isdisable = false;
      }

      this.content_text = this.qadf.fcontent_text;

      await this.getQadetailProofContentText(id);

      if (this.proofs.length > 0) {
        // first_content_type 是测试贴图列表中第一条数据的类型
        var first_content_type = this.proofs[0].type;

        if (this.operate_type === 'test') {
          this.isshow = true;
          if (first_content_type === 'A') {
            this.content_text = '';
          } else if (first_content_type === 'T') {
            this.content_text = this.proofs[0].fcontent_text;
            this.proofs = this.proofs.slice(1);
          }
        } else if (this.operate_type === 'approval') {
          this.isdisable = false;
          if (first_content_type === 'A') {
            this.content_text = this.proofs[0].fcontent_text;
            this.proofs = this.proofs.slice(1);
          } else if (first_content_type === 'T') {
            this.content_text = '';
          }
        } else if (this.operate_type === 'display') {
          this.isshow = false;
          this.isdisable = false;
        }
      } else {
        if (this.operate_type === 'approval') {
          this.isdisable = false;
        }
      }
    },

    receivedata(e) {
      this.content_text = e;
    },
    async submitContentText(val) {
      this.qadf.fcontent_text = val;
      var resp;
      if (this.operate_type === 'test' || this.operate_type === 'display') {
        resp = await updateQaDetailContentText(this.qadf.id, this.qadf);
      } else if (this.operate_type === 'approval') {
        resp = await approvalQaDetailContentText(this.qadf.id, this.qadf);
      }

      if (resp.result === 'OK') {
        this.$message.success('测试贴图提交成功');
        var qahf_id = this.$route.query.qahf_id;
        if (this.operate_type === 'approval') {
          await store.dispatch('workbench/getMyConfirmDetail', qahf_id)
        } else if (this.operate_type === 'test') {
          var resp_type = await judgeTestType(this.qadf.id);
          if (resp_type.result === 'OK') {
            qahf_id = resp_type.data.id;
            var testType = resp_type.data.type;
            if (testType === 'MCL') {
              await store.dispatch(
                'qa/refreshQaDetailByQaHeadViaPagination',
                qahf_id
              );
            } else {
              var class1 = resp_type.data.class1;
              var class2 = resp_type.data.class2;
              var args = { id: qahf_id, class1: class1, class2: class2 };
              await store.dispatch('qa/refreshPclListViaClass', args);
            }
          }
        }
        this.dialogFormVisible = !this.dialogFormVisible;
      }
    },

    async getQadetailProofContentText(id) {
      var resp = await getQadetailProofContentText(id);
      if (resp.result === 'OK') {
        this.proofs = resp.data;
      }
    }
  }
};
</script>

<style scoped>
.div-container {
  padding: 4px 32px 4px 32px;
  position: relative;
}
</style>
