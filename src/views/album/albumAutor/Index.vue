<template>
  <div class="container">
    <loading v-if="albumes.length <= 0"></loading>
    <div v-if="albumes.length > 0">
      <h2>
        Albumes de:
        {{ albumes[0].autor.nombres + " " + albumes[0].autor.apellidos }}
      </h2>
      <b-card-group class="mt-3" v-for="album in albumes" :key="album.idAlbum">
        <b-card :title="album.nombre">
          <b-card-sub-title>
            Género: {{ album.genero.nombre }}
          </b-card-sub-title>

          <b-card-body>
            <ol v-for="subGenero in album.subGeneros" :key="subGenero.idGenero">
              <li>{{ subGenero.nombre }}</li>
            </ol>
          </b-card-body>

          <template #footer>
            <span>Fecha de lanzamiento: {{ album.fechaLanzamiento }}</span>
          </template>
        </b-card>
      </b-card-group>
    </div>
  </div>
</template>

<script>
import Loading from "../../../components/Loading.vue";
import { getAlbumesByAutor } from "../../../service/abumService";

export default {
  components: { Loading },
  name: "AlbumesAutor",
  data() {
    return {
      albumes: []
    };
  },
  created() {
    getAlbumesByAutor(this.$route.params.id)
      .then(data => {
        this.albumes = data.data;
        console.log(data.data);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
