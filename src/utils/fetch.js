import axios from 'axios'
import { MessageBox, Notification } from 'element-ui'
import store from '../store'
// import router from '../router';

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  // Do something before request is sent
  const cookies = document.cookie.split(';')
  let idToken = null
  if (cookies.find((item) => item.indexOf('wuan-id-token') !== -1)) {
    idToken = cookies.find((item) => item.indexOf('wuan-id-token') !== -1).split('=')[1]
  }
  let accessToken = null
  if (cookies.find((item) => item.indexOf('wuan-access-token') !== -1)) {
    accessToken = cookies.find((item) => item.indexOf('wuan-access-token') !== -1).split('=')[1]
  }

  if (idToken) {
    config.headers['ID-Token'] = idToken
  }
  if (accessToken) {
    config.headers['Access-Token'] = accessToken
  }
  return config
}, error => {
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return response.data
    }
    if (response.status === 204) {
      return {}
    }
  },
  error => {
    // console.log('err' + error);// for debug
    if (!error.response) {
      Notification({
        message: error.message,
        offset: 60
      })
    } else if (error.response.status === 401) {
      MessageBox.confirm('登录状态过期或未登录，可以取消继续留在该页面，或者重新登录', '确定登出', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.dispatch('Logout').then(() => {
          location.reload()// 为了重新实例化vue-router对象 避免bug
        })
      })
      return Promise.reject(error)
    }
    /* Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    }); */
    return Promise.reject(error.response)
  }
)
export default service
