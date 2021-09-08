<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogEdit"
      :close-on-click-modal="false"
    >
      <el-form
        ref="form"
        :model="form"
        label-position="right"
        label-width="80px"
      >
        <el-form-item prop="fsystem" label="系统" :error="error.fsystem">
          <el-select
            v-model="form.fsystem"
            class="input-short"
            :disabled="!newflg"
            clearable
          >
            <el-option
              v-for="item in systemList"
              :key="item.value"
              :label="item.value"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="fcomment" label="程序">
          <el-input
            v-model="form.fcomment"
            class="input-short"
            :disabled="!newflg"
            clearable
          />
        </el-form-item>
        <el-form-item prop="fslipno" label="联络票号" :error="error.fslipno">
          <el-input
            v-model="form.fslipno"
            class="input-short"
            :disabled="!newflg"
            clearable
          />
        </el-form-item>
        <el-form-item prop="fchkoutobj" label="迁出文件" :error="error.fchkoutobj">
          <el-input
            v-model="form.fchkoutobj"
            class="input-long"
            :disabled="!newflg"
            clearable
          />
        </el-form-item>
        <el-form-item v-if="!newflg" prop="fchkoutfile" label="迁出PBL">
          <el-input
            v-model="form.fchkoutfile"
            class="input-long"
            clearable
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          v-if="newflg"
          primary
          @click="updateContinue('form')"
        >继续新建</el-button>
        <el-button type="primary" plain @click="updateCheckout('form')">{{
          btntext
        }}</el-button>
        <el-button v-if="newflg" plain @click="resetInput('form')">重 置</el-button>
        <el-button plain @click="dialogEdit = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import store from '@/store';

export default {
  data() {
    return {
      title: '',
      dialogEdit: false,
      id: '',
      btntext: '',
      newflg: true,
      form: {
        fsystem: '',
        fcomment: '',
        fslipno: '',
        fchkoutobj: '',
        fchkoutfile: '',
        fchkstatus: ''
      },
      error: {
        fsystem: '',
        fslipno: '',
        fchkoutobj: ''
      },
      systemList: [
        {
          value: 'OMS',
          label: 'OMS'
        },
        {
          value: 'OMR',
          label: 'OMR'
        },
        {
          value: 'OMZ',
          label: 'OMZ'
        },
        {
          value: 'OMB',
          label: 'OMB'
        },
        {
          value: 'OMI',
          label: 'OMI'
        },
        {
          value: 'OMIIAB',
          label: 'OMIIAB'
        },
        {
          value: 'GCS',
          label: 'GCS'
        }
      ]
    };
  },

  methods: {
    async init(model, id) {
      this.resetInput('form');
      if (model === 'new') {
        this.title = '新建';
        this.btntext = '新 建';
        this.newflg = true;
      } else {
        this.title = '迁出';
        this.btntext = '迁 出';
        this.newflg = false;
        this.id = id;
        var resp = await store.dispatch('checkouts/getCheckoutData', id)
        this.form = resp.data;
      }
      this.dialogEdit = true;
    },

    resetInput(formname) {
      if (this.$refs[formname] !== undefined) {
        this.form = {
          fsystem: '',
          fcomment: '',
          fslipno: '',
          fchkoutobj: '',
          fchkoutfile: '',
          fchkstatus: ''
        };
      }
    },

    async updateCheckout(formname) {
      this.$refs[formname].validate(async valid => {
        if (valid) {
          if (this.newflg) {
            this.form.fchkstatus = '1-ASK';
            var respnew = await store.dispatch('checkouts/newCheckoutData', this.form)
            if (respnew.result === 'NG') {
              if (typeof respnew.exception === 'object') {
                this.error.fsystem = respnew.exception.fsystem[0]
                this.error.fslipno = respnew.exception.fslipno[0]
                this.error.fchkoutobj = respnew.exception.fchkoutobj[0]
              }
            } else {
              this.$message({
                message: '迁出记录新建成功',
                type: 'success'
              });
              this.dialogEdit = false;
            }
          } else {
            if (this.form.fchkoutfile !== '') {
              this.form.fchkstatus = '2-Check Out';
            }
            var args = { 'id': this.id, 'data': this.form }
            var respmodify = await store.dispatch('checkouts/updateCheckoutData', args)
            if (respmodify.result === 'OK') {
              this.$message({
                message: '迁出记录更新成功',
                type: 'success'
              });
              this.dialogEdit = false;
            }
          }
        }
      });
    },

    async updateContinue(formname) {
      this.$refs[formname].validate(async valid => {
        if (valid) {
          this.form.fchkstatus = '1-ASK';
          var respnew = await store.dispatch('checkouts/newCheckoutData', this.form)

          if (respnew.result === 'NG') {
            if (typeof respnew.exception === 'object') {
              this.error.fsystem = respnew.exception.fsystem[0]
              this.error.fslipno = respnew.exception.fslipno[0]
              this.error.fchkoutobj = respnew.exception.fchkoutobj[0]
            }
          } else {
            this.$message({
              message: '迁出记录新建成功',
              type: 'success'
            });
            this.form.fchkoutobj = '';
          }
        }
      });
    }
  }
};
</script>
<style scoped>
.input-short {
  width: 40%;
}

.input-long {
  width: 70%;
}
</style>
