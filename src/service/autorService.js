import axios from "axios";

const url = process.env.VUE_APP_URI + "/autores";

function getAutores() {
  return axios.get(url);
}

function getAutorById(idAutor, token) {
  return axios.get(`${url}/${idAutor}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

function addAutor(autor, token) {
  return axios.post(`${url}`, autor, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

function editAutor(autor, token) {
  return axios.put(`${url}`, autor, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export { getAutores, getAutorById, addAutor, editAutor };
