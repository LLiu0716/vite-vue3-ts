<template>
  <div class="error" @click="router.back()">
    <NnHeader title="网络错误" :show="true" />
    <div class="c">
      <van-empty image="network" description="点击返回" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent( {
  name: 'error',
  setup () {
    const router = useRouter()
    return {
      router
    }
  }
} )
</script>

<style lang="less" scoped>
.error {
  .c {
    padding-top: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
