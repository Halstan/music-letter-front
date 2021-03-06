<template>
  <div class="container">
    <loading v-if="!autor"></loading>
    <div v-if="autor">
      <h2>{{ autor.nombres + " " + autor.apellidos }}</h2>
      <p class="text-justify">Bigrafia: {{ autor.biografia }}</p>
    </div>
  </div>
</template>

<script>
import Loading from "../../../components/Loading.vue";
import { getAutorById } from "../../../service/autorService";

export default {
  components: { Loading },
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
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
