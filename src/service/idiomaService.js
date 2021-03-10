import { get } from "axios";

const url = process.env.VUE_APP_URI + "/idiomas";

function getIdiomas() {
    return get(url)
}

export { getIdiomas }