<template>
  <div>
    <el-drawer
      class="drawer-height"
      :visible.sync="drawer"
      :with-header="false"
      size="55%"
    >
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="14%"
        size="medium"
        style="width: 95%; margin-top:10px"
      >
        <el-form-item label="" size="medium">
          <el-col :span="8">
            <el-switch
              v-model="switch_value"
              inactive-text="Normal"
              active-text="Sir No"
            />
          </el-col>
          <el-col :span="7">
            <el-input
              v-show="is_sirno"
              v-model="sync_sirno"
              placeholder="请输入Sir No"
            >
              <el-button slot="suffix" style="padding-right:10px" type="text" @click="syncSirNo">同步</el-button>
            </el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="系统名称" size="medium" required>
          <el-col :span="10">
            <el-form-item prop="fsystemcd" size="medium">
              <el-select
                v-model="form.fsystemcd"
                :disabled="isCanModify"
                placeholder="请选择系统名称"
              >
                <el-option
                  v-for="(item, i) in systems"
                  :key="i"
                  :label="item.fsystemnm"
                  :value="item.fsystemcd"
                />
              </el-select>
              <el-button icon="el-icon-edit-outline" circle @click="systemCodeMaster" />
            </el-form-item>
          </el-col>
          <el-col :span="14">
            <el-form-item
              label="项目名称"
              label-width="80px"
              prop="fprojectcd"
              size="medium"
            >
              <el-select
                v-model="form.fprojectcd"
                :disabled="isCanModify"
                placeholder="请选择项目名称"
              >
                <el-option
                  v-for="(item, i) in projects"
                  :key="i"
                  :label="projects.fprojectsn"
                  :value="item.fprojectcd"
                />
              </el-select>
              <el-button icon="el-icon-edit-outline" circle @click="projectCodeMaster" />
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item label="开发类型" size="medium" required>
          <el-col :span="10">
            <el-form-item prop="ftype" size="medium">
              <el-select
                v-model="form.ftype"
                :disabled="isCanModify"
                placeholder="请选择开发类型"
              >
                <el-option label="追加开发" value="追加开发" />
                <el-option label="改善需求" value="改善需求" />
                <el-option
                  label="维护阶段障碍"
                  value="维护阶段障碍"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="14">
            <el-form-item
              label="对应者"
              label-width="80px"
              prop="fassignedto"
              size="medium"
            >
              <el-select
                v-model="form.fassignedto"
                :disabled="isCanModify"
                placeholder="请选择对应者"
              >
                <el-option
                  v-for="(item, i) in group_users"
                  :key="i"
                  :v-label="item.name"
                  :value="item.name"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item label="联络票号" size="medium" required>
          <el-col :span="10">
            <el-form-item prop="fslipno" size="medium">
              <el-input
                v-model="form.fslipno"
                placeholder="请输入联络票号"
              />
            </el-form-item>
          </el-col>

          <el-col :span="14">
            <el-form-item
              label="订单号"
              label-width="80px"
              prop="fodrno"
              size="medium"
            >
              <el-input
                v-model="form.fodrno"
                :disabled="isCanModify"
                placeholder="请输入订单号"
              />
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item label="负责人" prop="fleader" size="medium" required>
          <el-col :span="10">
            <el-form-item size="medium">
              <el-select
                v-model="form.fleader"
                multiple
                placeholder="请选择项目负责人"
              >
                <el-option-group
                  v-for="group in all_group_users"
                  :key="group.label"
                  :label="group.label"
                >
                  <el-option
                    v-for="item in group.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-option-group>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="14">
            <el-form-item label="协助者" label-width="80px" size="medium">
              <el-select
                v-model="form.fhelper"
                multiple
                placeholder="请选择项目协助者"
              >
                <el-option-group
                  v-for="group in all_group_users"
                  :key="group.label"
                  :label="group.label"
                >
                  <el-option
                    v-for="item in group.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-option-group>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="开发概要" prop="fbrief" size="medium">
          <el-input
            v-model="form.fbrief"
            type="textarea"
            :disabled="isCanModify"
          />
        </el-form-item>
        <el-form-item label="问题描述" prop="fcontent" size="medium">
          <el-input
            v-model="form.fcontent"
            type="textarea"
            :disabled="isCanModify"
          />
        </el-form-item>
        <el-form-item label="计划开始" required>
          <el-col :span="6">
            <el-form-item prop="fplnstart">
              <el-date-picker
                v-model="form.fplnstart"
                :disabled="isCanModify"
                type="date"
                size="medium"
                value-format="yyyy-MM-dd"
                placeholder="计划开始日期"
                style="width:95%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item prop="fplnend" label-width="120px" label="计划结束">
              <el-date-picker
                v-model="form.fplnend"
                type="date"
                size="medium"
                placeholder="计划结束日期"
                value-format="yyyy-MM-dd"
                style="width:100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              prop="fplnmanpower"
              label="计划工时"
              label-width="120px"
              size="medium"
            >
              <el-input
                v-model="form.fplnmanpower"
                type="number"
                placeholder="计划工时"
              />
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button
            v-loading.fullscreen.lock="loading"
            type="primary"
            @click="onSubmit('form')"
          >立即创建</el-button>
          <el-button @click="resetForm('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
    <SystemMaster ref="systemMaster" />
    <ProjectMaster ref="projectMaster" />
  </div>
</template>

<script>
import store from '@/store';
import { mapGetters } from 'vuex';
import { formatDate } from '@/utils/common';
import SystemMaster from '@/views/master/SystemMaster';
import ProjectMaster from '@/views/master/ProjectMaster';
export default {
  components: {
    SystemMaster,
    ProjectMaster
  },
  data() {
    return {
      isCanModify: false,
      sync_sirno: '',
      switch_value: false,
      is_sirno: false,
      loading: false,
      drawer: false,
      form: {
        fsystemcd: '',
        fprojectcd: '',
        fslipno: '',
        ftype: '',
        fodrno: '',
        fassignedto: '',
        fhelper: '',
        fleader: '',
        fbrief: '',
        fcontent: '',
        fplnstart: '',
        fplnend: '',
        fcreateusr: '',
        fcreatedte: '',
        factstart: null,
        factend: null,
        freleasedt: null,
        fplnmanpower: null,
        factmanpower: null,
        freleaserpt: null,
        fsirno: ''
      },
      rules: {
        fsystemcd: [
          { required: true, message: '请输入系统名称', trigger: 'change' }
        ],
        fprojectcd: [
          { required: true, message: '请选择项目名称', trigger: 'change' }
        ],
        fassignedto: [
          { required: true, message: '请选择对应者', trigger: 'change' }
        ],
        fleader: [
          { required: true, message: '请选择负责人', trigger: 'change' }
        ],
        fplnstart: [
          {
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }
        ],
        fplnend: [
          {
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }
        ],
        ftype: [
          {
            required: true,
            message: '请至少选择一个开发类型',
            trigger: 'change'
          }
        ],
        fodrno: [{ required: true, message: '请输入订单', trigger: 'change' }],
        fslipno: [
          { required: true, message: '请输入联络票号', trigger: 'change' }
        ],
        fbrief: [
          { required: true, message: '请输入开发概要', trigger: 'change' }
        ],
        fcontent: [
          { required: true, message: '请输入问题描述', trigger: 'change' }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(['systems', 'projects', 'group_users', 'all_group_users'])
  },
  watch: {
    switch_value(newval) {
      // 监控界面开关
      this.sync_sirno = '';
      if (newval) {
        this.is_sirno = true;
      } else {
        this.is_sirno = false;
      }
    },
    form: {
      handler(val) {
        if (val.fplnend) {
          if (val.fplnstart > val.fplnend) {
            this.form.fplnstart = val.fplnend;
          }
        }
      },
      deep: true
    }
  },
  mounted: function() {
    var this_ = this;
    this_.loading = true;
    this.bus.$on('openSlipNoNew', async function() {
      this_.drawer = true;
    });
    this_.loading = false;
  },
  methods: {
    onSubmit(formName) {
      this.loading = true;
      this.$refs[formName].validate(async valid => {
        if (valid) {
          if (this.form.fleader.length === 0) {
            this.form.fleader = '';
          } else {
            this.form.fleader = this.form.fleader.join(',');
          }

          if (this.form.fhelper.length === 0) {
            this.form.fhelper = '';
          } else {
            this.form.fhelper = this.form.fhelper.join(',');
          }

          var resp = await store.dispatch('workbench/newLiaison', this.form)

          if (resp.result === 'OK') {
            this.$message({
              message: this.form.fslipno + '创建成功！',
              type: 'success'
            });
            this.resetForm(formName);
            this.drawer = false;
          } else {
            this.form.fleader = this.form.fleader.split(',');
            this.form.fhelper = this.form.fhelper.split(',');
          }
        }
      });
      this.loading = false;
    },
    resetForm(formName) {
      this.form.fhelper = [];
      this.form.fleader = [];
      this.$refs[formName].resetFields();
    },

    projectCodeMaster() {
      this.$refs.projectMaster.handleDialog()
    },

    systemCodeMaster() {
      this.$refs.systemMaster.handleDialog()
    },

    async syncSirNo() {
      var resp = await store.dispatch('workbench/syncLiaisonBySirNo', this.sync_sirno)

      if (resp.result === 'OK') {
        var sir_json = resp.data;

        this.form.ftype = sir_json.ftype;
        this.form.fcreateusr = sir_json.fcreateusr;
        this.form.fcreatedte = formatDate(sir_json.fcreatedte);
        this.form.fplnstart = formatDate(sir_json.fplnstart);
        this.form.fassignedto = sir_json.fassignedto;
        this.form.fsystemcd = sir_json.fsystemcd;
        this.form.fprojectcd = sir_json.fprojectcd;
        this.form.fodrno = sir_json.fodrno;
        this.form.fbrief = sir_json.fbrief;
        this.form.fcontent = sir_json.fcontent;
        this.form.fsirno = sir_json.fsirno;

        this.isCanModify = true;
      }
    }
  }
};
</script>

<style scoped>
.drawer-height {
  height: calc(100vh);
  overflow: visible;
}
</style>
