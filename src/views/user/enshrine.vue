<template>
  <div class="enshrine">
    <NnHeader title="我的收藏" />
    <NnRefresh api="我的收藏" @getList="getList">
      <template v-slot:default>
        <NnList v-for="(v, i) in list" :key="i" :item="v"></NnList>
      </template>
    </NnRefresh>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent( {
  name: 'enshrine',
  setup ( props, text ) {
    const data = reactive( {
      list: []
    } )

    const getList = ( res: any ) => {
      data.list = res
    }

    return {
      ...toRefs( data ),
      getList
    }
  }
} )
</script>

<style lang="less" scoped>
</style>
