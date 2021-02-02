<template>
  <div class="seek">
    <div class="click">
      <div class="l">
        <van-search
          v-model.trim="value"
          shape="round"
          background="#4fc08d"
          placeholder="请输入搜索关键词"
          @search="onSearch(value)"
          @input="onSearch(value)"
        />
      </div>
      <div class="r">
        <van-button @click="router.back()" color="#4fc08d" block>
          <span>取 消</span>
        </van-button>
      </div>
    </div>
    <div class="c">
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
      value: '',
      hot_list: [ '关晓彤', '周星驰', '新冠', '情火' ] as string[],
      history_list: [] as string[],
      time: 0 as any
    } )

    onMounted( () => {
      // onSearch = debounce( onSearch, 500 )
    } )

    const router = useRouter()

    const onSearch = ( name: string ) => {
      if ( name ) {
        clearTimeout( data.time )
        data.time = setTimeout( () => {
          data.history_list.unshift( name )
          data.history_list = [ ...new Set( data.history_list ) ]
        }, 500 )
      }
    }

    const hot_iten = ( name: string ) => {
      data.value = ''
      setTimeout( () => {
        data.hot_list.unshift( name )
        data.hot_list = [ ...new Set( data.hot_list ) ]
      }, 500 )
      onSearch( name )
    }

    const history_iten = ( name: string ) => {
      onSearch( name )
    }

    return {
      ...toRefs( data ),
      router,
      onSearch,
      hot_iten,
      history_iten
    }
  }
} )
</script>

<style lang="less" scoped>
.seek {
  .click {
    display: flex;
    background-color: #4fc08d;
    .l {
      flex: 1;
    }
    .r {
      padding-right: 8px;
      width: 20%;
      display: flex;
      align-items: center;
      span {
        font-size: 14px;
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
}
</style>
