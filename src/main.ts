import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '/@/style/index.css'

console.log( process.env.NODE_ENV )
if ( process.env.NODE_ENV == 'production' ) {
  console.log = () => { }
}
if ( process.env.NODE_ENV == 'development' ) {
  process.env.NODE_ENV_URL = 'http://www.baidu.com'
}

createApp( App )
  .use( store )
  .use( router )
  .mount( '#app' )
