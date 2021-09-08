import request from '@/utils/request'

/**
 * 自定义上传图片插件
 */
class MyUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  async upload() {
    const data = new FormData();
    data.append('file', await this.loader.file);
    console.log(data);
    const res = await request({
      url: '/qa/image_upload/',
      method: 'post',
      data,
      withCredentials: true // true 为不允许带 token, false 为允许
    });

    // 后台返回数据：
    // {"code":0,"msg":"success","data":{"url":"/upload/struts2.jpeg"}}

    // 方法返回数据格式： {default: "url"}
    return {
      default: res.data.data.url
    };
  }
}

export default MyUploadAdapter;
