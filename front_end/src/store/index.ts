import { createStore } from "vuex";
import createVuexAlong from 'vuex-along'

export default createStore({
  plugins:[createVuexAlong()],
  state: {
    page: {
      page_num: 1,
      page_size: 5,
      page_count: "",
    },
    batch: {
      change_num: "", //选中的个数的id数组
      change_ajax: false, //批量选中的操作的结果(true,false)
    },
    // currentNavigation:'/home'
  },
  getters: {},
  mutations: {
    // CHANGE(state,value){
    //     state.currentNavigation=value
    // }
  },
  actions: {},
  modules: {},
});
