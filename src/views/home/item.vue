<template>
  <div class="tablist">
    <NnHeader title="文章详情" />
  </div>
</template>

<script lang="ts">
import { Toast } from 'vant'
import { defineComponent, reactive, toRefs, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { home_tab } from '../../api/home'
import { is_res } from '../../methods'

export default defineComponent( {
  name: 'tablist',
  setup () {
    const data = reactive( {
      new_tab: [],
      oul_tab: []
    } )

    watch(
      () => data.new_tab,
      ( v ) => {
        console.log( v )
        localStorage.setItem( 'new_tab', JSON.stringify( data.new_tab ) )
        localStorage.setItem( 'oul_tab', JSON.stringify( data.oul_tab ) )
      }
    )

    const route = useRoute()

    onMounted( () => {
      console.log( 'route', route.query.id )
    } )

    return {
      ...toRefs( data ),
      route
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
