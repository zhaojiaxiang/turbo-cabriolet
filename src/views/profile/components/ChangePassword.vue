<template>
  <div>
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="100px"
      style="width: 60%"
    >
      <el-form-item
        label="旧密码："
        prop="password"
        :error="errorinfo.password"
      >
        <el-input
          v-model="ruleForm.password"
          type="password"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="密码：" prop="newpassword1">
        <el-input
          v-model="ruleForm.newpassword1"
          type="password"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="确认密码：" prop="newpassword2">
        <el-input
          v-model="ruleForm.newpassword2"
          type="password"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitPasswordForm('ruleForm')">
          确认修改</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import store from '@/store';
export default {
  data() {
    var validateOldPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入旧密码'));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('newpassword2');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.newpassword1) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        password: '',
        newpassword1: '',
        newpassword2: ''
      },
      errorinfo: {
        password: ''
      },
      rules: {
        password: [{ validator: validateOldPass, trigger: 'blur' }],
        newpassword1: [{ validator: validatePass, trigger: 'blur' }],
        newpassword2: [{ validator: validatePass2, trigger: 'blur' }]
      }
    };
  },
  methods: {
    submitPasswordForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          var passwordInfo = {
            password: this.ruleForm.password,
            new_password: this.ruleForm.newpassword1
          };
          var resp = await store.dispatch(
            'user/updateUserPassword',
            passwordInfo
          );

          if (resp.result === 'OK') {
            this.$alert('密码修改成功，请重新登录系统', '', {
              confirmButtonText: '确定',
              callback: async() => {
                await store.dispatch('user/logout');
                this.$router.push(`/login?redirect=${this.$route.fullPath}`)
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style></style>
