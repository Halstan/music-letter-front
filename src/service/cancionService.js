import { get } from "axios";

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

export { getCanciones, getCancionById, getCancionByAlbum };
