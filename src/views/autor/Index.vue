<template>
  <v-container class="mt-3">
    <h2>Autores</h2>
    <loading v-if="autores <= 0"> <p>No hay autores registrados</p> </loading>
    <div v-if="autores">
      <v-card v-for="autor in autores" :key="autor.idAutor" class="mt-2">
        <v-card-title class="text-center">
          {{ autor.nombres + " " + autor.apellidos }}
        </v-card-title>
        <v-card-subtitle> Alias: {{ autor.alias }} </v-card-subtitle>
        <v-btn
          color="secondary"
          class="mt-2 mb-3"
          :to="{ name: 'AlbumesAutor', params: { id: autor.idAutor } }"
          >Ver albumes</v-btn
        >
        <v-btn
          color="error"
          class="mt-2 ml-2 mb-3"
          :to="{ name: 'AutorFormEdit', params: { id: autor.idAutor } }"
          >Editar</v-btn
        >
        <v-divider></v-divider>
        <v-card-actions>
          <span class="text-center"
            >Fecha de nacimiento: {{ autor.fechaNacimiento }}</span
          >
        </v-card-actions>
      </v-card>
    </div>
  </v-container>
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
