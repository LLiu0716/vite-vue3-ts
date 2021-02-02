<template>
  <div class="seek">
    <div class="top">
      <div class="click">
        <div class="l" @click="back">
          <i class="iconfont iconjiantou2"></i>
        </div>
        <div class="c">
          <van-search
            v-model.trim="value"
            shape="round"
            background="red"
            :autofocus="true"
            placeholder="请输入搜索关键词"
            @search="onSearch(value)"
            @input="onSearch(value)"
          />
        </div>
        <div class="r">
          <van-button @click="back" color="red" block>
            <span>取 消</span>
          </van-button>
        </div>
      </div>
    </div>
    <div class="c" v-if="!list.length && !recommend.length">
      <h3>热门搜索</h3>
      <div class="item">
        <div class="name" v-for="v in hot_list" :key="v">
          <span @click="hot_iten(v)">{{ v }}</span>
        </div>
      </div>
      <h3>历史搜索</h3>
      <div class="item">
        <div class="name" v-for="v in history_list" :key="v">
          <span @click="history_iten(v)">{{ v }}</span>
        </div>
      </div>
    </div>
    <div class="list" v-else>
      <van-skeleton
        :row="list.length"
        :loading="!list.length && !recommend.length"
      >
        <template v-if="list.length">
          <NnList
            v-for="(v, i) in list"
            :key="i"
            :item="v"
            api="首页"
            @onClick="onClick"
          />
        </template>
        <template v-if="recommend.length">
          <div class="box">
            <div v-for="(v, i) in recommend" :key="i">
              <p class="title one" @click="look(v.title)">{{ v.title }}</p>
            </div>
          </div>
        </template>
      </van-skeleton>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { home_recommend, home_search } from '../../api/home'
import { is_res } from '../../methods'

export default defineComponent( {
  name: 'home',
  setup () {
    const data = reactive( {
      value: '',
      hot_list: [ '关晓彤', '新冠', '情火' ] as string[],
      history_list: [] as string[],
      time: 0 as any,
      recommend: [],
      list: []
    } )

    onMounted( () => {
      // onSearch = debounce( onSearch, 500 )
    } )

    const router = useRouter()

    const onSearch = ( name: string ) => {
      if ( name ) {
        clearTimeout( data.time )
        data.time = setTimeout( async () => {
          try {
            let res = await home_recommend( name )
            res = is_res( res )
            data.recommend = res
          } catch ( error ) { console.log( error ) }
        }, 500 )
      }
    }

    const get_items = async ( name: string ) => {
      data.history_list.unshift( name )
      data.history_list = [ ...new Set( data.history_list ) ]
      try {
        let res = await home_search( name )
        res = is_res( res )
        data.list = res
      } catch ( error ) { console.log( error ) }
    }

    const hot_iten = ( name: string ) => {
      data.value = name
      setTimeout( () => {
        data.hot_list.unshift( name )
        data.hot_list = [ ...new Set( data.hot_list ) ]
      }, 500 )
      get_items( name )
    }

    const history_iten = ( name: string ) => {
      data.value = name
      get_items( name )
    }

    const back = () => {
      data.value = ''
      if ( data.list.length ) data.list.length = 0
      else router.back()
    }

    const look = ( title: string ) => {
      data.recommend = []
      history_iten( title )
    }

    const onClick = ( id: number ) => {
      console.log( 'id', id )
      router.push( {
        path: '/home/item',
        query: { id }
      } )
    }

    return {
      ...toRefs( data ),
      look,
      back,
      router,
      onClick,
      onSearch,
      hot_iten,
      history_iten
    }
  }
} )
</script>

<style lang="less" scoped>
.seek {
  .top {
    height: 60px;
    width: 100%;
  }
  .click {
    width: 100%;
    position: fixed;
    top: 0;
    display: flex;
    background-color: red;
    .c {
      flex: 1;
      padding: 0;
    }
    .r {
      padding-right: 8px;
      width: 20%;
      display: flex;
      align-items: center;
      justify-content: center;
      span {
        font-size: 14px;
      }
    }
    .l {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50px;
      i {
        color: #fff;
        font-size: 20px;
      }
    }
  }
  .c {
    padding: 12px;
    h3 {
      font-size: 14px;
    }
    .item {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 8px;
      .name {
        display: flex;
        align-items: center;
        justify-content: center;
        span {
          margin: 4px;
          text-align: center;
          padding: 0 8px;
          height: 30px;
          line-height: 30px;
          margin-top: 10px;
          font-size: 14px;
          border-radius: 10%;
          background-color: #ccc;
        }
      }
    }
  }
  .box {
    padding: 10px;
    .title.one {
      height: 50px;
      line-height: 50px;
      font-size: 14px;
      border-bottom: 1px solid #000;
      text-indent: 1em;
    }
  }
}
</style>
