<template>
  <el-dialog title="逐条添加PCL测试用例" :visible.sync="dialogFormVisible">
    <el-form ref="form" :rules="rules" :model="form">
      <el-form-item>
        <el-col :span="9">
          <el-form-item prop="fclass1" required>
            <el-input
              v-model="form.fclass1"
              class="width-sytle"
              maxlength="60"
              placeholder="分类1"
            />
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item prop="fclass2" required>
            <el-input
              v-model="form.fclass2"
              class="width-sytle"
              placeholder="分类2"
              maxlength="60"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="fsortrule">
            <el-input
              v-model="form.fsortrule"
              class="width-sytle"
              placeholder="排序规则(非必输)"
            />
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item prop="fcontent" required>
        <el-input
          v-model="form.fcontent"
          type="textarea"
          :rows="3"
          placeholder="测试用例"
        />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="onSubmit('form')">确 定</el-button>
      <el-button @click="resetForm('form')">重 置</el-button>
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
      class1: '',
      class2: '',
      form: {
        fclass1: '',
        fclass2: '',
        fregression: 'N',
        fcontent: '',
        fsortrule: '',
        qahf: ''
      },
      rules: {
        fcontent: [
          { required: true, message: '请输入测试用例', trigger: 'blur' }
        ],
        fregression: [{ required: false }],
        fclass1: [{ required: true, message: '请输入分类1', trigger: 'blur' }],
        fclass2: [{ required: true, message: '请输入分类2', trigger: 'blur' }],
        fsortrule: [{ required: false }]
      }
    };
  },
  methods: {
    handleDialog(id) {
      this.dialogFormVisible = !this.dialogFormVisible;
      this.form.qahf = id;
      if (this.$route.name === 'TaskPclTestList') {
        this.class1 = this.$route.query.class1;
        this.class2 = this.$route.query.class2;
        this.form.fclass1 = this.class1;
        this.form.fclass2 = this.class2;
      }
    },
    async onSubmit(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          var resp = await store.dispatch('qa/newQaDetail', this.form);

          if (resp.result === 'OK') {
            if (this.$route.name === 'TaskPclTestList') {
              var args = { id: this.form.qahf, class1: this.class1, class2: this.class2 };
              await store.dispatch('qa/refreshPclListViaClass', args);
            } else {
              await store.dispatch('qa/refreshPclQaClass1', this.form.qahf);
            }
            this.dialogFormVisible = false;
            this.resetForm('form');
            this.$message({
              message: this.form.fcontent + '创建成功！',
              type: 'success'
            });
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
