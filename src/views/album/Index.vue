<template>
  <div class="container mt-3">
    <loading v-if="isLoad"></loading>
    <div
      class="alert alert-danger"
      v-if="albumes.length <= 0 && $route.params.id"
    >
      <h4 class="alert-heading">Este autor no tiene albumes registrados</h4>
      <p>
        El autor que estas viendo, aún no tiene albumes registrados, ¿Que
        esperas?, ve y dale un album que el haya compuesto.
      </p>
    </div>
    <div class="alert alert-danger" v-if="albumes.length <= 0">
      <h4 class="alert-heading">Aún no hay albumes registrados</h4>
      <p>Aun no hay albumes registrados en la aplicación</p>
    </div>
    <div v-if="albumes.length > 0">
      <h2 v-if="$route.params.id">
        Albumes de:
        {{ albumes[0].autor.nombres + " " + albumes[0].autor.apellidos }}
      </h2>
      <h2 v-else>Albumes</h2>
      <b-card-group class="mt-3" v-for="album in albumes" :key="album.idAlbum">
        <b-card :title="album.nombre">
          <div class="row">
            <div class="col">
              <b-card-sub-title>
                Género: {{ album.genero.nombre }}
              </b-card-sub-title>

              <b-card-body>
                <b-card-text>SubGéneros:</b-card-text>
                <ol>
                  <li
                    class="text-left"
                    v-for="subGenero in album.subGeneros"
                    :key="subGenero.idGenero"
                  >
                    {{ subGenero.nombre }}
                  </li>
                </ol>
                <router-link
                  class="btn btn-primary"
                  :to="{
                    name: 'CancionesAlbumes',
                    params: { id: album.idAlbum }
                  }"
                  >Ver canciones</router-link
                >
                <router-link
                  class="btn btn-secondary ml-2"
                  :to="{ name: 'AlbumEditar', params: { id: album.idAlbum } }"
                  >Editar</router-link
                >
              </b-card-body>
            </div>
            <div class="col">
              <autor-component :autor="album.autor"></autor-component>
            </div>
          </div>

          <template #footer>
            <span>Fecha de lanzamiento: {{ album.fechaLanzamiento }}</span>
          </template>
        </b-card>
      </b-card-group>
    </div>
  </div>
</template>

<script>
import Loading from "../../components/Loading.vue";
import AutorComponent from "./Autor";
import { getAlbumes, getAlbumesByAutor } from "../../service/albumService";

export default {
  components: { Loading, AutorComponent },
  name: "AlbumesAutor",
  data() {
    return {
      albumes: [],
      isLoad: true
    };
  },
  created() {
    if (this.$route.params.id) {
      this.getAlbumesByAutor();
    } else {
      this.getAlbumes();
    }
  },
  methods: {
    getAlbumesByAutor() {
      getAlbumesByAutor(this.$route.params.id)
        .then(data => {
          this.albumes = data.data;
          console.log(data.data);
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.isLoad = false;
        });
    },
    getAlbumes() {
      getAlbumes()
        .then(data => {
          this.albumes = data.data;
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.isLoad = false;
        });
    }
  }
};
</script>
