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

function getAlbum(idAlbum, token) {
  return axios.get(`${url}/${idAlbum}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

function editAlbum(album, token) {
  return axios.put(url, album, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export { getAlbumesByAutor, getAlbumes, addAlbum, getAlbum, editAlbum };
