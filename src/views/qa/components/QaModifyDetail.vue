<template>
  <el-dialog
    title="测试对象修改明细"
    lock-scroll
    :visible.sync="dialogFormVisible"
    :close-on-click-modal="false"
  >
    <el-form ref="form" label-width="20%" :rules="rules" :model="form">
      <el-form-item prop="fttlcodelines" label="影响总行数:" required>
        <el-input
          v-model="form.fttlcodelines"
          placeholder="影响总行数"
          type="number"
          min="0"
        />
      </el-form-item>
      <el-form-item prop="fmodifiedlines" label="修改行数:" required>
        <el-input
          v-model="form.fmodifiedlines"
          placeholder="修改行数"
          type="number"
          min="0"
        />
      </el-form-item>
      <el-form-item prop="fcomplexity" label="复杂度:" required>
        <el-radio-group v-model="form.fcomplexity">
          <el-radio-button label="0.8" />
          <el-radio-button label="1.0" />
          <el-radio-button label="1.2" />
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="ftargettest" label="目标测试数(不含回归):">
        <el-input
          v-model="form.ftargettest"
          placeholder="目标测试数"
          type="number"
          min="0"
        />
      </el-form-item>
      <el-form-item prop="ftargetregtest" label="目标回归测试数:">
        <el-input
          v-model="form.ftargetregtest"
          placeholder="目标回归测试数"
          type="number"
          min="0"
        />
      </el-form-item>
      <el-form-item prop="ftargetng" label="目标测试NG数:">
        <el-input
          v-model="form.ftargetng"
          placeholder="目标测试NG数"
          type="number"
          min="0"
        />
      </el-form-item>
      <el-form-item prop="fselflevel" label="自我评价难易等级:">
        <el-select v-model="form.fselflevel" placeholder="请选择难易等级">
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
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button
        v-show="qahead_status === '1' || qahead_status === '2'"
        type="primary"
        @click="onSubmit('form')"
      >确 定</el-button>
      <el-button @click="resetForm('form')">重 置</el-button>
      <el-button @click="dialogFormVisible = false">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {
  updateQaHeadModifyDetail,
  getQaHeadModifyDetail
} from '@/api/qa';
import store from '@/store';
export default {
  data() {
    return {
      dialogFormVisible: false,
      testplan: [],
      qahead_status: '',
      form: {
        id: '',
        fttlcodelines: '',
        fmodifiedlines: '',
        fcomplexity: '',
        fselflevel: '',
        ftargettest: '',
        ftargetregtest: '',
        ftargetng: ''
      },
      rules: {
        fttlcodelines: [
          { required: true, message: '请输入影响总行数', trigger: 'blur' }
        ],
        fmodifiedlines: [
          { required: true, message: '请输入修改行数', trigger: 'blur' }
        ],
        fcomplexity: [
          { required: true, message: '请选择复杂度', trigger: 'blur' }
        ],
        fselflevel: [
          {
            required: true,
            message: '请选择自我评价难易等级',
            trigger: 'blur'
          }
        ]
      }
    };
  },
  watch: {
    form: {
      async handler(val) {
        if (val.fttlcodelines < 0) {
          val.fttlcodelines = 0;
        }
        if (val.fmodifiedlines < 0) {
          val.fmodifiedlines = 0;
        }
      },
      deep: true
    }
  },
  methods: {
    async handleDialog(id) {
      this.testplan = [];
      this.dialogFormVisible = !this.dialogFormVisible;
      var resp = await getQaHeadModifyDetail(id)
      this.form = resp.data;
      this.qahead_status = resp.data.fstatus;
    },
    async onSubmit(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          var resp = await updateQaHeadModifyDetail(
            this.form.id,
            this.form
          )
          if (resp.result === 'OK') {
            this.dialogFormVisible = false;
            this.resetForm('form');
            await store.dispatch('qa/refreshMclTargetActual', this.form.id)
            this.$message({
              message: '修改成功！',
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

<style>
.width-sytle {
  width: 90%;
}
.el-dialog__body {
  padding-top: 0;
  padding-bottom: 0;
}

.table-cell-danger {
  background: #f5c6cb;
}
.table-cell-warning {
  background: #ffeeba;
}
</style>
