import Vue from "vue";
import Vuex from "vuex";
import { login, logout } from "../service/loginService";
import router from "../router/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null,
    refreshToken: null,
    usuario: null
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload;
    },
    setRefreshToken(state, payload) {
      state.refreshToken = payload;
    },
    setUsuario(state, payload) {
      state.usuario = payload;
    }
  },
  actions: {
    login({ commit }, usuario) {
      login(usuario)
        .then(res => {
          commit("setToken", res.data.access_token);
          commit("setRefreshToken", res.data.refresh_token);
          sessionStorage.setItem("token", res.data.access_token);
          sessionStorage.setItem("refreshToken", res.data.refresh_token);
          router.push("/");
        })
        .catch(err => {
          console.log(err);
        });
    },
    cargarUsuario({ commit }) {
      if (
        sessionStorage.getItem("token") &&
        sessionStorage.getItem("refreshToken")
      ) {
        commit("setToken", sessionStorage.getItem("token"));
        commit("setRefreshToken", sessionStorage.getItem("refreshToken"));
      } else {
        commit("setRefreshToken", null);
        return commit("setToken", null);
      }
    },
    cerrarSesion({ commit }) {
      logout(sessionStorage.getItem("token")).then(() => {
        commit("setToken", null);
        commit("setRefreshToken", null);
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("refreshToken");
        router.push("/login");
      });
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
