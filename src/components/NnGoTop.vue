<template>
  <div class="page-up" @click="goTop" v-show="goTopShow">
    <i class="iconfont iconjiantou2"></i>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, watch, onMounted, onBeforeUnmount } from 'vue'

export default defineComponent( {
  name: 'goTop',
  setup () {
    const data = reactive( {
      goTopShow: false,
      scroll_Top: 0
    } )

    onMounted( () => {
      window.addEventListener( 'scroll', scrollTop )
    } )

    onBeforeUnmount( () => {
      console.log( '777' )
      window.removeEventListener( 'scroll', scrollTop )
    } )

    watch(
      () => data.scroll_Top,
      ( v ) => {
        if ( v > 300 ) {
          data.goTopShow = true
        } else {
          data.goTopShow = false
        }
      }
    )

    const scrollTop = () => {
      data.scroll_Top = window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
    }

    const goTop = () => {
      let timer = setInterval( () => {
        let osTop = document.documentElement.scrollTop || document.body.scrollTop;
        let ispeed = Math.floor( -osTop / 5 );
        document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed;
        if ( osTop == 0 ) {
          clearInterval( timer )
        }
      }, 20 )
    }

    return {
      ...toRefs( data ),
      goTop
    }
  }
} )
</script>

<style lang="less" scoped>
.page-up {
  background-color: tomato;
  position: fixed;
  right: 10%;
  bottom: 10%;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.5);
  opacity: 0.35;
  z-index: 100;
  transform: rotate(90deg);
  i {
    font-size: 24px;
    color: #fff;
  }
}
</style>
