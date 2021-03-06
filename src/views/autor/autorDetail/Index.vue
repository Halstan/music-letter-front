<template>
  <div v-if="autor" class="container">
    <h2>{{ autor.nombres + " " + autor.apellidos }}</h2>
    <p class="text-justify">Bigrafia: {{ autor.biografia }}</p>
  </div>
</template>

<script>
import { getAutorById } from "../../../service/autorService";

export default {
  name: "AutorDetail",
  data() {
    return {
      autor: null
    };
  },
  created() {
    getAutorById(this.$route.params.id)
      .then(data => {
        this.autor = data.data;
        console.log(data.data);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
