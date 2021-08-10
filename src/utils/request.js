import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Authorization'] = 'JWT ' + getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data

    // result 为OK时，当前操作成功，NG时失败
    if (res.result !== 'OK') {
      // 响应中 exception 为字符串时，直接将错误报出，exception为object时，在业务程序中处理
      if (typeof res.exception === 'string') {
        Message({
          message: res.exception || 'Error',
          type: 'error',
          duration: 5 * 1000
        })
      }

      // 用户已失效: 50003
      // 用户未认证: 50004
      // 用户认证失败: 50005
      // Token失效: 50007
      if (res.code === 50003 || res.code === 50003 || res.code === 50005 || res.code === 50007) {
        // to re-login
        MessageBox.confirm('当前用户已经失效，请重新登录', '确认退出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return res
    } else {
      return res
    }
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject()
  }
)

export default service
