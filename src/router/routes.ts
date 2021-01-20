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
    path: '/home',
    component: App,
    children: home
  },
  {
    path: '/user',
    component: App,
    children: user
  },
  {
    path: '/login',
    name: 'login',
    component: () => import( '/@/views/login/index.vue' )
  }
]

export default routes 
