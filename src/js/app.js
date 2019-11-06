import axios from 'axios'
import allApi from './apis'
import { Loading } from 'element-ui'
import { debounce } from './util.js'
// import { getSign } from './NewMD5Encrypt'

axios.interceptors.request.use(
  function (config) {
    // config['headers']= {'Content-Type': 'aplication/json; charset=utf-8'}
    if (config.loader != null) {
      config.loadingInstance = Loading.service({ target: config.loader })
    }
    if (sessionStorage.token)
      config.headers.Authorization = sessionStorage.token
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(res => {
  if (res.config.loadingInstance) res.config.loadingInstance.close()
  if (res.headers && res.headers['new-token']) {
    console.log('更换newToken:' + res.headers['new-token'])
    sessionStorage.setItem('token', res.headers['new-token'])
  }
  if (typeof res.data === 'string' || res.data instanceof Blob) return res.data
  if (res.data.code == 1) return res.data
  else {
    if(res.data.code==-2){
      vm.$message.error(res.data.message)
    }else if (res.data.code >= 20050 && res.data.code <= 20053) {
      debounce('appjs', () => {
        // vm.$notify({ title: '未登录', message: '自动返回登录页' })
        vm.$router.push({
          path: '/login'
        })
      }, 2000)
    } else {
      vm.$message.error(res.data)
    }
    return Promise.reject(res.data)
  }
}, e => {
  if (e.config.loadingInstance) e.config.loadingInstance.close()
  if (e.response) {
    if (e.response.data && e.response.data.message)
      vm.$message.error(e.response.data.message)
  } else if (e.request) {
    vm.$message.error('服务器无响应')
  }
  return Promise.reject(e)
})

var app = {
  ajax(method, url, data, loader) {
    if (allApi[url] == null)
      return Promise.reject(new Error('接口路径未配置：' + url))
    // data.sign = getSign(data) //不用
    var argus = [allApi[url], { params: data, loader: loader}]
    if(method=='post' || method=='put' || method=='patch')
      argus =argus = [allApi[url], data,{loader: loader}]
    if(method == 'delete')  
      argus = [allApi[url], { data: data, loader: loader}]  
    return axios[method](...argus)
  },
  get (...argus) {
    return app.ajax('get', ...argus)
  },
  post (...argus) {
    return app.ajax('post', ...argus)
  },
  delete (...argus) {
    return app.ajax('delete', ...argus)
  },
  put (...argus) {
    return app.ajax('put', ...argus)
  },
  patch (...argus) {
     return app.ajax('patch', ...argus)
  },

  /** 获取登录返回信息 */
  getLogin() {
    return JSON.parse(sessionStorage.loginInfo || '{}')
  },
  axios:axios,
  /**
   * 获取角色ID
   * @returns {number} 
   **/
  getRole() {
    // return app.getLogin().role_id
    return 1
  },

  /**模板下载 **/
  downLoad(name,url) {
    axios.get(allApi[url], {responseType: 'blob'}).then(d => {
      var a = document.createElement('a')
      a.href = URL.createObjectURL(d)
      a.download = name+'.xls'
      a.click()
      window.URL.revokeObjectURL(a.href)
    })
  },
  
  /** 存储对象键的枚举 */
  stores: {
    /** 上次登录记住的用户名密码 */
    LastLogin: 'lastLogin'
  },
  /** 获取对象 */
  getStore(key) {
    return JSON.parse(localStorage.getItem('store-' + key) || '{}')
  },
  /** 移除存储的对象 */
  removeStore(key) {
    localStorage.removeItem('store-' + key)
  },
  /** 存储对象 */
  setStore(key, value) {
    localStorage.setItem('store-' + key, JSON.stringify(value || {}))
  },
  unique(arr) {
        var result = []
        var obj = {}
        for(var i=0;i<arr.length;i++){
                if(!obj[arr[i]]){
                    result.push(arr[i])
                  obj[arr[i]] = true
             }
        }
         return result
     }
}

export default app
