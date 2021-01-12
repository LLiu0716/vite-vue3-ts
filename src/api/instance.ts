import axios from 'axios'
import { start, done } from 'nprogress'

if ( process.env.NODE_ENV == 'development' ) {
  process.env.NODE_ENV_URL = 'http://www.baidu.com'
} else {
  process.env.NODE_ENV_URL = 'http://www.baidu.com'
}

console.log( process.env.NODE_ENV_URL )

const instance = axios.create( {
  baseURL: '' || 'https://some-domain.com/api/',
  timeout: 3500,
  method: '' || 'get'
} )

// 请求拦截器
instance.interceptors.request.use(
  config => {
    start()
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
    return response
  },
  error => {
    return Promise.reject( error )
  }
)

export default instance
