/**
 * vuex核心管理对象模块
 *
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//状态对象
const state = {
  count: 0
};

//包含多个更新状态函数的对象
const mutations = {
  incrementMutation(state, num){
    return state.count  += num;
  },
  decrementMutation(state, num){
    return state.count -= num;
  }
};

//包含多个对应事件回调函数的对象
const actions = {
  increment ({commit},num) {
    setTimeout(() => commit('incrementMutation', num), 500)

  },
  decrement({commit}, num){
    commit('decrementMutation', num)
  }
};

//包含多个getter计算属性的对象
const getters = {
  evenOrOdd: function (state) {
    return state.count % 2 == 0 ? '偶数' : '奇数'
  }
}

export default new Vuex.Store({
  state,//状态对象
  mutations,//包含多个更新状态函数的对象
  actions,//包含多个对应事件回调函数的对象
  getters,//包含多个getter计算属性的对象
})
