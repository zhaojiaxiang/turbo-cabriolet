<template>
  <el-dialog title="测试结果确认" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
    <el-form ref="form" :rules="rules" :model="form">
      <el-form-item prop="flevel" size="medium">
        <el-select v-model="form.flevel" placeholder="请选择难易等级">
          <el-option label="01" value="01" />
          <el-option label="02" value="02" />
          <el-option label="03" value="03" />
          <el-option label="04" value="04" />
          <el-option label="05" value="05" />
          <el-option label="06" value="06" />
          <el-option label="07" value="07" />
          <el-option label="08" value="08" />
          <el-option label="09" value="09" />
          <el-option label="10" value="10" />
        </el-select>
      </el-form-item>

      <el-form-item prop="freviewcode" size="medium">
        <el-input v-model="form.freviewcode" placeholder="项目评价" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button
        id="submitbtn"
        v-loading.fullscreen.lock="fullscreenLoading"
        plain
        type="primary"
        @click="onSubmit('form')"
      >确 定</el-button>
      <el-button plain @click="dialogFormVisible = false">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import store from '@/store'
import { updateQaHead } from '@/api/qa';
export default {
  data() {
    return {
      dialogFormVisible: false,
      qahead: {},
      fullscreenLoading: false,
      form: {
        freviewcode: '',
        flevel: ''
      },
      rules: {
        freviewcode: [
          { required: true, message: '请输入项目评价', trigger: 'blur' }
        ],
        flevel: [
          { required: true, message: '请选择难易等级', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    async onSubmit(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          this.qahead.flevel = this.form.flevel;
          this.qahead.freviewcode = this.form.freviewcode;
          this.qahead.fstatus = '4';
          var resp = await updateQaHead(this.qahead.id, this.qahead)

          if (resp.result === 'OK') {
            this.$message.success('确认成功');
            this.dialogFormVisible = !this.dialogFormVisible;
          }
        }
      });
    },
    async handleDialog(id) {
      this.dialogFormVisible = !this.dialogFormVisible;
      var resp = await store.dispatch('qa/getQaHead', id)
      this.qahead = resp.data;
      this.form.freviewcode = this.qahead.freviewcode;
      this.form.flevel = this.qahead.flevel;
    }
  }
};
</script>

<style>
</style>
