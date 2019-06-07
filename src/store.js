import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pros: [],
    y: 0,
    list: [],
    order: {
      list: [],
      total: 0
    }
  },
  mutations: {
    addcar(state, payload) {
      let flag = true;
      state.pros.map(item => {
        if (item.goods_id === payload.goods_id) {
          item = { ...payload };

          flag = false;
          return;
        }
        return item;
      });
      if (flag) state.pros.push(payload);
    },
    car(state, payload) {
      state = payload;
    },
    savestate(state, payload) {
      state.y = payload;
    },
    getlist(state, payload) {
      state.list = [...state.list, ...payload];
    },
    addorder(state, payload) {
      state.order.list = payload.list;
      state.order.total = payload.total;
    }
  },
  actions: {
    getdata({ commit }, payload) {
      // this.$http
      //   .get("/store/goods/goodslist", {
      //     page: idx
      //   })
      //   .then(data => {
      //     // console.log(data);
      //     if (data.code === 1) {
      //       if (idx === 0) {
      //         this.list = data.data;
      //       } else {
      //         commit("getlist", data.data);
      //       }
      //       // console.log(this.list);
      //     }
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
    }
  }
});
