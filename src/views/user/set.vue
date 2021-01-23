<template>
  <div class="set">
    <NnHeader title="设 置" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { set_User } from '../../api/user'

export default defineComponent( {
  name: 'user_set',
} )
</script>

<style lang="less" scoped>
</style>
