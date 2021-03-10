import { get, post, put } from "axios";

const url = process.env.VUE_APP_URI + "/canciones";

function getCanciones() {
  return get(url);
}

function getCancionById(idCancion) {
  return get(`${url}/${idCancion}`);
}

function getCancionByAlbum(idAlbum) {
  return get(`${url}/album/${idAlbum}`);
}

function getCancionByNombre(nombre) {
  return get(`${url}/nombre/${nombre}`);
}

function addCancion(cancion) {
  return post(`${url}`, cancion)
}

function editCancion(cancion) {
  return put(url, cancion)
}

export { getCanciones, getCancionById, getCancionByAlbum, getCancionByNombre, addCancion, editCancion };
