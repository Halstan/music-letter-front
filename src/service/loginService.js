import axios from "axios";
import * as qs from "query-string";

const url = process.env.VUE_APP_URI + "/login";

function login(usuario) {
  const headers = {
    Authorization: "Basic vueApp:12345",
    "Content-Type": "application/application/json"
  };

  return axios.post(
    url,
    qs.stringify({
      grant_type: "password",
      username: usuario.username,
      password: usuario.password
    }),
    headers
  );
}

export { login };
