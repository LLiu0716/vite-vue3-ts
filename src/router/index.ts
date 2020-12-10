import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes'
import { start, done } from 'nprogress'
import 'nprogress/nprogress.css'

const router = createRouter( {
  history: createWebHashHistory(),
  routes
} )

router.beforeEach( ( to, form, next ) => {
  start()
  next()
} )

router.afterEach( () => {
  done()
} )

export default router
