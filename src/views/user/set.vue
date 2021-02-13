<template>
  <div class="set">
    <NnHeader title="设 置" />
    <div class="content">
      <div class="img">
        <img :src="isUrl(store.state.user.head_img)" />
        <van-uploader :after-read="afterRead" />
      </div>
      <div class="item" v-for="v in list" :key="v.title">
        <van-cell
          :title="v.title"
          :value="v.value"
          @click="click_item(v.title)"
        />
      </div>
    </div>
    <div class="dialog">
      <van-dialog
        v-model:show="nickname_show"
        title="请输入要修改的昵称"
        show-cancel-button
        @confirm="modification('昵称')"
      >
        <van-field v-model.trim="nickname" placeholder="请输入昵称" />
      </van-dialog>
      <van-dialog
        v-model:show="password_show"
        title="请输入要修改的密码"
        show-cancel-button
        @confirm="modification('密码')"
      >
        <van-field
          v-model.trim="password"
          type="password"
          placeholder="请输入密码"
        />
      </van-dialog>
      <van-dialog
        v-model:show="gender_show"
        title="请选择"
        show-cancel-button
        @confirm="modification('')"
      >
        <van-radio-group v-model="gender">
          <van-cell-group>
            <van-cell title="男" clickable @click="gender = 1">
              <template #right-icon>
                <van-radio :name="1" />
              </template>
            </van-cell>
            <van-cell title="女" clickable @click="gender = 0">
              <template #right-icon>
                <van-radio :name="0" />
              </template>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </van-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from 'vue'
import { useStore } from 'vuex'
import { set_User, set_upload, set_user_update } from '/@/api/user'
import { Toast } from 'vant'
import { is_res, is_url } from '/@/methods'

export default defineComponent( {
  name: 'user_set',
  setup ( props, context ) {
    const store = useStore()
    const data = reactive( {
      nickname_show: false,
      nickname: '',
      password_show: false,
      password: '',
      gender_show: false,
      gender: 1,
      list: ref( [
        { title: "昵称", value: store.state.user.nickname },
        { title: "密码", value: "******" },
        { title: "性别", value: store.state.user.gender == 1 ? '男' : '女' }
      ] )
    } )

    /** 
     * 个人中心默认数据
     */
    const get_user = async () => {
      let id: string = sessionStorage.getItem( 'new_id' ) || ''
      if ( id ) {
        let res = await set_User( id )
        res = is_res( res )
        res.head_img = is_url( res.head_img )
        store.commit( 'IS_USER', res )
        // 明明vuex的数据是双向绑定的 , 但是就是不起效果 , 只能循环来改变修改后的值
        data.list.forEach( v => {
          switch ( v.title ) {
            case '昵称':
              v.value = res.nickname
              break
            case '性别':
              v.value = res.gender == 1 ? '男' : '女'
              break
            default:
              return
          }
        } )
      }
    }

    /**
     * 修改资料函数
     * @param data 需要修改的参数对象
     */
    const set_item = async ( data: any ) => {
      let id = sessionStorage.getItem( 'new_id' ) || ''
      try {
        let res = await set_user_update( id, data )
        Toast.success( res.message )
        res = is_res( res )
        get_user()
      } catch ( error ) { console.log( error ) }
    }

    /**
     * 文件上传函数
     * @param file 上传的文件
     */
    const afterRead = async ( file: any ) => {
      if ( file.size / 1024 > 50 ) {
        Toast( '文件大小不能超过 500kb' )
        return
      }
      let fromdata = new FormData()
      fromdata.append( 'file', file.file )
      try {
        let res = await set_upload( fromdata )
        res = is_res( res )
        console.log( 'res', res )
        set_item( { head_img: res.url } )
      } catch ( error ) { console.log( error ) }
    }

    /** 
     * 需要修改的参数
     * @param name 参数名
     */
    const click_item = ( name: string ) => {
      switch ( name ) {
        case '昵称':
          data.nickname = store.state.user.nickname
          data.nickname_show = true
          break
        case '密码':
          data.password = store.state.user.password
          data.password_show = true
          break
        default:
          data.gender = store.state.user.gender
          data.gender_show = true
          return
      }
    }

    /** 
     * 根据不同的形参修改参数
     * @param name 要修改的选项
     */
    const modification = ( name: string ) => {
      switch ( name ) {
        case '昵称':
          // 没有修改内容就不发请求
          if ( data.nickname != store.state.user.nickname ) {
            set_item( { nickname: data.nickname } )
          }
          break
        case '密码':
          if ( data.password != store.state.user.password ) {
            set_item( { password: data.password } )
          }
          break
        default:
          if ( data.gender != store.state.user.gender ) {
            set_item( { gender: data.gender } )
          }
          return
      }
    }

    /**
     * @name 判断是否有图片,如果没有图片就替换为默认图片
     */
    const isUrl = ( url: string ) => {
      if ( url ) {
        return url
      } else {
        return url = 'https://img.yzcdn.cn/vant/apple-2.jpg'
      }
    }

    return {
      ...toRefs( data ),
      store,
      isUrl,
      afterRead,
      click_item,
      modification
    }
  }
} )
</script>

<style lang="less" scoped>
.set {
  .content {
    padding: 0 12px;
    .img {
      width: 100%;
      height: 140px;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 100px;
        height: 100px;
        object-fit: contain;
        border-radius: 50%;
        position: absolute;
        z-index: 0;
      }
      :deep(.van-uploader) {
        opacity: 0;
        z-index: 1;
      }
    }
    .item {
      height: 70px;
      font-size: 14px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #ccc;
    }
  }
}
</style>
