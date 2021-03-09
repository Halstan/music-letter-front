import { get, post } from "axios";

const url = process.env.VUE_APP_URI + "/autores";

function getAutores() {
  return get(url);
}

function getAutorById(idAutor) {
  return get(`${url}/${idAutor}`);
}

function addAutor(autor) {
  return post(`${url}`, autor);
}

export { getAutores, getAutorById, addAutor };
