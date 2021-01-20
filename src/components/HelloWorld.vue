<template>
  <h1>{{ msg }}6666666666</h1>
  <p>
    Recommended setup:
    <a href="https://code.visualstudio.com/" target="_blank">VSCode</a>
    +
    <a
      href="https://marketplace.visualstudio.com/items?itemName=octref.vetur"
      target="_blank"
      >Vetur</a
    >
  </p>
  <p>
    Make sure to use workspace version of TypeScript to get improved support via
    <a href="https://github.com/znck/vue-developer-experience" target="_blank"
      >@vuedx</a
    >.
  </p>
  <button @click="count++">count is: {{ count }}</button>
  <p>
    Edit <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
// import instance from '../api/instance'

export default defineComponent( {
  name: 'HelloWorld',
  props: {
    msg: {
      type: String,
      required: true
    }
  },
  setup: () => {
    const count = ref( 0 )
    // let res = await instance.get( '/666' )
    // console.log( 'res', res )
    return {
      count
    }
  }
} )
</script>

<style lang="less" scoped>
* {
  font-size: 20px;
}
</style>
