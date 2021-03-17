import axios from "axios";

const url = process.env.VUE_APP_URI + "/generos";

function getGeneros() {
  return axios.get(url);
}

function addGenero(genero) {
  return axios.post(url, genero);
}

export { getGeneros, addGenero };
