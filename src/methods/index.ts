import { Toast } from 'vant'
import moment from 'moment'
// import moment = require( 'moment' );

/**
 * 统一处理异步请求数据的结果判断
 * @param res 请求回来的参数
 */
export const is_res = ( res: any ) => {
  if ( res.statusCode == 200 ) {
    Toast.success( res.message )
    return res.data
  } else {
    Toast.fail( res.message )
    return false
  }
}

/**
 * 统一处理url携带请求地址问题
 * @param url 传入url
 */
export const is_url = ( url: any ) => {
  if ( url.startsWith( 'http' ) ) {
    return url
  } else {
    return process.env.NODE_ENV_URL + url
  }
}

/**
 * 时间格式化函数
 * @param data 时间参数
 * @param format 时间格式 默认 'YYYY-MM-DD'
 */
export const is_moment = ( data: any, format: string = 'YYYY-MM-DD' ) => {
  let now = moment( data ).format( format )
  return now
}
