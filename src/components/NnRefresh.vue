<template>
  <van-pull-refresh
    v-model="refreshing"
    success-text="刷新成功"
    @refresh="onRefresh"
    animation-duration
  >
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
      <van-skeleton :row="list.length" :loading="!list.length">
        <slot></slot>
      </van-skeleton>
    </van-list>
  </van-pull-refresh>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive, onMounted } from 'vue'
import { set_comments } from '../api/user/follow'
import { set_user_star } from '../api/user/enshrine'
import { is_res } from '../methods'

export default defineComponent( {
  name: 'nn_list',
  props: [ 'api' ],
  setup ( props, text ) {
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
        let res: any
        switch ( props.api ) {
          case '我的跟帖':
            res = await set_comments( {
              pageIndex: data.pageIndex,
              pageSize: data.pageSize
            } )
            break
          case '我的收藏':
            res = await set_user_star( {
              pageIndex: data.pageIndex,
              pageSize: data.pageSize
            } )
            break
          default:
            break
        }
        let list: never[] = is_res( res )
        data.list = [ ...data.list, ...list ]
        if ( list.length < data.pageSize ) {
          data.finished = true
        }
        text.emit( 'getList', data.list )
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
      data.pageIndex = 0
      data.list = []
      data.finished = false
      data.loading = true
      setTimeout( () => {
        data.refreshing = false
      }, 500 )
      onLoad()
    }

    onMounted( () => {
      get_list()
    } )

    return {
      ...toRefs( data ),
      onRefresh,
      onLoad
    }
  }
} )
</script>

<style lang="less" scoped>
</style>
