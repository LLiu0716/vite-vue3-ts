import request from "../instance"
import url from "./url"

export const home_list = async ( params: any ) => {
  let res: any = await request.get( url.post, { params } )
  return res
}

export const home_tab = async ( params: any ) => {
  let res: any = await request.get( url.tab, { params } )
  return res
}

export const phome = async ( data: any ) => {
  let res: any = await request.post( url.post, data )
  return res
}
