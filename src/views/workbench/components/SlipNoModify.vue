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
        v-loading="loading"
        :model="form"
        :rules="rules"
        label-width="8%"
        size="medium"
        style="width: 95%; margin-top: 20px"
      >
        <el-form-item
          v-show="true ? form.fstatus == '1' : form.fstatus != '1'"
          size="medium"
          required
        >
          <el-col :span="8">
            <el-form-item
              prop="fsystemcd"
              label="系统名称"
              label-width="80px"
              class="width-sytle"
              size="medium"
            >
              <el-select
                v-model="form.fsystemcd"
                :disabled="true ? form.fstatus != '1' : form.fstatus == '1'"
                placeholder="请选择系统名称"
              >
                <el-option
                  v-for="(item, i) in systems"
                  :key="i"
                  :label="item.fsystemcd"
                  :value="item.fsystemcd"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              prop="fprojectcd"
              label="项目名称"
              label-width="80px"
              class="width-sytle"
              size="medium"
            >
              <el-select
                v-model="form.fprojectcd"
                :disabled="true ? form.fstatus != '1' : form.fstatus == '1'"
                placeholder="请选择项目名称"
              >
                <el-option
                  v-for="(item, i) in projects"
                  :key="i"
                  :label="projects.fprojectcd"
                  :value="item.fprojectcd"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              prop="ftype"
              label="开发类型"
              label-width="80px"
              size="medium"
            >
              <el-select
                v-model="form.ftype"
                :disabled="true ? form.fstatus != '1' : form.fstatus == '1'"
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
        </el-form-item>

        <el-form-item size="medium" required>
          <el-col :span="8">
            <el-form-item
              prop="fassignedto"
              label="对应者"
              label-width="80px"
              class="width-sytle"
              size="medium"
            >
              <el-select
                v-model="form.fassignedto"
                :disabled="true ? form.fstatus != '1' : form.fstatus == '1'"
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
          <el-col :span="8">
            <el-form-item
              prop="fleader"
              size="medium"
              class="width-sytle"
              label="负责人"
              label-width="80px"
              required
            >
              <el-select
                v-model="form.fleader"
                multiple
                :disabled="true ? form.fstatus != '1' : form.fstatus == '1'"
                placeholder="请选择负责人"
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
          <el-col :span="8">
            <el-form-item label="协助者" label-width="80px" size="medium">
              <el-select
                v-model="form.fhelper"
                multiple
                :disabled="true ? form.fstatus != '1' : form.fstatus == '1'"
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

        <el-form-item size="medium" required>
          <el-col :span="8">
            <el-form-item
              prop="fslipno"
              label="联络票"
              label-width="80px"
              size="medium"
            >
              <el-input
                v-model="form.fslipno"
                :disabled="true ? form.fstatus != '1' : form.fstatus == '1'"
                class="width-sytle"
                placeholder="请输入联络票号"
              />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item
              label="订单号"
              label-width="80px"
              prop="fodrno"
              size="medium"
            >
              <el-input
                v-model="form.fodrno"
                class="width-sytle"
                :disabled="true ? form.fstatus != '1' : form.fstatus == '1'"
                placeholder="请输入订单号"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="SIR NO" label-width="80px" size="medium">
              <el-input
                v-model="form.fsirno"
                disabled
                placeholder="SIR No"
              />
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item size="medium" required>
          <el-form-item
            label="开发概要"
            label-width="80px"
            prop="fbrief"
            size="medium"
          >
            <el-input
              v-model="form.fbrief"
              type="textarea"
              :disabled="true ? form.fstatus != '1' : form.fstatus == '1'"
              placeholder="开发概要"
            />
          </el-form-item>
        </el-form-item>
        <el-form-item size="medium" required>
          <el-form-item
            label="问题描述"
            label-width="80px"
            prop="fcontent"
            size="medium"
          >
            <el-input
              v-model="form.fcontent"
              type="textarea"
              :disabled="true ? form.fstatus != '1' : form.fstatus == '1'"
              placeholder="问题描述"
            />
          </el-form-item>
        </el-form-item>
        <el-form-item size="medium" required>
          <el-form-item label="问题分析" label-width="80px" size="medium">
            <el-input
              v-model="form.fanalyse"
              type="textarea"
              :disabled="true ? form.fstatus == '5' : form.fstatus != '5'"
              placeholder="问题分析"
            />
          </el-form-item>
        </el-form-item>
        <el-form-item size="medium" required>
          <el-form-item label="解决方案" label-width="80px" size="medium">
            <el-input
              v-model="form.fsolution"
              type="textarea"
              :disabled="true ? form.fstatus == '5' : form.fstatus != '5'"
              placeholder="解决方案"
            />
          </el-form-item>
        </el-form-item>
        <el-form-item
          v-show="true ? form.fstatus == '1' : form.fstatus == '1'"
          required
        >
          <el-col :span="8">
            <el-form-item label="计划开始" label-width="80px" prop="fplnstart">
              <el-date-picker
                v-model="form.fplnstart"
                type="date"
                size="medium"
                value-format="yyyy-MM-dd"
                placeholder="计划开始日期"
                :disabled="true ? form.fstatus != '1' : form.fstatus == '1'"
                class="width-sytle"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="计划结束" label-width="80px" prop="fplnend">
              <el-date-picker
                v-model="form.fplnend"
                type="date"
                size="medium"
                value-format="yyyy-MM-dd"
                placeholder="计划结束日期"
                :disabled="true ? form.fstatus != '1' : form.fstatus == '1'"
                class="width-sytle"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="计划工时" label-width="80px" size="medium">
              <el-input
                v-model="form.fplnmanpower"
                type="number"
                :disabled="true ? form.fstatus != '1' : form.fstatus == '1'"
                placeholder="计划工时"
              />
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item
          v-show="true ? form.fstatus != '1' : form.fstatus != '1'"
          required
        >
          <el-col :span="3">
            <el-form-item size="medium">
              <el-upload
                class="upload-demo"
                action="/api/file_upload/"
                :before-upload="beforeFileUpload"
                :limit="1"
              >
                <el-link
                  :disabled="isCanUpload()"
                  :underline="false"
                  icon="el-icon-upload2"
                >上传</el-link>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item size="medium">
              <el-link
                :underline="false"
                :disabled="isCanDownload()"
                icon="el-icon-download"
                :href="form.freleaserpt"
              >下载</el-link>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="计划工时:" label-width="80px" size="medium">
              <el-input
                v-model="form.fplnmanpower"
                :disabled="true ? form.fstatus != '2' : form.fstatus == '2'"
                type="number"
                style="width: 60%"
                placeholder="计划工时"
              />
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="实际工时:" label-width="80px" size="medium">
              <el-input
                v-model="form.factmanpower"
                :disabled="true ? form.fstatus != '2' : form.fstatus == '2'"
                type="number"
                style="width: 60%"
                placeholder="实际工时"
              />
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            :disabled="true ? form.fstatus == '4' : form.fstatus != '4'"
            @click="onSubmit('form')"
          >更新</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
import store from '@/store';
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      loading: false,
      drawer: false,
      iscanupdate: false,
      ori_form: {},
      form: {
        id: '',
        fsystemcd: '',
        fprojectcd: '',
        fslipno: '',
        ftype: '',
        fstatus: '',
        fodrno: '',
        fassignedto: '',
        fhelper: '',
        fleader: '',
        fbrief: '',
        fcontent: '',
        fanalyse: '',
        fsolution: '',
        fplnstart: '',
        fplnend: '',
        factstart: '',
        factend: '',
        fsirno: '',
        fplnmanpower: 0,
        factmanpower: 0,
        freleaserpt: ''
      },
      rules: {
        fsystemcd: [
          { required: true, message: '请输入系统名称', trigger: 'blur' }
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
          { required: true, message: '请输入开发概要', trigger: 'blur' }
        ],
        fcontent: [
          { required: true, message: '请输入问题描述', trigger: 'blur' }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(['systems', 'projects', 'group_users', 'all_group_users'])
  },
  watch: {
    form: {
      handler(val) {
        if (val.fodrno || val.fslipno) {
          if (val.fslipno === val.fodrno) {
            this.$alert('联络票号和订单号不可相同');
            val.fslipno = ''
          }
        }
      },
      deep: true
    }
  },
  mounted: function() {
    this.loading = true;
    var this_ = this;
    this.bus.$on('openSlipNoModifiy', async function(id) {
      this_.drawer = true;

      var resp = await store.dispatch('workbench/getSingleLiaison', id)

      var liaison = resp.data;
      if (liaison.fhelper) {
        liaison.fhelper = liaison.fhelper.split(',');
      } else {
        liaison.fhelper = [];
      }

      if (liaison.fleader) {
        liaison.fleader = liaison.fleader.split(',');
      } else {
        liaison.fleader = [];
      }
      this_.form = resp.data;
      if (this_.form.freleaserpt) {
        this_.form.freleaserpt = 'media/upload/file/' + this_.form.freleaserpt;
      }
    });
    this.loading = false;
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          var fleader_arr = this.form.fleader;

          if (fleader_arr) {
            this.form.fleader = fleader_arr.join(',');
          } else {
            this.form.fleader = '';
          }

          var fhelper_arr = this.form.fhelper;
          if (fhelper_arr) {
            this.form.fhelper = fhelper_arr.join(',');
          } else {
            this.form.fhelper = '';
          }

          var data = { 'id': this.form.id, 'data': this.form }

          var resp = await store.dispatch('workbench/modifyLiaison', data)

          if (resp.result === 'OK') {
            this.$message({
              message: this.form.fslipno + '更新成功！',
              type: 'success'
            });
            this.drawer = false;
          } else {
            this.form.fleader = this.form.fleader.split(',');
            this.form.fhelper = this.form.fhelper.split(',');
          }
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    isCanDownload() {
      if (this.form.freleaserpt) {
        return false;
      }
      return true;
    },

    isCanUpload() {
      if (this.form.fstatus === '3') {
        return false;
      }
      return true;
    },

    async beforeFileUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;

      const fileForm = new FormData();

      if (!isLt2M) {
        this.$message.error('上传文件大小不能超过 2MB!');
      }

      fileForm.append('file', file);
      fileForm.append('liaison', this.form.id);
      var resp = await store.dispatch('workbench/liaisonFileUpdate', fileForm)

      if (resp.result === 'OK') {
        this.$message.success('文件上传成功');
        var resp_l = await store.dispatch('workbench/getSingleLiaison', this.form.id)
        this.form = resp_l.data;
        this.form.freleaserpt = 'media/upload/file/' + this.form.freleaserpt;
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
.width-sytle {
  width: 90%;
}
</style>
