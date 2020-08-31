import axios from 'axios'
import qs from 'qs'
import router from '../router'
import {Message} from 'element-ui'
axios.defaults.timeout = 10000
// axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:3000/'
axios.interceptors.request.use(config => {
  // if (localStorage.getItem('api_token')) {
  //   config.headers.utoken = `${localStorage.getItem('api_token')}`
  // }
  // loadinginstace = Loading.service({fullscreen: true}) // 请求打开loading
  return config
}, err => {
  Message.error({
    message: '退出登陆',
    onClose: function () {
      // router.push({path: './login'})
    }
  })
  return Promise.reject(err)
})
axios.interceptors.response.use(response => {
  // loadinginstace.close() // 响应成功关闭loading
  return response
}, error => {
  Message.error({
    message: '退出登陆',
    onClose: function () {
      // router.push({path: '/login'})
    }
  })
  return Promise.resolve(error.response)
})
function statusCode (response) {
  // console.log(response)
  let res = response.data
  switch (res.code) {
    case 401:
      Message.error({
        message: '未授权，请登录',
        onClose: function () {
          // router.push({path: '/login'})
        }
      })
      break
    case '402':
      alert(res.desc)
      break
    case '403':
      Message.error({
        message: '登录失效，请重新登录',
        onClose: function () {
          // router.push({path: '/login'})
        }
      })
      break
    case 404:
      Message.error({
        message: '请求地址出错',
        onClose: function () {
          // router.push({path: '/login'})
        }
      })
      break
    case 408:
      Message.error({
        message: '请求超时',
        onClose: function () {
          router.push({name: 'error-404'})
        }
      })
      break
    case 500:
      Message.error({
        message: '服务器内部错误',
        onClose: function () {
          router.push({name: 'error-500'})
        }
      })
      break
    default:
      return res
  }
}
function checkStatus (response) {
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    if (response.data.resultCode === '-1') {
      Message.error({
        message: '请求出错',
        onClose: function () {
          router.push({name: 'error-404'})
        }
      })
    } else {
      return response
    }
  } else {
    return statusCode(response)
  }
}
function checkCode (res) {
  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
  if (res.data && (res.status === 200)) {
    return statusCode(res)
  }
  return res.data
}
export default {
  post (url, data) { //  post
    return axios({
      method: 'post',
      // baseURL: process.env.BASE_URL,
      url,
      data:qs.stringify(data),
      // dataType: 'json',
      timeout: 5000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        // 'Accept': 'application/json',
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }).then(
      (res) => {
        return checkCode(res)
      }
    )
  },
  get (url, params) { // get
    return axios({
      method: 'get',
      // baseURL: process.env.BASE_URL,
      url,
      params, // get 请求时带的参数
      timeout: 5000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  }
}
