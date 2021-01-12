import { UserConfig } from 'vite'
const path = require( 'path' )

const config: UserConfig = {
  plugins: [],
  port: 8888,
  open: true,
  https: false,
  ssr: false,
  optimizeDeps: {
    include: [ 'axios', 'nprogress' ]
  },
  alias: {
    '/@/': path.resolve( __dirname, './src' )
  },
  // proxy: {
  //   '/foo': ''
  // }
}

export default config
