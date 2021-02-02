import { createApp, defineAsyncComponent } from 'vue'
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
  Radio,
  List,
  PullRefresh,
  Tab,
  Tabs,
  Sticky,
  Empty,
  Skeleton
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
  .use( List )
  .use( PullRefresh )
  .use( Tab )
  .use( Tabs )
  .use( Sticky )
  .use( Empty )
  .use( Skeleton )
  .component( 'NnHeader', NnHeader )
  .component( 'NnFooter', NnFooter )
  // 无配置项异步组件
  .component( 'NnRefresh',
    defineAsyncComponent( () => import( './components/NnRefresh.vue' ) ) )
  // 有配置项异步组件
  .component( 'NnList',
    defineAsyncComponent( {
      loader: () => import( './components/NnItem.vue' ),
      delay: 200,
      timeout: 3000,
      errorComponent: () => import( "./components/NnItem.vue" ),
      loadingComponent: () => import( "./components/NnItem.vue" )
    } ) )
  // .use( Vant )
  .mount( '#app' )
