import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '/@/style/index.css'
import 'vant/lib/index.css'
import 'lib-flexible'

console.log( process.env.NODE_ENV )
if ( process.env.NODE_ENV == 'production' ) {
  console.log = () => { }
}
// import Vant, { Button } from 'vant'
import * as Vant from 'vant'

createApp( App )
  .use( store )
  .use( router )
  // .use( Button )
  .use( Vant )
  .mount( '#app' )
