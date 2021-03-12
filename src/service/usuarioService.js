import axios from "axios";

const url = process.env.VUE_APP_URI + "/usuarios";

function getUsuarios() {
  return axios.get(url);
}

function register(usuario) {
  return axios.post(url, usuario)
}

export { getUsuarios, register };
