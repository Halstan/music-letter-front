import axios from "axios";

const url = process.env.VUE_APP_URI + "/confirmar";

function confirmAccount(token) {
    return axios.get(`${url}/cuenta/${token}`)
}

export { confirmAccount }