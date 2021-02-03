<template>
  <div class="live">
    <NnHeader title="我的关注" />
    <van-skeleton :row="list.length" :loading="!list.length">
      <div class="item" v-for="(v, i) in list" :key="i">
        <div class="l">
          <img :src="isUrl(v.head_img)" />
        </div>
        <div class="c">
          <div class="t">
            <i v-if="v.gender == 1" class="iconfont iconxingbienan"></i>
            <i v-else class="iconfont iconxingbienv"></i>
            <span>{{ v.nickname }}</span>
          </div>
          <div class="b">{{ is_moment(v.create_date) }}</div>
        </div>
        <div class="r">
          <van-button
            block
            round
            size="small"
            plain
            type="primary"
            @click="unfollow($event, v.id)"
          >
            取消关注
          </van-button>
        </div>
      </div>
      <div class="footer">没有更多了</div>
    </van-skeleton>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
import { set_follows, set_user_unfollow, set_user_follows } from '../../api/user/live'
import { is_res, is_url, is_moment } from '../../methods'
import { Dialog, Toast } from 'vant'

export default defineComponent( {
  name: 'user_live',
  setup () {
    const data = reactive( {
      list: []
    } )

    onMounted( () => {
      get_list()
    } )

    const get_list = async () => {
      try {
        let res = await set_follows()
        res = is_res( res )
        data.list = res
      } catch ( error ) { console.log( error ) }
    }

    const isUrl = ( url: string ) => {
      if ( url ) {
        return url = is_url( url )
      } else {
        return url = 'https://img.yzcdn.cn/vant/apple-1.jpg'
      }
    }

    const unfollow = async ( e: any, id: number ) => {
      try {
        let res: any
        switch ( e.target.innerText ) {
          case '取消关注':
            await Dialog.confirm( {
              title: '温馨提示',
              message: '确定取消关注ta吗?',
            } )
            res = await set_user_unfollow( id )
            e.target.innerText = '关注'
            break
          default:
            await Dialog.confirm( {
              title: '温馨提示',
              message: '确定关注ta吗?',
            } )
            res = await set_user_follows( id )
            e.target.innerText = '取消关注'
            break
        }
        Toast.success( res.message )
      } catch ( error ) { console.log( error ) }
    }

    return {
      ...toRefs( data ),
      isUrl,
      is_moment,
      unfollow
    }
  }
} )
</script>

<style lang="less" scoped>
.live {
  width: 100%;
  .item {
    display: flex;
    padding: 12px;
    align-items: center;
    height: 80px;
    border-bottom: 1px solid #ccc;
    .l {
      flex: 2;
      padding: 0 12px;
      height: 100%;
      img {
        height: 100%;
        border-radius: 50%;
      }
    }
    .c {
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
        span {
          font-size: 14px;
        }
      }
      .b {
        font-size: 12px;
      }
    }
    .r {
      padding-right: 12px;
      text-align: right;
      flex: 3;
    }
  }
  .footer {
    font-size: 12px;
    color: #999;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }
}
</style>
