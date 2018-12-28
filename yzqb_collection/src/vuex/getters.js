/**
 * Created by alan on 17-5-1.
 */
export const getCount = state => {
  return state.count
}
export const getUserListIndex = state => {
  return state.userListIndex
}
export const getOrderListIndex = state => {
  return state.orderListIndex     //订单列表(客服)
}
export const getOrderListAllIndex = state => {
  return state.orderListAllIndex  //订单列表(全部)
}
export const getCreditListIndex = state => {
  return state.creditListIndex    //授信记录
}
