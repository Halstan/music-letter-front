<template>
  <div class="container">
    <h1>Canciones</h1>
    <div v-for="cancion in canciones" :key="cancion.idCancion">
      <b-card-group class="mt-2" deck>
        <b-card :title="cancion.nombre">
          <b-card-sub-title>
            Album: {{ cancion.album.nombre }}
          </b-card-sub-title>

          <b-card-body>
            <b-card-text>
              {{ cancion.letra }}
            </b-card-text>
          </b-card-body>
          <router-link
            :to="{
              name: 'AutorDetail',
              params: { id: cancion.album.autor.idAutor }
            }"
          >
            Ver autor
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
import { getCanciones } from "../../service/cancionService";

export default {
  name: "Cancion",
  data() {
    return {
      canciones: []
    };
  },
  created() {
    getCanciones()
      .then(data => {
        this.canciones = data.data;
        console.log(data.data);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
