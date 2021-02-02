import { RouteRecordRaw } from 'vue-router'
import Home from '../../views/home/index.vue'

const home: Array<RouteRecordRaw> = [
  {
    path: '',
    name: 'home',
    component: Home
  },
  {
    path: 'tablist',
    name: 'tablist',
    component: () => import( '/@/views/home/tablist.vue' )
  },
  {
    path: 'seek',
    name: 'seek',
    component: () => import( '/@/views/home/seek.vue' )
  },
]

export default home