<template>
  <div class="home">
    <header>
      <div class="l">
        <i class="iconfont iconnew"></i>
      </div>
      <div class="c" @click="router.push({ name: 'seek' })">
        <i class="iconfont iconsearch"></i>
        <p>搜索新闻</p>
      </div>
      <div @click="router.push('/login')" class="r" v-if="!id">
        <i class="iconfont iconwode"></i>
        <span>登录</span>
      </div>
    </header>
    <van-sticky z-index="999">
      <div class="container" @click="router.push({ name: 'tablist' })">
        <i class="iconfont iconjiantou1"></i>
      </div>
    </van-sticky>
    <van-skeleton :row="tab.length" :loading="!tab.length">
      <van-tabs v-model:active="active" sticky>
        <van-tab v-for="v in tab" :key="v.id" :title="v.name">
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
              <NnList v-for="(v, i) in list" :key="i" :item="v" api="首页" />
            </van-list>
          </van-pull-refresh>
        </van-tab>
      </van-tabs>
    </van-skeleton>
    <NnFooter />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { home_list, home_tab } from '../../api/home'
import { is_res } from '../../methods'

export default defineComponent( {
  name: 'home',
  setup () {
    const data = reactive( {
      list: [],
      id: sessionStorage.getItem( 'new_id' ) || '',
      active: 0,
      tab: [],
      error: false,
      loading: false,
      finished: false,
      refreshing: false,
      pageSize: 10,
      pageIndex: 1
    } )

    const router = useRouter()

    onMounted( () => {
      get_tab()
    } )

    watch(
      () => data.active,
      ( v ) => {
        console.log( 'v', v )
        data.pageIndex = 1
        data.list = []
        data.finished = false
        let tab: any = data.tab[ v ]
        let id: number = tab.id
        get_list( id )
      }
    )

    const get_tab = async () => {
      if ( localStorage.getItem( 'oul_tab' ) ) {
        data.tab = JSON.parse( localStorage.getItem( 'oul_tab' ) as any )
      } else {
        try {
          let res = await home_tab( {} )
          res = is_res( res )
          data.tab = res
        } catch ( error ) { console.log( error ) }
      }
      console.log( 'data.tab', data.tab )
      let obj: any = data.tab[ data.active ]
      let id: number = obj.id
      console.log( 'id', id )
      get_list( id )
    }

    const get_list = async ( id: number ) => {
      try {
        let res = await home_list( {
          category: id,
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
      let tab: any = data.tab[ data.active ]
      let id: number = tab.id
      get_list( id )
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

    return {
      ...toRefs( data ),
      onRefresh,
      onLoad,
      router
    }
  }
} )
</script>

<style lang="less" scoped>
.home {
  width: 100%;
  header {
    width: 100%;
    text-align: center;
    height: 50px;
    background: red;
    display: flex;
    align-items: center;
    padding-right: 12px;
    .l {
      width: 60px;
      height: 50px;
      line-height: 50px;
      i {
        font-size: 50px;
      }
    }
    .c {
      flex: 1;
      display: flex;
      align-items: center;
      height: 30px;
      background: rgb(249, 121, 121);
      border-radius: 15px;
      p {
        flex: 3;
        height: 30px;
        color: #fff;
        line-height: 30px;
        text-indent: 3px;
        font-size: 14px;
        text-align: left;
      }
      i {
        flex: 2;
        text-align: right;
        font-size: 18px;
      }
    }
    .r {
      padding-left: 10px;
      font-size: 16px;
      i {
        font-size: 20px;
        padding-right: 4px;
      }
    }
  }
  :deep(.van-tabs__nav) {
    background-color: #ececec;
    margin-right: 39px;
    height: 45px;
  }
  .container {
    z-index: 999;
    width: 40px;
    height: 45px;
    background: #eee;
    line-height: 44px;
    text-align: center;
    position: absolute;
    right: 0;
    .iconfont {
      font-weight: 700;
      transform: rotate(90deg);
      display: block; // 重要
    }
  }
}
</style>
