import { RouteRecordRaw } from 'vue-router'

const user: Array<RouteRecordRaw> = [
  {
    path: '',
    name: 'user',
    component: () => import( '/@/views/user/index.vue' )
  },
  {
    path: 'register',
    name: 'register',
    component: () => import( '/@/views/user/register.vue' )
  }
]

export default user