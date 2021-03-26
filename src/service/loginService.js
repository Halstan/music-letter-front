import axios from "axios";

const url = process.env.VUE_APP_URI + "/login";
const urlToken = process.env.VUE_APP_URI + "/token";

const credentials = btoa(
  `${process.env.VUE_APP_TOKEN_USERNAME}:${process.env.VUE_APP_TOKEN_PASSWORD}`
);

function login(usuario) {
  const param = new URLSearchParams();
  param.set("grant_type", "password");
  param.set("username", usuario.username);
  param.set("password", usuario.password);

  return axios.post(url, param.toString(), {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${credentials}`
    }
  });
}

function logout(token) {
  return axios.get(`${urlToken}/anular/${token}`);
}

export { login, logout };
