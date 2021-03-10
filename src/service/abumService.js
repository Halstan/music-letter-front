import { get } from "axios";

const url = process.env.VUE_APP_URI + "/albumes";

function getAlbumesByAutor(idAutor) {
  return get(`${url}/autor/${idAutor}`);
}

function getAlbumes() {
  return get(url)
}

export { getAlbumesByAutor, getAlbumes };
