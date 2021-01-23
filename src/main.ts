import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '/@/style/index.css'
import '/@/style/iconfont.css'
import 'vant/lib/index.css'
import 'lib-flexible'

console.log( process.env.NODE_ENV )
if ( process.env.NODE_ENV == 'production' ) {
  console.log = () => { }
}
import {
  Button,
  Dialog,
  Toast,
  Form,
  Field,
  Cell,
  CellGroup,
  Lazyload,
  Image as VanImage,
  Loading,
  Uploader,
  RadioGroup,
  Radio
} from 'vant'

import NnHeader from './components/NnHeader.vue'
import NnFooter from './components/NnFooter.vue'
// import * as Vant from 'vant'

createApp( App )
  .use( store )
  .use( router )
  .use( Button )
  .use( Dialog )
  .use( Toast )
  .use( Field )
  .use( Form )
  .use( Cell )
  .use( CellGroup )
  .use( Lazyload )
  .use( VanImage )
  .use( Loading )
  .use( Uploader )
  .use( RadioGroup )
  .use( Radio )
  .component( 'NnHeader', NnHeader )
  .component( 'NnFooter', NnFooter )
  // .use( Vant )
  .mount( '#app' )
