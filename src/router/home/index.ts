import { RouteRecordRaw } from 'vue-router'
import Home from '../../views/home/index.vue'

const home: Array<RouteRecordRaw> = [
  {
    path: '',
    name: 'home',
    component: Home
  }
]

export default home