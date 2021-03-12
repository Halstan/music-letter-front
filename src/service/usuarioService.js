import { get } from "axios";

const url = process.env.VUE_APP_URI + "/usuarios";

function getUsuarios() {
  return get(url);
}

export { getUsuarios };
