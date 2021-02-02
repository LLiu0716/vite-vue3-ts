<template>
  <div class="nn_list" @click="onClick(item.id)">
    <van-skeleton :row="10" :loading="!item">
      <!-- video 视频 -->
      <div class="video" v-if="item.type == 2">
        <div class="title">{{ item.title }}</div>
        <div class="video-img">
          <div class="img">
            <img :src="isUrl(item.cover[0].url)" />
          </div>
          <div class="ico">
            <i class="iconfont iconshipin"></i>
          </div>
        </div>
        <div class="bottom">
          <span>{{ item.user.nickname }}</span>
          <span v-if="api">{{ item.comment_length }} 跟帖</span>
          <span v-else>{{ item.comments.length }} 跟帖</span>
        </div>
      </div>
      <!-- text 单图文本 -->
      <div class="text" v-else-if="item.cover.length < 3">
        <div class="centent">
          <div class="title">{{ item.title }}</div>
          <div class="bottom">
            <span>{{ item.user.nickname }}</span>
            <span v-if="api">{{ item.comment_length }} 跟帖</span>
            <span v-else>{{ item.comments.length }} 跟帖</span>
          </div>
        </div>
        <div class="text-imgs">
          <img :src="isUrl(item.cover[0].url)" />
        </div>
      </div>
      <!-- imgs 多张图 -->
      <div class="imgs" v-else>
        <div class="title">{{ item.title }}</div>
        <div class="images">
          <template v-for="(v, i) in item.cover" :key="i">
            <img v-if="i < 3" :src="isUrl(v.url)" />
          </template>
        </div>
        <div class="bottom">
          <span>{{ item.user.nickname }}</span>
          <span v-if="api">{{ item.comment_length }} 跟帖</span>
          <span v-else>{{ item.comments.length }} 跟帖</span>
        </div>
      </div>
    </van-skeleton>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { is_url } from '../methods'

export default defineComponent( {
  name: 'nn_list',
  props: { item: Object, api: String },
  setup ( props, text ) {
    const isUrl = ( url: string ) => {
      return is_url( url )
    }

    const onClick = ( id: number ) => {
      text.emit( 'onClick', id )
    }

    return {
      isUrl,
      onClick
    }
  }
} )
</script>

<style lang="less" scoped>
.nn_list {
  width: 100%;
  .title {
    font-size: 16px;
    color: #000;
  }
  .bottom {
    font-size: 14px;
    color: #666;
    span {
      margin-right: 10px;
    }
  }
  .video {
    border-bottom: 1px solid #ccc;
    padding: 10px;
    .video-img {
      position: relative;
      padding: 10px 0;
      .img {
        text-align: center;
        img {
          width: 95%;
          height: 180px;
          object-fit: cover;
        }
      }
      .ico {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.6);
        line-height: 100px;
        text-align: center;
        i {
          font-size: 80px;
          color: #000;
        }
      }
    }
  }
  .text {
    border-bottom: 1px solid #ccc;
    padding: 10px;
    display: flex;
    .centent {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .text-imgs {
      width: 120px;
      height: 85px;
      img {
        width: 115px;
        height: 75px;
        object-fit: cover;
      }
    }
  }
  .imgs {
    border-bottom: 1px solid #ccc;
    padding: 10px;
    .images {
      display: flex;
      justify-content: space-between;
      margin: 10px 0;
      img {
        flex: 1;
        height: 70px;
        object-fit: cover;
      }
    }
  }
}
</style>
