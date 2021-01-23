export default {
  IS_USER ( state: any, obj: any ) {
    sessionStorage.setItem( 'IS_USER', JSON.stringify( obj ) )
    state.user = obj
  }
}
