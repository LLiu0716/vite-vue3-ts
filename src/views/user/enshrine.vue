<template>
  <div class="enshrine">
    <NnHeader title="我的收藏" />
    <NnRefresh api="我的收藏" @getList="getList">
      <template v-slot:default>
        <NnList
          v-for="(v, i) in list"
          :key="i"
          :item="v"
          @onClick="onClick"
        ></NnList>
      </template>
    </NnRefresh>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent( {
  name: 'enshrine',
  setup ( props, text ) {
    const router = useRouter()

    const data = reactive( {
      list: []
    } )

    const getList = ( res: any ) => {
      data.list = res
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
      getList,
      onClick
    }
  }
} )
</script>

<style lang="less" scoped>
</style>
