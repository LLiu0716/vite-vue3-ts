<template>
  <div class="follow">
    <NnHeader title="我的跟帖" />
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        v-model:error="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
        offset="30"
        :immediate-check="false"
      >
        <template v-if="list.length">
          <div class="item" v-for="(v, i) in list" :key="i">
            <div class="time">{{ mome(v.create_date) }}</div>
            <div class="look" v-if="v.parent">
              <div class="parent-name">回复 : {{ v.parent.user.nickname }}</div>
              <div class="parent-content">{{ v.parent.content }}</div>
            </div>
            <div class="title">{{ v.content }}</div>
            <div class="foot">
              <p>原文 : {{ v.post.title }}</p>
              <i class="iconfont iconjiantou1"></i>
            </div>
          </div>
        </template>
        <div class="item" v-else></div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import { set_comments } from '../../api/user/follow'
import { is_res, is_moment } from '../../methods'

export default defineComponent( {
  name: 'user_follow',
  setup ( props, context ) {

    const data = reactive( {
      list: [],
      error: false,
      loading: false,
      finished: false,
      refreshing: false,
      pageSize: 10,
      pageIndex: 1
    } )

    const get_list = async () => {
      try {
        let res = await set_comments( {
          pageIndex: data.pageIndex,
          pageSize: data.pageSize
        } )
        let list: never[] = is_res( res )
        data.list = [ ...data.list, ...list ]
        if ( list.length < data.pageSize ) {
          data.finished = true
        }
      } catch ( error ) { console.log( error ) }
    }

    const onLoad = () => {
      data.loading = true
      data.pageIndex = data.pageIndex + 1
      console.log( data.pageIndex )
      get_list()
      setTimeout( () => {
        data.loading = false
      }, 300 )
    }

    const onRefresh = () => {
      // 清空列表数据
      data.pageIndex = 1
      data.list = []
      data.finished = false;
      // 将 loading 设置为 true，表示处于加载状态
      data.loading = true;
      onLoad()
    }

    onMounted( () => {
      get_list()
    } )

    const mome = ( data: any ) => {
      return is_moment( data, 'YYYY-MM-DD kk:mm' )
    }

    return {
      ...toRefs( data ),
      mome,
      onLoad,
      onRefresh
    }
  }
} )
</script>

<style lang="less" scoped>
.follow {
  .item {
    padding: 20px;
    border-bottom: 1px solid #ccc;
    font-size: 16px;
    .time {
      line-height: 24px;
      height: 24px;
      color: #999;
    }
    .look {
      width: 95%;
      background-color: #eee;
      color: #999;
      padding: 10px;
      .parent-name {
        padding: 0 0 5px;
        font-size: 14px;
      }
    }
    .title {
      height: 20px;
      line-height: 20px;
      margin: 10px 0;
    }
    .foot {
      display: flex;
      justify-content: space-between;
      p {
        font-size: 14px;
        color: #999;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
