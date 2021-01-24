import request from "../../instance"
import url from "./url"

/**
 * 获取评论列表
 */
export const set_follows = async () => {
  let res: any = await request.get( url.user_comments )
  return res
}
