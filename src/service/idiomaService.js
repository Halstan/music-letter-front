import axios from "axios";

const url = process.env.VUE_APP_URI + "/idiomas";

function getIdiomas() {
  return axios.get(url);
}

function addIdioma(idioma) {
  return axios.post(url, idioma);
}

export { getIdiomas, addIdioma };
