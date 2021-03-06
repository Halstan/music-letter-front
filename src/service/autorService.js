import { get } from "axios";

const url = process.env.VUE_APP_URI + "/autores";

function getAutores() {
  return get(url);
}

function getAutorById(idAutor) {
  return get(`${url}/${idAutor}`);
}

export { getAutores, getAutorById };
