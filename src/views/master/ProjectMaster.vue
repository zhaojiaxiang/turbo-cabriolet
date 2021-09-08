<template>
  <div>
    <el-dialog
      title="系统主表"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
    >
      <div>
        <el-form
          ref="form"
          :inline="true"
          :rules="rules"
          :model="form"
          class="demo-form-inline"
        >
          <el-row>
            <el-col :xs="24" :sm="24" :lg="9">
              <el-form-item label="项目代码(制番):">
                <el-input v-model="form.fprojectcd" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :lg="9">
              <el-form-item label="项目名称:">
                <el-input v-model="form.fprojectnm" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :lg="6">
              <el-button
                type="primary"
                @click="onSubmit('form')"
              >新建</el-button>
            </el-col>
          </el-row>
        </el-form>
        <el-row>
          <el-col :xs="24" :sm="24" :lg="24">
            <el-table v-loading="loading" :data="projects">
              <el-table-column
                prop="fprojectcd"
                label="项目代码(制番)"
                min-width="180"
              />
              <el-table-column prop="fprojectnm" label="项目名称" min-width="180" />
              <el-table-column prop="fprojectsn" label="项目简称" min-width="180" />
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.row.fprojectcd, scope.row.id)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import store from '@/store';
import { mapGetters } from 'vuex';
import { newProjectMaster, deleteProjectMaster } from '@/api/master';
export default {
  data() {
    return {
      loading: false,
      dialogFormVisible: false,
      form: {
        fprojectcd: '',
        fprojectnm: '',
        fprojectsn: '',
        fautoflg: 'N'
      },
      rules: {
        fprojectcd: [
          { required: true, message: '请输入项目代码', trigger: 'blur' }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(['projects'])
  },
  methods: {
    async handleDialog() {
      this.dialogFormVisible = !this.dialogFormVisible;
      this.refreshProjectList();
    },
    async handleDelete(fprojectcd, id) {
      this.$confirm('此操作将永久删除' + fprojectcd + ', 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async action => {
          if (action === 'confirm') {
            var resp = await deleteProjectMaster(id);

            if (resp.result === 'OK') {
              this.refreshProjectList();
              this.$message({
                message: fprojectcd + '已经删除！',
                type: 'success'
              });
            }
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消删除'
          });
        });
    },
    onSubmit(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          var resp = await newProjectMaster(this.form);

          if (resp.result === 'OK') {
            this.refreshProjectList();
            this.$message({
              message: this.form.fprojectcd + '创建成功！',
              type: 'success'
            });
            this.form.fprojectcd = '';
            this.form.fprojectnm = '';
            this.form.fprojectsn = '';
            this.form.fautoflg = 'N';
          }
        }
      });
    },
    async refreshProjectList() {
      await store.dispatch('common/getProjects');
    }
  }
};
</script>

<style></style>
