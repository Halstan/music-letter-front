<template>
  <b-container class="mt-3">
    <b-row>
      <b-col>
        <idioma-form></idioma-form>
      </b-col>
      <b-col>
        <genero-form></genero-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import GeneroForm from "./GeneroForm.vue";
import IdiomaForm from "./IdiomaForm.vue";

export default {
  components: { GeneroForm, IdiomaForm },
  name: "GeneroIdioma"
};
</script>
