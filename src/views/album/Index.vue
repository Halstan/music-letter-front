<template>
  <v-container class="mt-3">
    <loading v-if="isLoad">
      <p>Cargando albumes...</p>
    </loading>
    <v-alert
      class="white--text"
      color="error"
      v-if="albumes.length <= 0 && $route.params.id"
    >
      Este autor no tiene albumes registrados
      <p>
        El autor que estas viendo, aún no tiene albumes registrados, ¿Que
        esperas?, ve y dale un album que el haya compuesto.
      </p>
    </v-alert>
    <v-alert color="error" class="white--text" v-if="albumes.length <= 0">
      <h4>Aún no hay albumes registrados</h4>
      <p>Aun no hay albumes registrados en la aplicación</p>
    </v-alert>
    <template v-if="albumes.length > 0">
      <h2 v-if="$route.params.id">
        Albumes de:
        {{ albumes[0].autor.nombres + " " + albumes[0].autor.apellidos }}
      </h2>
      <h2 v-else>Albumes</h2>

      <v-card class="mt-5" v-for="album in albumes" :key="album.idAlbum">
        <v-row>
          <v-col>
            <v-card-title class="text-center">
              {{ album.nombre }}
            </v-card-title>
            <v-card-subtitle>
              Género: {{ album.genero.nombre }}
            </v-card-subtitle>

            <div v-if="album.subGeneros.length > 0">
              <v-card-text>
                <p>Fecha de lanzamiento: {{ album.fechaLanzamiento }}</p>
                SubGéneros:
                <ol>
                  <li
                    class="text-left"
                    v-for="(subGenero, index) in album.subGeneros"
                    :key="subGenero.idGenero"
                  >
                    <v-badge
                      :color="getRandom(index + 1)"
                      :content="subGenero.nombre"
                    ></v-badge>
                  </li>
                </ol>
              </v-card-text>
            </div>
            <v-divider></v-divider>
            <v-btn
              small
              :to="{
                name: 'CancionesAlbumes',
                params: { id: album.idAlbum }
              }"
              >Ver canciones</v-btn
            >
            <v-btn
              small
              class="ml-2"
              :to="{ name: 'AlbumEditar', params: { id: album.idAlbum } }"
              >Editar</v-btn
            >
          </v-col>
          <v-col>
            <autor-component :autor="album.autor"></autor-component>
          </v-col>
        </v-row>
      </v-card>
    </template>
  </v-container>
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
      this.getAlbumesByAutor(this.$route.params.id);
    } else {
      this.getAlbumes();
    }
  },
  methods: {
    getAlbumesByAutor(id) {
      getAlbumesByAutor(id)
        .then(data => {
          this.albumes = data.data;
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
    },
    getRandom(number) {
      switch (number) {
        case 1:
          return "success";
        case 2:
          return "error";
        case 3:
          return "primary";
        case 4:
          return "accent";
        case 5:
          return "warning";
        case 6:
          return "info";
      }
    }
  }
};
</script>
