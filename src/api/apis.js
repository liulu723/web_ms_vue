import axios from './axios'
import throttle from 'lodash/throttle'
const apiTags = {
  login: {
    url: 'user/login/',
    method: 'POST'
  },
  addUser:{
    url:'user/addUser',
    method: 'POST'
  },
  queryUserList:{
    url: 'user/queryUserList',
  },
  userCount:{
    url: 'user/usercount',
  },
  deleteUser:{
    url: 'user/deleteuser',
  },
  editorUser:{
    url: 'user/editoruser'
  },
  articleAdd:{
    url: 'article/add',
    method:'POST'
  },
  articleEditor:{
    url: 'article/editor',
    method:'POST'
  },
  articleQueryAll: {
    url: 'article/queryall'
  },
  articleCount: {
    url: 'article/count'
  },
  articleDelete: {
    url: 'article/deletearticle'
  }
}
const apis = (() => {
  let apiObj = {}
  Object.keys(apiTags).forEach(tag => {
    let throttleFunc = throttle((data) => {
      let { method = 'get', url, defaultDate } = apiTags[tag]
      if (data) {
        url = url
          .split('/:')
          .map(urlStr => {
            return data[urlStr] ? data[urlStr] : urlStr
          })
          .join('/')
      }
      return new Promise((resolve) => {
        if (method === 'get') {
          axios
            .get(url, { ...defaultDate, ...data })
            .then(async res => {
              // const {data} =res
              resolve(res)
            })
        } else {
          axios.post(url, { ...defaultDate, ...data })
            .then(async res => {
              // const {data} =res
              resolve(res)
            })
        }
      })
    }, 1000)
    apiObj[tag] = throttleFunc
  })
  return apiObj
})()
export default apis
