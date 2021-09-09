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
              <el-form-item label="系统代码:" required>
                <el-input v-model="form.fsystemcd" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :lg="9">
              <el-form-item label="系统名称:">
                <el-input v-model="form.fsystemnm" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :lg="6">
              <el-button
                type="primary"
                plain
                @click="onSubmit('form')"
              >新建</el-button>
            </el-col>
          </el-row>
        </el-form>
        <el-row>
          <el-col :xs="24" :sm="24" :lg="24">
            <el-table
              v-loading="loading"
              :data="systems"
              border
              size="medium"
            >
              <el-table-column
                prop="fsystemcd"
                label="系统代码"
                sortable
                min-width="180"
              />
              <el-table-column
                prop="fsystemnm"
                label="系统名称"
                min-width="180"
              />
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-link
                    :underline="false"
                    @click="handleDelete(scope.row.fsystemcd, scope.row.id)"
                  >
                    <svg-icon icon-class="delete_red" />
                  </el-link>
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
import {
  newSystemMaster,
  deleteSystemMaster
} from '@/api/master';
export default {
  data() {
    return {
      loading: false,
      tableData: [],
      dialogFormVisible: false,
      form: {
        fsystemcd: '',
        fsystemnm: ''
      },
      rules: {
        fsystemcd: [
          { required: true, message: '请输入系统代码', trigger: 'blur' }
        ],
        fsystemnm: [
          { required: true, message: '请输入系统名称', trigger: 'blur' }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(['systems'])
  },
  methods: {
    async handleDialog() {
      this.dialogFormVisible = !this.dialogFormVisible;
      this.refreshSystemsList()
    },
    async handleDelete(fsystemcd, id) {
      this.$confirm('此操作将永久删除' + fsystemcd + ', 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async action => {
          if (action === 'confirm') {
            var resp = await deleteSystemMaster(id)

            if (resp.result === 'OK') {
              this.refreshSystemsList();
              this.$message({
                message: fsystemcd + '已经删除！',
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
          var resp = await newSystemMaster(this.form)

          if (resp.result === 'OK') {
            this.refreshSystemsList();
            this.$message({
              message: this.form.fsystemcd + '创建成功！',
              type: 'success'
            });
            this.form.fsystemcd = ''
            this.form.fsystemnm = ''
          }
        }
      });
    },
    async refreshSystemsList() {
      await store.dispatch('common/getSystems');
    }
  }
};
</script>

<style></style>
