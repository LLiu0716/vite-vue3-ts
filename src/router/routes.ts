import { RouteRecordRaw } from 'vue-router'
import App from '../App.vue'
import home from './home'
import login from './login'

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
    path: '/login',
    component: App,
    children: login
  }
]

export default routes 
