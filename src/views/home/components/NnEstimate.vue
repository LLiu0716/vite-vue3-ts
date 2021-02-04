<template>
  <!-- 评价 -->
  <van-skeleton :row="5" :loading="!item.id">
    <div class="estimate">
      <div class="top">
        <div class="left">
          <img :src="isUrl(item.user.head_img)" />
        </div>
        <div class="center">
          <div class="name">{{ item.user.nickname }}</div>
          <div class="time">{{ is_moment(item.create_date) }}</div>
        </div>
        <div class="right">回复</div>
      </div>
      <NnReply v-if="item.parent" :parent="item.parent" :count="num(0, item)" />
      <div class="text">{{ item.content }}</div>
    </div>
  </van-skeleton>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue'
import { is_url, is_moment } from '../../../methods'

export default defineComponent( {
  name: 'estimate',
  components: {
    NnReply: defineAsyncComponent( () => import( './NnReply.vue' ) )
  },
  props: { item: Object },
  setup () {
    const isUrl = ( url: string ) => {
      if ( url ) return url = is_url( url )
      else return url = 'https://img.yzcdn.cn/vant/apple-1.jpg'
    }

    // const num = ( count: any, item: any ) => {
    const num = ( count: number, item: any ): number => {
      if ( item.parent ) {
        return num( count + 1, item.parent )
      } else {
        return count
      }
    }

    return {
      isUrl,
      is_moment,
      num
    }
  }
} )
</script>

<style lang="less" scoped>
.estimate {
  width: 100%;
  border-bottom: 2px solid #ccc;
  padding: 12px;
  .top {
    margin: 10px 0;
    display: flex;
    align-items: center;
    font-size: 16px;
    height: 50px;
    .left {
      flex: 1;
      img {
        height: 50px;
        width: 50px;
        border-radius: 50%;
      }
    }
    color: #999;
    .center {
      flex: 3;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .name {
        color: #000;
      }
      .time {
        font-size: 14px;
        margin-top: 4px;
      }
    }
    .right {
      width: 40px;
    }
  }
  .text {
    font-size: 16px;
    margin-top: 12px;
  }
}
</style>
