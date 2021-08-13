<template>
  <el-dialog title="测试对象修改概要" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
    <el-form ref="form" :rules="rules" :model="form">
      <el-form-item prop="fobjmodification" required>
        <el-input
          v-model="form.fobjmodification"
          type="textarea"
          :rows="10"
          placeholder="请输入修改概要"
        />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button
        v-show="!isdisable"
        type="primary"
        @click="onSubmit('form')"
      >确 定</el-button>
      <el-button
        v-show="!isdisable"
        @click="resetForm('form')"
      >重 置</el-button>
      <el-button @click="dialogFormVisible = false">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import store from '@/store';
export default {
  data() {
    return {
      dialogFormVisible: false,
      isdisable: false,
      form: {
        id: '',
        fobjmodification: ''
      },
      rules: {
        fobjmodification: [
          { required: true, message: '请输入修改概要', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    async handleDialog(id) {
      this.dialogFormVisible = !this.dialogFormVisible;
      var resp = await store.dispatch('qa/getQaHead', id)

      if (resp.result === 'OK') {
        this.form = resp.data;
        if (this.form.fstatus === '1' || this.form.fstatus === '2') {
          this.isdisable = false
        } else {
          this.isdisable = true
        }
      }
    },
    async onSubmit(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          var data = { 'id': this.form.id, 'data': this.form }
          var resp = await store.dispatch('qa/updateQaHeadSummary', data)

          if (resp.result === 'OK') {
            this.dialogFormVisible = false;
            this.resetForm('form');
            this.$message({
              message: this.form.fobjectid + '修改概要更新成功！',
              type: 'success'
            });
          } else {
            this.$message.error(resp.data.message);
          }
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
.width-sytle {
  width: 90%;
}
</style>
