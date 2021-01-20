<template>
  <div class="login">
    <header class="header top">
      <router-link to="/home">跳过</router-link>
    </header>
    <div class="logo">
      <i class="iconfont iconnew"></i>
    </div>
    <div class="conten">
      <van-form v-if="show" validate-first @submit="goLogin">
        <van-field
          v-model="username"
          name="usname"
          placeholder="请输入用户名"
          :rules="[
            { required: true, message: '请填写用户名' },
            {
              pattern: /^1\d{4,10}$/,
              message: '用户名格式不正确',
              trigger: 'onChange',
            },
          ]"
        />
        <van-field
          v-model="password"
          type="password"
          name="paword"
          placeholder="请输入密码"
          :rules="[
            { required: true, message: '请填写密码' },
            {
              pattern: /^\d{3,12}$/,
              message: '密码格式不正确',
              trigger: 'onChange',
            },
          ]"
        />
        <div class="btn">
          <van-button round block type="primary" native-type="submit">
            登 录
          </van-button>
        </div>
      </van-form>
      <van-form v-else validate-first @submit="goRegister">
        <van-field
          v-model="nickname"
          name="name"
          placeholder="请输入昵称"
          :rules="[{ required: true, message: '请填写昵称' }]"
        />
        <van-field
          v-model="username"
          name="usname"
          placeholder="请输入用户名"
          :rules="[
            { required: true, message: '请填写用户名' },
            {
              pattern: /^1\d{4,10}$/,
              message: '用户名格式不正确',
              trigger: 'onChange',
            },
          ]"
        />
        <van-field
          v-model="password"
          type="password"
          name="paword"
          placeholder="请输入密码"
          :rules="[
            { required: true, message: '请填写密码' },
            {
              pattern: /^\d{3,12}$/,
              message: '密码格式不正确',
              trigger: 'onChange',
            },
          ]"
        />
        <van-field
          v-model="newpass"
          type="password"
          name="paword"
          placeholder="请重新输入密码"
          :rules="[
            { required: true, message: '请填写密码' },
            {
              validator,
              message: '密码不一致',
              trigger: 'onChange',
            },
          ]"
        />
        <div class="btn">
          <van-button round block type="primary" native-type="submit">
            注 册
          </van-button>
        </div>
      </van-form>
    </div>
    <footer class="footer top">
      <p v-if="show" @click="show = false">没有账号 ? 去<span>注册</span></p>
      <p v-else @click="show = true">已有账号 ? 去<span>登录</span></p>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, onActivated, reactive, toRef } from 'vue'
import { Toast } from 'vant'
// import { Toast, Field, Form } from 'vant'
import { setLogin, setRegister } from '../../api/login'
import { is_res } from '../../methods'
import { useRouter } from 'vue-router'

export default defineComponent( {
  name: 'Home',
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
