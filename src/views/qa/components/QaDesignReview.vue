<template>
  <div>
    <el-dialog title="填写设计Review" :visible.sync="dialogFormVisible">
      <el-form ref="form">
        <el-form-item>
          <Myeditor
            :editor-data="contentText"
            :isdisable="isdisable"
            @handleContentText="updateQaDesignReview"
          />
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  getDesignReview,
  newDesignReview,
  updateDesignReview
} from '@/api/qa';
import Myeditor from '@/views/common/Myeditor.vue';
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
      id: 0
    };
  },
  methods: {
    async handleDialog(slipno) {
      var objectid = 'Design+Review';
      this.slipno = slipno;
      this.dialogFormVisible = !this.dialogFormVisible;
      var resp = await getDesignReview(slipno, objectid)
      if (resp.data.length !== 0) {
        this.contentText = resp.data[0].fcontent_text;
        this.id = resp.data[0].id;
      }
    },
    async updateQaDesignReview(val) {
      var objectid = 'Design+Review';
      var form = {
        fslipno: this.slipno,
        fobjectid: 'Design Review',
        fcontent_text: val
      };

      var resp = await getDesignReview(this.slipno, objectid)

      var resp_up;
      if (resp.data.length !== 0) {
        resp_up = await updateDesignReview(resp.data[0].id, form)
      } else {
        resp_up = await newDesignReview(form)
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
