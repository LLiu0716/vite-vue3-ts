<template>
  <div class="enshrine">
    <NnHeader title="我的收藏" />
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
          <NnList v-for="(v, i) in list" :key="i" :item="v"></NnList>
        </template>
        <div class="item" v-else></div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
import { set_user_star } from '../../api/user/enshrine'
import { is_res } from '../../methods'

export default defineComponent( {
  name: 'enshrine',
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
        let res = await set_user_star( {
          pageIndex: data.pageIndex,
          pageSize: data.pageSize
        } )
        let list: never[] = is_res( res )
        data.list = [ ...data.list, ...list ]
        if ( list.length < data.pageSize ) {
          data.finished = true
        }
        console.log( res )
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
