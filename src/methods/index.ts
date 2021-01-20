import { Toast } from 'vant'

export const is_res = ( res: any ) => {
  if ( res.statusCode == 200 ) {
    Toast.success( res.message )
    return res.data
  } else {
    Toast.fail( res.message )
    return false
  }
}
