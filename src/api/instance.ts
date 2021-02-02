import axios from 'axios'
import { start, done } from 'nprogress'
import { Toast } from 'vant'
import router from '../router'

if ( process.env.NODE_ENV == 'development' ) {
  process.env.NODE_ENV_URL = 'http://127.0.0.1:3000'
} else {
  process.env.NODE_ENV_URL = 'http://127.0.0.1:3000'
}

console.log( process.env.NODE_ENV_URL )

const instance = axios.create( {
  baseURL: '' || process.env.NODE_ENV_URL,
  timeout: 3500,
  method: '' || 'get'
} )

// 请求拦截器
instance.interceptors.request.use(
  config => {
    start()
    const token = sessionStorage.getItem( 'new_token' )
    if ( token ) {
      config.headers.Authorization = token
    }
    return config
  },
  error => {
    return Promise.reject( error )
  }
)

// 响应拦截器
instance.interceptors.response.use(
  response => {
    done()
    return response.data
  },
  error => {
    console.log( 'err', error.response )
    const code = error.response.status
    switch ( code ) {
      case 401:
        Toast.fail( '还没登录 , 请先登录' )
        router.push( {
          name: 'login',
          params: {
            back: 'true'
          }
        } )
        break
      case 404:
        Toast.fail( '网络错误' )
        router.push( '/error' )
        break
      default:
        Toast.fail( error.response.statusText )
        router.push( '/error' )
        break
    }
    return Promise.reject( error )
  }
)

export default instance
