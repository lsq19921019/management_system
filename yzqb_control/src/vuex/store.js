/**
 * Created by alan on 17-5-1.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)

// 应用初始状态
const state = {
  count: 10,
  userListIndex:1,
  orderListAllIndex:1,  //订单列表(全部)
  orderListIndex:1,     //订单列表(客服)
  creditListIndex:1     //授信记录
}

// 定义所需的 mutations
const mutations = {
  INCREMENT(state) {
    state.count++
  },
  DECREMENT(state) {
    state.count--
  },
  GETUSERLISTINDEX(state,pageIndex){
    state.userListIndex = pageIndex;
  },
  SETORDERLISTINDEX(state,pageIndex){
    state.orderListIndex = pageIndex;
  },
  SETORDERLISTALLINDEX(state,pageIndex){
    state.orderListAllIndex = pageIndex;
  },
  SETCREDITLISTINDEX(state,pageIndex){
    state.creditListIndex = pageIndex;
  }
}

// 创建 store 实例
export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations
})
