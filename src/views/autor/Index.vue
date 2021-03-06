<template>
  <div class="container">
    <h1>Autores</h1>
    <loading v-if="autores <= 0"></loading>
    <div v-if="autores">
      <b-card-group
        v-for="autor in autores"
        :key="autor.idAutor"
        class="mt-2"
        deck
      >
        <b-card :title="autor.nombres + ' ' + autor.apellidos">
          <b-card-sub-title> Alias: {{ autor.alias }} </b-card-sub-title>
          <router-link
            class="btn btn-secondary mt-2"
            :to="{ name: 'AlbumesAutor', params: { id: autor.idAutor } }"
            >Ver albumes</router-link
          >
          <template #footer>
            <em>Fecha de nacimiento: {{ autor.fechaNacimiento }}</em>
          </template>
        </b-card>
      </b-card-group>
    </div>
  </div>
</template>

<script>
import Loading from "../../components/Loading";
import { getAutores } from "../../service/autorService";

export default {
  components: { Loading },
  name: "Autores",
  data() {
    return {
      autores: []
    };
  },
  created() {
    getAutores()
      .then(data => {
        this.autores = data.data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
