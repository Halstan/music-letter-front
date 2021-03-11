<template>
  <div class="container mt-3">
    <h2 v-show="title != undefined">{{ title }}</h2>
    <loading v-if="isLoad"></loading>
    <div v-if="canciones">
      <b-card-group
        v-for="cancion in canciones"
        :key="cancion.idCancion"
        class="mt-3"
        deck
      >
        <b-card :title="cancion.nombre">
          <b-card-sub-title>
            Album: {{ cancion.album.nombre }}
          </b-card-sub-title>

          <b-card-body>
            <b-card-text>
              Autor:
              {{
                cancion.album.autor.nombres +
                " " +
                cancion.album.autor.apellidos
              }}
            </b-card-text>
          </b-card-body>
          <router-link
            class="btn btn-secondary"
            :to="{
              name: 'AutorDetail',
              params: { id: cancion.album.autor.idAutor },
            }"
          >
            Ver autor
          </router-link>
          <router-link
            class="btn btn-primary ml-2"
            :to="{
              name: 'CancionDetail',
              params: { id: cancion.idCancion },
            }"
          >
            Ver completo
          </router-link>

          <template #footer>
            <em>Fecha de lanzamiento: {{ cancion.fechaLanzamiento }}</em>
          </template>
        </b-card>
      </b-card-group>
    </div>
  </div>
</template>

<script>
import Loading from "../../components/Loading";
import {
  getCanciones,
  getCancionByAlbum,
  getCancionByNombre,
} from "../../service/cancionService";

export default {
  components: { Loading },
  name: "Canciones",
  data() {
    return {
      canciones: [],
      title: "Canciones",
      isLoad: true,
    };
  },
  mounted() {
    if (this.$route.params.id) {
      this.getCancionByAlbum();
    } else if (this.$route.params.nombre) {
      this.getCancionNombre();
    } else {
      this.getCanciones();
    }
  },
  methods: {
    getCancionAlbum() {
      getCancionByAlbum(this.$route.params.id)
        .then((data) => {
          this.canciones = data.data;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.title = "Canciones por album";
          this.isLoad = false;
        });
    },
    getCancionNombre() {
      getCancionByNombre(this.$route.params.nombre)
        .then((data) => {
          this.canciones = data.data;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.title = `Canciones que coincidan con ${this.$route.params.nombre}`;
          this.isLoad = false;
        });
    },
    getCanciones() {
      getCanciones()
        .then((data) => {
          this.canciones = data.data;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.isLoad = false;
        });
    },
  },
};
</script>
