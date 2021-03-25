import axios from "axios";

const url = process.env.VUE_APP_URI + "/canciones";

function getCanciones() {
  return axios.get(url);
}

function getCancionById(idCancion) {
  return axios.get(`${url}/${idCancion}`);
}

function getCancionPorUsuario(token) {
  return axios.get(`${url}/usuario`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

function getCancionByAlbum(idAlbum) {
  return axios.get(`${url}/album/${idAlbum}`);
}

function getCancionByNombre(nombre) {
  return axios.get(`${url}/nombre/${nombre}`);
}

function addCancion(cancion) {
  return axios.post(`${url}`, cancion);
}

function editCancion(cancion) {
  return axios.put(url, cancion);
}

export {
  getCanciones,
  getCancionById,
  getCancionPorUsuario,
  getCancionByAlbum,
  getCancionByNombre,
  addCancion,
  editCancion
};
