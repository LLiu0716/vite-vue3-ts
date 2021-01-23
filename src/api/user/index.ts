import request from "../instance"
import url from "./url"

export const set_User = async ( id?: string ) => {
  console.log( 'url.user', url.user )
  let res: any = await request.get( `/user/${ id }` )
  return res
} 
