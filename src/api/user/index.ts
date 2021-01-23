import request from "../instance"
import url from "./url"

export const set_User = async ( id?: string ) => {
  let res: any = await request.get( `/user/${ id }` )
  return res
}

export const set_upload = async ( file: any ) => {
  let res: any = await request.post( url.upload, file )
  return res
}

export const set_user_update = async ( id: string, data: any ) => {
  let res: any = await request.post( `${ url.user_update }/${ id }`, data )
  return res
}
