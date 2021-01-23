export default {
  user: {} || JSON.parse( sessionStorage.getItem( 'IS_USER' ) as any )
}
