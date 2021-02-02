<template>
  <div class="tablist">
    <NnHeader title="栏目管理" />
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

    } )

    const router = useRouter()

    return {
      ...toRefs( data )
    }
  }
} )
</script>

<style lang="less" scoped>
</style>
