/**
 * Created by alan on 17-5-1.
 */
export const increment = ({commit}) => {
  commit('INCREMENT')
}
export const decrement = ({commit}) => {
  commit('DECREMENT')
}
export const getUserListIndex = ({commit},pageIndex) => {
  commit('GETUSERLISTINDEX',pageIndex)
}
export const setOrderListIndex = ({commit},pageIndex) => {
  commit('SETORDERLISTINDEX',pageIndex)
}
export const setOrderListAllIndex = ({commit},pageIndex) => {
  commit('SETORDERLISTALLINDEX',pageIndex)
}
export const setCreditListIndex = ({commit},pageIndex) => {
  commit('SETCREDITLISTINDEX',pageIndex)
}
