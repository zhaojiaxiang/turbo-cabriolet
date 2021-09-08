<template>
  <el-dialog title="手动添加结合测试" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
    <el-form ref="form" :rules="rules" :model="form">
      <el-form-item>
        <el-col :span="12">
          <el-form-item prop="fslipno">
            <el-input
              v-model="form.fslipno"
              :disabled="true"
              class="width-sytle"
              placeholder="订单号"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="fobjectid" required>
            <el-input
              v-model="form.fobjectid"
              class="width-sytle"
              placeholder="测试对象"
            />
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item required>
        <el-col :span="12">
          <el-form-item prop="fsystemcd" size="medium">
            <el-select v-model="form.fsystemcd" :disabled="true" placeholder="请选择系统名称">
              <el-option
                v-for="(item, i) in systems"
                :key="i"
                :label="item.fsystemnm"
                :value="item.fsystemcd"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="fprojectcd">
            <el-select v-model="form.fprojectcd" :disabled="true" placeholder="请选择项目名称">
              <el-option
                v-for="(item, i) in projects"
                :key="i"
                :label="projects.fprojectsn"
                :value="item.fprojectcd"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="onSubmit('form')">确 定</el-button>
      <el-button @click="dialogFormVisible = false">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import store from '@/store';
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      dialogFormVisible: false,
      isFirstPCL: false,
      form: {
        fsystemcd: '',
        fprojectcd: '',
        ftesttyp: 'PCL',
        fslipno: '',
        fobjectid: '',
        fstatus: '1'
      },
      rules: {
        fobjectid: [
          { required: true, message: '请输入测试对象', trigger: 'change' }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(['systems', 'projects'])
  },
  methods: {
    async handleDialog(id) {
      this.dialogFormVisible = !this.dialogFormVisible;

      if (id) {
        var resp = await store.dispatch('qa/getQaHead', id)
        if (resp.result === 'OK') {
          this.form.fsystemcd = resp.data.fsystemcd;
          this.form.fprojectcd = resp.data.fprojectcd;
          this.form.fobjectid = '';
          this.form.fslipno = resp.data.fslipno;
        }
      }
    },

    async onSubmit(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          var resp = await store.dispatch('qa/newQaHead', this.form)
          if (resp.result === 'OK') {
            this.dialogFormVisible = false;
            await store.dispatch('projects/getProjectPclList', this.form.fslipno)
            this.$message({
              message: '创建成功！',
              type: 'success'
            });
          }
        }
      });
    }
  }
};
</script>

<style scoped>
.width-sytle {
  width: 90%;
}
</style>
