import { Toast } from 'vant'
/** 
 * 注意 :修改 moment 源代码里的导出方式为默认导出
 */
// import moment from 'moment'

/**
 * 统一处理异步请求数据的结果判断
 * @param res 请求回来的参数
 */
export const is_res = ( res: any ) => {
  if ( res.statusCode == 200 ) {
    // Toast.success( res.message )
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
 * @param format 时间格式 默认 'YYYY-MM-DD' 支持格式自己加 , 或者使用 moment 包
 */
export const is_moment = ( data: any, format: string = 'YYYY-MM-DD' ) => {
  let now = new moment( data ).format( format )
  return now
}

class moment {
  constructor ( props: any ) {
    console.log( 'props', props )
    this.dateFmt( props )
  }
  static = {
    YY: '',
    MM: '',
    DD: '',
    kk: '',
    mm: '',
    ss: ''
  }
  // 格式时间
  dateFmt ( data: any ) {
    const date = new Date( data )
    this.static = {
      YY: date.getFullYear().toString().padStart( 2, '0' ),
      MM: ( date.getMonth() + 1 ).toString().padStart( 2, '0' ),
      DD: date.getDate().toString().padStart( 2, '0' ),
      kk: date.getHours().toString().padStart( 2, '0' ),
      mm: date.getMinutes().toString().padStart( 2, '0' ),
      ss: date.getSeconds().toString().padStart( 2, '0' )
    }
  }

  format ( val: string ) {
    const { YY, MM, DD, kk, mm, ss } = this.static
    switch ( val ) {
      // 当前项目只用到了默认格式和这种格式 
      // 需要更多格式 , 自己设置就好了
      case 'YYYY-MM-DD kk:mm':
        return `${ YY }-${ MM }-${ DD } ${ kk }:${ mm }`
      default:
        return `${ YY }-${ MM }-${ DD }`
    }
  }
}
