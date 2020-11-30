import request from "../instance"
import url from "./url"

export const home = async () => {
  let res: any = await request.get( url.home )
  return res
}

export const phome = async ( data?: any, params?: any ) => {
  let res: any = await request.post( url.home, data, params )
  return res
}
