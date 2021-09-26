<template>
  <div>
    <el-dialog title="填写代码Review" :visible.sync="dialogFormVisible">
      <el-form ref="form">
        <el-form-item>
          <Myeditor
            :editordata="contentText"
            :isdisable="isdisable"
            @handleContentText="updateQaCodeReview"
            @receivedata="receivedata"
          />
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  getCodeReview,
  newCodeReview,
  updateCodeReview
} from '@/api/qa';
import Myeditor from '@/views/common/Myeditor.vue';
import store from '@/store';
export default {
  components: {
    Myeditor
  },
  props: {
    isdisable: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      contentText: '',
      slipno: '',
      objectid: '',
      query_objectid: '',
      id: 0
    };
  },
  methods: {
    receivedata(e) {
      this.content_text = e;
    },

    async handleDialog(slipno, objectid, id) {
      var resp_head = await store.dispatch('qa/getQaHead', id)

      if (resp_head.result === 'OK') {
        if (resp_head.data.fstatus === '4') {
          this.isdisable = true
        } else {
          this.isdisable = false
        }
      }
      this.contentText = '';
      this.slipno = slipno;
      this.objectid = objectid;
      this.query_objectid = objectid.replace(/ /g, '+');
      this.dialogFormVisible = !this.dialogFormVisible;
      var resp = await getCodeReview(slipno, this.query_objectid)
      if (resp.data.length !== 0) {
        this.contentText = resp.data[0].fcontent_text;
        this.id = resp.data[0].id;
      }
    },
    async updateQaCodeReview(val) {
      var form = {
        fslipno: this.slipno,
        fobjectid: this.objectid,
        fcontent_text: val
      };

      var resp = await getCodeReview(this.slipno, this.query_objectid)

      var resp_up;
      if (resp.data.length !== 0) {
        resp_up = await updateCodeReview(resp.data[0].id, form)
      } else {
        resp_up = await newCodeReview(form)
      }

      if (resp_up.result === 'OK') {
        this.$message.success('操作成功');
        this.dialogFormVisible = false;
      }
    }
  }
};
</script>

<style></style>
