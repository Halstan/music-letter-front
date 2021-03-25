import Vue from "vue";
import Vuex from "vuex";
import { login } from "../service/loginService";
import router from "../router/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload;
    }
  },
  actions: {
    login({ commit }, usuario) {
      login(usuario)
        .then(res => {
          commit("setToken", res.data.access_token);
          sessionStorage.setItem("token", res.data.access_token);
          router.push("/");
        })
        .catch(err => {
          console.log(err);
        });
    },
    cargarUsuario({ commit }) {
      if (sessionStorage.getItem("token")) {
        commit("setToken", sessionStorage.getItem("token"));
      } else {
        return commit("setToken", null);
      }
    },
    cerrarSesion({ commit }) {
      commit("setToken", null);
      sessionStorage.removeItem("token");
      router.push("/login");
    }
  },
  getters: {
    usuarioAutenticado(state) {
      return !!state.token;
    },
    getToken(state) {
      return state.token;
    }
  },
  modules: {}
});
