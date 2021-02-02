<template>
  <router-view />
  <NnGoTop />
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue'
// import NnGoTop from './components/NnGoTop.vue'

export default defineComponent( {
  name: 'App',
  components: {
    // NnGoTop
    NnGoTop: defineAsyncComponent( () => import( './components/NnGoTop.vue' ) )
  }
} )
</script>

<style lang="less" scoped>
</style>
