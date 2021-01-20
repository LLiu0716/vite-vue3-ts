<template>
  <div class="home">
    <NnHeader title="首 页" :show="true" />
    <NnFooter />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent( {
  name: 'home',
} )
</script>

<style lang="less" scoped>
</style>
