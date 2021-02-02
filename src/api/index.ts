import request from "./instance"
import url from "./url"

/**
 * 获取文章详情
 */
export const set_post_item = async ( id: number ) => {
  let res: any = await request.get( `${ url.post }/${ id }` )
  return res
}
