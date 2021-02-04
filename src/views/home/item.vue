<template>
  <div class="item">
    <div class="header">
      <header>
        <i class="iconfont iconjiantou2" @click="router.back()"></i>
        <i class="iconfont iconnew c"></i>
        <i class="r">
          <van-button
            :disabled="disabled"
            color="red"
            block
            plain
            round
            size="mini"
            @click="live(item.has_follow)"
          >
            {{ item.has_follow ? "已关注" : "关注" }}
          </van-button>
        </i>
      </header>
    </div>
    <van-skeleton :row="20" :loading="!item.title">
      <div class="content">
        <h2 class="title">{{ item.title }}</h2>
        <p class="nickname">
          <span>{{ item.user.nickname }}</span>
          <span>{{ is_moment(item.create_date) }}</span>
        </p>
        <video
          :src="video(item.content)"
          v-if="item.type == 2"
          controls
          muted
          autoplay
        ></video>
        <div class="text" v-else v-html="item.content"></div>
        <div class="live">
          <i
            :class="{
              iconfont: true,
              icondianzan: true,
              has_like: item.has_like,
            }"
            @click="is_live(item.id)"
          >
            <span v-if="item.like_length">{{ item.like_length }}</span>
          </i>
        </div>
      </div>
      <div class="c_estimate">
        <NnEstimate v-for="(item, i) in estimate" :key="i" :item="item" />
        <div class="click" @click="get_estimate">{{ "点击获取评论信息" }}</div>
      </div>
    </van-skeleton>
  </div>
</template>

<script lang="ts">
import { Toast, Dialog } from 'vant'
import { defineComponent, reactive, toRefs, onMounted, watch, defineAsyncComponent } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { home_item, home_like, home_comments } from '../../api/home'
import { set_user_unfollow, set_user_follows } from '../../api/user/live'
import { is_res, is_moment, is_url } from '../../methods'

export default defineComponent( {
  name: 'tablist',
  components: {
    NnEstimate: defineAsyncComponent( () => import( './components/NnEstimate.vue' ) )
  },
  setup () {
    const data = reactive( {
      item: {} as any,
      estimate: [] as any,
      disabled: false,
      click: true,
      length: true,
      pageSize: 10,
      pageIndex: 1
    } )

    watch(
      () => data.click,
      ( v ) => {
        if ( !v ) {
          setTimeout( () => {
            data.click = true
          }, 5000 )
        }
      }
    )

    const route = useRoute()

    const router = useRouter()

    const is_token = async () => {
      const token = sessionStorage.getItem( 'new_token' )
      if ( !token ) {
        try {
          await Dialog.confirm( {
            title: '提示',
            message: '当前还未登录 , 是否去登录 ?',
          } )
          router.push( {
            name: 'login',
            params: { back: 'true' }
          } )
        } catch ( error ) { console.log( error ) }
      } else return true
    }

    const get_item = async () => {
      const id = route.query.id
      data.pageIndex = 0
      try {
        let res = await home_item( id )
        res = is_res( res )
        console.log( 'res', res )
        data.item = res
        get_estimate( id )
      } catch ( error ) { console.log( error ) }
    }

    const get_estimate = async ( id: any ) => {
      data.pageIndex += data.pageIndex
      try {
        if ( data.length ) {
          let res = await home_comments( id, {
            pageSize: data.pageSize,
            pageIndex: data.pageIndex
          } )
          res = is_res( res )
          console.log( 'res', res )
          data.estimate = [ ...data.estimate, ...res ]
          if ( res.length != data.pageSize ) {
            data.length = false
          }
        }
      } catch ( error ) { console.log( error ) }
    }

    const is_live = async ( id: number ) => {
      try {
        if ( data.click ) {
          if ( is_token() ) {
            let res = await home_like( id )
            Toast.success( res.message )
            get_item()
            data.click = false
          }
        }
      } catch ( error ) { console.log( error ) }
    }

    const live = async ( done: boolean ) => {
      const id: number = data.item.user.id
      data.disabled = true
      setTimeout( () => {
        data.disabled = false
      }, 5000 )
      try {
        if ( is_token() ) {
          let res: any
          if ( done ) {
            // 关注
            res = await set_user_unfollow( id )
          } else {
            // 取消关注
            res = await set_user_follows( id )
          }
          Toast.success( res.message )
          get_item()
        }
      } catch ( error ) { console.log( error ) }
    }

    const video = ( res: any ) => {
      const reg = /<\/?.+?\/?>/g
      return res.replace( reg, '' )
    }

    onMounted( () => {
      get_item()
    } )

    return {
      ...toRefs( data ),
      get_estimate,
      route,
      router,
      is_moment,
      live,
      is_url,
      video,
      is_live
    }
  }
} )
</script>

<style lang="less" scoped>
.item {
  width: 100%;
  .header {
    width: 100%;
    height: 50px;
    header {
      z-index: 999;
      display: flex;
      position: fixed;
      top: 0;
      width: 100%;
      height: 50px;
      align-items: center;
      border-bottom: 1px solid #ccc;
      background-color: #f2f2f2;
      i {
        align-items: center;
        justify-content: center;
        display: flex;
        width: 50px;
        height: 50px;
      }
      .c {
        font-size: 50px;
        justify-content: left;
        flex: 1;
      }
      .r {
        width: 80px;
        padding-right: 12px;
      }
    }
  }
  .content {
    border-bottom: 2px solid #ccc;
    padding: 12px;
    .title {
      font-size: 20px;
    }
    .nickname {
      margin-top: 12px;
      color: #666;
      span {
        font-size: 14px;
        margin-right: 12px;
      }
    }
    video {
      width: 100%;
      margin: 12px 0;
    }
    .text {
      font-size: 16px;
      :deep(img) {
        width: 100%;
        margin: 12px 0;
      }
      :deep(p) {
        width: 100%;
        margin: 12px 0;
      }
      :deep(a) {
        font-size: 14px;
        margin: 12px 0;
        color: #247cc2;
      }
      :deep(strong) {
        margin: 12px 0;
      }
      :deep(div) {
        width: 100%;
      }
    }
    .live {
      text-align: right;
      i {
        display: inline-block;
        padding: 0 14px;
        min-width: 70px;
        border: 1px solid #000;
        height: 26px;
        border-radius: 13px;
        line-height: 26px;
        text-align: center;
        span {
          margin-left: 8px;
        }
      }
      .has_like {
        color: #ff0000;
        border: 1px solid #ff0000;
      }
    }
  }
  .c_estimate {
    .click {
      text-align: center;
      height: 30px;
      line-height: 30px;
      font-size: 16px;
      color: #666;
    }
  }
}
</style>
