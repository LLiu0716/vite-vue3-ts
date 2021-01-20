<template>
  <div class="login">
    <NnHeader title="个人中心" :show="true" />
    <NnFooter />
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, onActivated, reactive, toRef, defineAsyncComponent } from 'vue'
import { Toast } from 'vant'
// import { Toast, Field, Form } from 'vant'
import { setLogin, setRegister } from '../../api/login'
import { is_res } from '../../methods'
import { useRouter } from 'vue-router'

export default defineComponent( {
  name: 'user',
  // components: {
  //   'van-form': Form,
  //   'van-field': Field
  // },
  setup ( props, context ) {
    const router = useRouter()
    const data = reactive( {
      show: true,
      username: '',
      password: '',
      nickname: '',
      newpass: ''
    } )
    const validator = ( val: string ) => {
      if ( val === data.password ) return true
      else return false
    }

    const goLogin = async () => {
      try {
        let res = await setLogin( {
          username: data.username,
          password: data.password
        } )
        res = is_res( res )
        console.log( 'res', res )
        if ( res ) {
          sessionStorage.setItem( 'new_token', res.token )
          sessionStorage.setItem( 'new_id', res.id )
          Toast.loading( '登录中...' )
          setTimeout( () => {
            router.push( { name: 'home' } )
          }, 500 )
        }
      } catch ( error ) { console.log( 'err', error ) }
    }

    const goRegister = async () => {
      try {
        let res = await setRegister( {
          username: data.username,
          password: data.password,
          nickname: data.nickname
        } )
        res = is_res( res )
        console.log( 'res', res )
        if ( res ) {
          data.show = true
        }
      } catch ( error ) { console.log( 'err', error ) }
    }

    return {
      ...toRefs( data ),
      validator,
      goLogin,
      goRegister
    }
  }
} )
</script>

<style lang="less" scoped>
.login {
  .top {
    padding: 12px;
    text-align: right;
    font-size: 14px;
    a,
    span {
      color: sienna;
    }
  }
  .logo {
    width: 100%;
    text-align: center;
    i {
      font-size: 200px;
      color: tomato;
    }
  }
  .conten {
    padding: 0 30px;
    /deep/ .van-field__control {
      font-size: 20px;
      line-height: 26px;
      margin-bottom: 12px;
      border-bottom: 1px solid #ccc;
    }
    .btn {
      width: 60%;
      margin: 12px auto;
    }
  }
}
</style>
