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

function addCancion(cancion, token) {
  return axios.post(`${url}`, cancion, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

/**
 * @function
 * @param {object} cancion - The cancion to send
 * @param {string} token - The token
 */
function editCancion(cancion, token) {
  return axios.put(url, cancion, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
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
