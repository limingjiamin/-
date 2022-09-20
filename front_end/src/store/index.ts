import { createStore } from "vuex";

export default createStore({
  state: {
    page: {
      page_num: 1,
      page_size: 5,
      page_count: "",
    },
    batch: {
      change_num: 0,//选中的个数
      change_lebel:"",//批量选中的操作
    }
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {},
});
