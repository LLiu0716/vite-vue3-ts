<template>
  <router-view />
  <NnGoTop />
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue'

export default defineComponent( {
  name: 'App',
  components: {
    NnGoTop: defineAsyncComponent( () => import( './components/NnGoTop.vue' ) )
  }
} )
</script>

<style lang="less" scoped>
</style>
