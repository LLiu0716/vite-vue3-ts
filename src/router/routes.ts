import { RouteRecordRaw } from 'vue-router'
import index from '../views/index.vue'
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
    path: '/error',
    name: 'error',
    component: () => import( '/@/views/error.vue' )
  },
  {
    path: '/home',
    component: index,
    children: home
  },
  {
    path: '/user',
    component: index,
    children: user,
    meta: {
      click: true
    }
  }
]

export default routes 
