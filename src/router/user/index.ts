import { RouteRecordRaw } from 'vue-router'

const user: Array<RouteRecordRaw> = [
  {
    path: '',
    name: 'user',
    component: () => import( '/@/views/user/index.vue' )
  },
  {
    path: 'set',
    name: 'set',
    component: () => import( '/@/views/user/set.vue' )
  },
  {
    path: 'enshrine',
    name: 'enshrine',
    component: () => import( '/@/views/user/enshrine.vue' )
  },
  {
    path: 'live',
    name: 'live',
    component: () => import( '/@/views/user/live.vue' )
  },
  {
    path: 'follow',
    name: 'follow',
    component: () => import( '/@/views/user/follow.vue' )
  }
]

export default user