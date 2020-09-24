import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";

Vue.use(Vuex);
sessionStorage.setItem("isLogin", "0");
interface Login {
  isLogin: boolean;
}

const store: StoreOptions<Login> = {
  state: {
    isLogin: false,
  },
  mutations: {
    login(state): void {
      state.isLogin = !state.isLogin;
      sessionStorage.setItem("isLogin", state.isLogin ? "1" : "0");
    },
  },
  actions: {},
  modules: {},
};

export default new Vuex.Store<Login>(store);
