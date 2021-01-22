<template>
  <div class="box">
    <footer class="Nnfooter">
      <div class="tab" v-if="route == 'home'">
        <div class="home" @click="router.push({ name: 'home' })">
          <img src="../assets/tab/home_click.svg" />
          <span>首页</span>
        </div>
        <div class="user" @click="router.push({ name: 'user' })">
          <img src="../assets/tab/user.svg" />
          <span>我的</span>
        </div>
      </div>
      <div class="tab" v-else>
        <div class="home" @click="router.push({ name: 'home' })">
          <img src="../assets/tab/home.svg" />
          <span>首页</span>
        </div>
        <div class="user" @click="router.push({ name: 'user' })">
          <img src="../assets/tab/user_click.svg" />
          <span>我的</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export default defineComponent( {
  name: 'Nheader',
  setup: ( props, context ) => {
    const router = useRouter()
    const route = useRoute().name
    return {
      router,
      route
    }
  }
} )
</script>

<style lang="less" scoped>
.box {
  height: 55px;
}
.Nnfooter {
  width: 100%;
  border-top: 1px solid #ccc;
  box-shadow: 0 0 10px 2px #ccc;
  background: #fff;
  position: fixed;
  bottom: 0;
  z-index: 999;
  .tab {
    width: 100%;
    height: 55px;
    display: flex;
    align-items: center;
    .home,
    .user {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      img {
        width: 30px;
        height: 30px;
      }
    }
  }
}
</style>
