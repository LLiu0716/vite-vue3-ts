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

export const home_recommend = async ( keyword: string ) => {
  let res: any = await request.get( url.post_search_recommend, { params: { keyword } } )
  return res
}

export const home_search = async ( keyword: string ) => {
  let res: any = await request.get( url.post_search, { params: { keyword } } )
  return res
}
