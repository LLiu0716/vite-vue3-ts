<template>
  <div class="user">
    <NnHeader title="个人中心" :show="true" />
    <div class="username">
      <div class="l">
        <van-image :src="isUrl(user.head_img)">
          <template v-slot:loading>
            <van-loading type="spinner" size="20" />
          </template>
        </van-image>
      </div>
      <div class="r">
        <div class="t"></div>
        <div class="b">{{ mome(user.create_date) }}</div>
      </div>
      <div class="l"></div>
    </div>
    <div class="content">
      <div class="item" v-for="(v, i) in list" :key="i">
        <van-cell :title="v.name" :value="v.content" is-link :to="v.pash" />
      </div>
    </div>
    <NnFooter />
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive, defineAsyncComponent, onMounted, ref } from 'vue'
import { Toast } from 'vant'
import { set_User } from '../../api/user'
import { is_res, is_url, is_moment } from '../../methods'
import { useRouter } from 'vue-router'
import * as moment from 'moment'

export default defineComponent( {
  name: 'user',
  setup ( props, context ) {
    const router = useRouter()
    const data = reactive( {
      user: {}
    } )
    const list = [
      { name: '我的关注', pash: '/user/live', content: '关注的回复' },
      { name: '我的跟帖', pash: '/user/follow', content: '跟帖/回复' },
      { name: '我的收藏', pash: '/user/enshrine', content: '文档/视频' },
      { name: '设置', pash: '/user/set', content: '' }
    ]
    const isUrl = ( url: string ) => {
      if ( url ) {
        return url = is_url( url )
      } else {
        return url = 'https://img.yzcdn.cn/vant/apple-2.jpg'
      }
    }
    const mome = ( date: any ) => {
      if ( date ) {
        // return moment( date ).format( 'YYYY-MM-DD' )
        return date = is_moment( date )
      }
    }
    onMounted( async () => {
      let id: string = sessionStorage.getItem( 'new_id' ) || ''
      console.log( '666', id )
      if ( id ) {
        let res = await set_User( id )
        res = is_res( res )
        data.user = res
      }
    } )
    return {
      ...toRefs( data ),
      list,
      mome,
      isUrl
    }
  }
} )
</script>

<style lang="less" scoped>
.user {
  width: 100%;
  .username {
    display: flex;
    padding: 12px;
    border-bottom: 2px solid #ccc;
    .l {
      flex: 1;
      padding: 0 12px;
      :deep(img) {
        border-radius: 50%;
      }
    }
    .r {
      flex: 2;
      padding: 0 12px;
    }
  }
  .content {
    padding: 12px;
    .item {
      border-bottom: 1px solid #ccc;
    }
  }
}
</style>
