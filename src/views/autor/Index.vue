<template>
  <div class="container">
    <h1>Autores</h1>
    <div v-for="autor in autores" :key="autor.idAutor">
      <b-card-group class="mt-2" deck>
        <b-card :title="autor.nombres + ' ' + autor.apellidos">
          <b-card-sub-title> Alias: {{ autor.alias }} </b-card-sub-title>
          <template #footer>
            <em>Fecha de nacimiento: {{ autor.fechaNacimiento }}</em>
          </template>
        </b-card>
      </b-card-group>
    </div>
  </div>
</template>

<script>
import { getAutores } from "../../service/autorService";

export default {
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
        console.log(data.data);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
