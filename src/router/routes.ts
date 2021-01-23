import { RouteRecordRaw } from 'vue-router'
import App from '../App.vue'
import home from './home'
import user from './user'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import( '/@/views/login/index.vue' )
  },
  {
    path: '/home',
    component: App,
    children: home
  },
  {
    path: '/user',
    component: App,
    children: user
  }
]

export default routes 
