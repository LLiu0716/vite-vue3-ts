<template>
  <div class="tablist">
    <NnHeader title="栏目管理" />
    <div class="c">
      <h3>点击删除频道</h3>
      <div class="item">
        <div class="name" v-for="v in oul_tab" :key="v.id">
          <span @click="del_iten(v.id)">{{ v.name }}</span>
        </div>
      </div>
      <h3>点击添加频道</h3>
      <div class="item">
        <div class="name" v-for="v in new_tab" :key="v.id">
          <span @click="add_iten(v.id)">{{ v.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Toast } from 'vant'
import { defineComponent, reactive, toRefs, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { home_tab } from '../../api/home'
import { is_res } from '../../methods'

export default defineComponent( {
  name: 'tablist',
  setup () {
    const data = reactive( {
      new_tab: [],
      oul_tab: []
    } )

    const del_iten = ( id: number ) => {
      if ( data.oul_tab.length > 5 ) {
        let item: never[] = data.oul_tab.filter( ( v: any ) => v.id == id )
        data.oul_tab = data.oul_tab.filter( ( v: any ) => v.id != id )
        data.new_tab = [ ...data.new_tab, ...item ]
      } else {
        Toast.fail( '至少需要5个' )
      }
    }

    const add_iten = ( id: number ) => {
      let item: never[] = data.new_tab.filter( ( v: any ) => v.id == id )
      data.new_tab = data.new_tab.filter( ( v: any ) => v.id != id )
      data.oul_tab = [ ...data.oul_tab, ...item ]
    }

    const get_tab = async () => {
      if ( localStorage.getItem( 'new_tab' ) || localStorage.getItem( 'oul_tab' ) ) {
        data.new_tab = JSON.parse( localStorage.getItem( 'new_tab' ) as any )
        data.oul_tab = JSON.parse( localStorage.getItem( 'oul_tab' ) as any )
      } else {
        try {
          let res = await home_tab( {} )
          res = is_res( res )
          data.oul_tab = res
        } catch ( error ) { console.log( error ) }
      }
    }

    watch(
      () => data.new_tab,
      ( v ) => {
        console.log( v )
        localStorage.setItem( 'new_tab', JSON.stringify( data.new_tab ) )
        localStorage.setItem( 'oul_tab', JSON.stringify( data.oul_tab ) )
      }
    )

    const router = useRouter()

    onMounted( () => {
      get_tab()
    } )

    return {
      ...toRefs( data ),
      router,
      del_iten,
      add_iten
    }
  }
} )
</script>

<style lang="less" scoped>
.tablist {
  .c {
    padding: 12px;
    h3 {
      font-size: 18px;
    }
    .item {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 8px;
      .name {
        width: 20%;
        display: flex;
        align-items: center;
        justify-content: center;
        span {
          width: 80%;
          text-align: center;
          padding: 6px 0;
          margin-top: 10px;
          font-size: 14px;
          background-color: #ccc;
        }
      }
    }
  }
}
</style>
