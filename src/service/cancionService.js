import { get } from "axios";

const url = process.env.VUE_APP_URI + "/canciones";

function getCanciones() {
  return get(url);
}

export { getCanciones };
