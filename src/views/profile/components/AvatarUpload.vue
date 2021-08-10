<template>
  <div>
    <a class="btn" @click="toggleShow">点击更新头像</a>
    <my-upload
      v-model="show"
      img-format="png"
      :height="300"
      :width="300"
      url="/api/account/update_avatar/"
      :headers="headers"
      method="POST"
      field="avatar"
      @crop-upload-fail="cropUploadFail"
      @crop-upload-success="cropUploadSuccess"
    />

    <img :src="imgDataUrl">
  </div>
</template>

<script>
import 'babel-polyfill'; // es6 shim
import myUpload from 'vue-image-crop-upload/upload-2.vue';
import { getToken } from '@/utils/auth'
export default {
  components: {
    myUpload
  },
  data() {
    return {
      imgDataUrl: '',
      show: false,
      size: 2.1,
      headers: { Authorization: 'JWT ' + getToken() }

    }
  },
  methods: {
    toggleShow() {
      this.show = !this.show;
    },
    // 上传成功回调
    cropUploadSuccess(jsonData, field) {
      this.$store.commit('user/SET_AVATAR', jsonData.data.avatar)
      this.toggleShow();
    },
    // 上传失败回调
    cropUploadFail(status, field) {
      this.$message.error('头像上传失败')
    }
  }
};
</script>

<style></style>
