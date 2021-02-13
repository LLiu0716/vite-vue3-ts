<template>
  <div class="user">
    <NnHeader title="个人中心" :show="true" />
    <div class="username" @click="router.push({ name: 'set' })">
      <div class="l">
        <van-image :src="isUrl(user.head_img)">
          <template v-slot:loading>
            <van-loading type="spinner" size="20" />
          </template>
        </van-image>
      </div>
      <div class="r">
        <div class="t">
          <i v-if="user.gender == 1" class="iconfont iconxingbienan"></i>
          <i v-else class="iconfont iconxingbienv"></i>
          <span>{{ user.nickname }}</span>
        </div>
        <div class="b">{{ is_moment(user.create_date) }}</div>
      </div>
      <div class="rr">
        <i class="iconfont iconjiantou1"></i>
      </div>
    </div>
    <div class="content">
      <div class="item" v-for="(v, i) in list" :key="i">
        <van-cell :title="v.name" :value="v.content" is-link :to="v.pash" />
      </div>
      <div class="btn">
        <van-button round size="large" type="primary" block @click="lo_out">
          <span>退 出</span>
        </van-button>
      </div>
    </div>
    <NnFooter />
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive, defineAsyncComponent, onMounted, ref } from 'vue'
import { is_moment } from '/@/methods'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { Dialog } from 'vant'

export default defineComponent( {
  name: 'user',
  setup ( props, context ) {
    const router = useRouter()
    const store = useStore()
    const data = reactive( {
      user: store.state.user
    } )

    const list = [
      { name: '我的关注', pash: '/user/live', content: '关注的人' },
      { name: '我的跟帖', pash: '/user/follow', content: '跟帖/回复' },
      { name: '我的收藏', pash: '/user/enshrine', content: '文档/视频' },
      { name: '设置', pash: '/user/set', content: '' }
    ]

    const isUrl = ( url: string ) => {
      if ( url ) {
        return url
      } else {
        return url = 'https://img.yzcdn.cn/vant/apple-2.jpg'
      }
    }

    const lo_out = async () => {
      try {
        await Dialog.confirm( {
          title: '提示',
          message: '是否退出 ?',
        } )
        sessionStorage.removeItem( 'new_token' )
        sessionStorage.removeItem( 'new_id' )
        sessionStorage.removeItem( 'IS_USER' )
        router.push( { name: 'login' } )
      } catch ( error ) { console.log( error ) }
    }

    return {
      ...toRefs( data ),
      router,
      list,
      is_moment,
      lo_out,
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
    align-items: center;
    height: 100px;
    border-bottom: 2px solid #ccc;
    .l {
      flex: 2;
      padding: 0 12px;
      :deep(img) {
        border-radius: 50%;
      }
    }
    .r {
      flex: 5;
      height: 100%;
      padding: 0 12px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .t {
        font-size: 18px;
        .iconxingbienan {
          color: skyblue;
        }
        .iconxingbienv {
          color: pink;
        }
        i {
          margin-right: 8px;
        }
      }
      .b {
        font-size: 14px;
      }
    }
    .rr {
      padding-right: 12px;
      text-align: right;
      i {
        font-weight: 700;
        color: #999;
      }
    }
  }
  .content {
    padding: 0 12px;
    .item {
      height: 70px;
      font-size: 14px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #ccc;
    }
  }
  .btn {
    margin-top: 20px;
  }
}
</style>
