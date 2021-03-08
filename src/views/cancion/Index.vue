<template>
  <div class="container">
    <h1>Canciones</h1>
    <loading v-if="canciones.length == 0"></loading>
    <div v-if="canciones">
      <b-card-group
        v-for="cancion in canciones"
        :key="cancion.idCancion"
        class="mt-2"
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
              params: { id: cancion.album.autor.idAutor }
            }"
          >
            Ver autor
          </router-link>
          <router-link
            class="btn btn-primary ml-2"
            :to="{
              name: 'CancionDetail',
              params: { id: cancion.idCancion }
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
import { getCanciones } from "../../service/cancionService";
import { getCancionByAlbum } from "../../service/cancionService";

export default {
  components: { Loading },
  name: "Canciones",
  data() {
    return {
      canciones: []
    };
  },
  created() {
    if (this.$route.params.id) {
      getCancionByAlbum(this.$route.params.id)
        .then(data => {
          this.canciones = data.data;
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      getCanciones()
        .then(data => {
          this.canciones = data.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
