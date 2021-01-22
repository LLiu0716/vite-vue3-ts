<template>
  <div class="box">
    <header class="Nheader">
      <i v-if="show"></i>
      <i class="iconfont iconjiantou2" @click="router.back()" v-else></i>
      <h2 class="title">{{ title }}</h2>
      <i class="go" v-if="id"></i>
      <i v-else @click="router.push('/login')">登录</i>
    </header>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent( {
  name: 'HelloWorld',
  props: {
    title: {
      type: String
      // required: true
    },
    show: {
      type: Boolean
    }
  },
  setup: ( props, context ) => {
    const router = useRouter()
    const id = sessionStorage.getItem( 'new_id' )
    return {
      router,
      id
    }
  }
} )
</script>

<style lang="less" scoped>
.box {
  height: 50px;
}
.Nheader {
  width: 100%;
  height: 50px;
  position: fixed;
  top: 0;
  line-height: 50px;
  align-items: center;
  background: #fff;
  border-bottom: 1px solid #ccc;
  z-index: 999;
  .title {
    flex: 1;
    text-align: center;
  }
  i {
    width: 50px;
    height: 100%;
    text-align: center;
  }
  .go {
    font-size: 14px;
    color: sienna;
  }
}
</style>
