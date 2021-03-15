import axios from "axios";

const url = process.env.VUE_APP_URI + "/albumes";

function getAlbumesByAutor(idAutor) {
  return axios.get(`${url}/autor/${idAutor}`);
}

function getAlbumes() {
  return axios.get(url);
}

function addAlbum(album) {
  return axios.post(url, album);
}

function getAlbum(idAlbum) {
  return axios.get(`${url}/${idAlbum}`);
}

function editAlbum(album) {
  return axios.put(url, album);
}

export { getAlbumesByAutor, getAlbumes, addAlbum, getAlbum, editAlbum };
