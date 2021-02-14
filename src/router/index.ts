import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes'
import { start, done } from 'nprogress'
import { Toast } from 'vant'

const router = createRouter( {
  history: createWebHashHistory(),
  routes
} )

router.beforeEach( ( to, form, next ) => {
  console.log( 'form', form )
  const token = sessionStorage.getItem( 'new_token' )
  start()
  if ( to.meta.click ) {
    if ( !token ) {
      Toast.fail( '当前还未登录 \n 请先登录' )
      next( '/login' )
    } else {
      next()
    }
  } else {
    next()
  }
} )

router.afterEach( () => {
  done()
} )

export default router
