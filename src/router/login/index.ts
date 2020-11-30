import { RouteRecordRaw } from 'vue-router'

const login: Array<RouteRecordRaw> = [
  {
    path: '',
    name: 'login',
    component: () => import( '../../views/login/index.vue' )
  }
]

export default login