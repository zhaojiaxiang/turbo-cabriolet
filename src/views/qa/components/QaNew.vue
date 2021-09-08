<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" style="margin-top: 20px">
      <el-row :gutter="40">
        <el-col :xs="24" :sm="24" :lg="8">
          <el-form-item>
            <el-input v-model="form.fsystemcd" disabled />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="8">
          <el-form-item>
            <el-input v-model="form.fprojectcd" disabled />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="8">
          <el-form-item>
            <el-input v-model="liaison.fsirno" disabled />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :xs="24" :sm="24" :lg="8">
          <el-form-item>
            <el-input v-model="form.fslipno" disabled />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="8">
          <el-form-item prop="fobjectid" required>
            <el-autocomplete
              v-model="form.fobjectid"
              :fetch-suggestions="querySearchAsync"
              placeholder="请输入或者测试对象名称"
              style="width:100%"
            />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="8">
          <el-form-item>
            <el-button
              type="primary"
              :disabled="liaison.fstatus !== '2'"
              @click="onSubmit('form')"
            >立即创建
            </el-button>
            <el-button
              type="text"
              @click="addDesignReview(form.fslipno)"
            >设计Review
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <QaDesignReview ref="QaDesignReview" :isdisable="isdisable" />
  </div>
</template>

<script>
import QaDesignReview from '@/views/qa/components/QaDesignReview';
import store from '@/store';
export default {
  components: {
    QaDesignReview
  },
  data() {
    return {
      isdisable: false,
      liaison: {},
      form: {
        fsystemcd: '',
        fprojectcd: '',
        fslipno: '',
        fobjectid: '',
        fstatus: '1',
        ftesttyp: 'MCL'
      },
      rules: {
        fobjectid: [
          {
            required: true,
            message: '请输入或选择测试对象名称',
            trigger: 'blur'
          }
        ]
      }
    };
  },
  created: async function() {
    var slip_no = this.$route.query.slip_no;
    var resp = await store.dispatch(
      'workbench/getSingleLiaisonBySlipNo',
      slip_no
    );
    if (resp.result === 'OK') {
      this.liaison = resp.data[0];
      this.form.fslipno = this.liaison.fslipno;
      this.form.fsystemcd = this.liaison.fsystemcd;
      this.form.fprojectcd = this.liaison.fprojectcd;
      if (this.liaison.fstatus === '4') {
        this.isdisable = true;
      } else {
        this.isdisable = false;
      }
    }
  },
  methods: {
    addDesignReview(slipno) {
      this.$refs.QaDesignReview.handleDialog(slipno);
    },
    onSubmit(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          var resp = await store.dispatch('qa/newQaHead', this.form);
          if (resp.result === 'OK') {
            await store.dispatch('qa/getQaListBySlipNo', this.liaison.fslipno);
            this.$message({
              message: '测试对象' + this.form.fobjectid + '创建成功！',
              type: 'success'
            });
            this.$refs[formName].resetFields();
          }
        }
      });
    },
    async querySearchAsync(queryString, cb) {
      var resp = await store.dispatch('qa/getQaSlipNoCheckOutObject', this.form.fslipno)

      if (resp.result === 'OK') {
        var results = resp.data
      }
      cb(results);
    }
  }
};
</script>

<style></style>
