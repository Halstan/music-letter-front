<template>
  <v-container class="mt-3">
    <h2>Géneros e Idiomas</h2>
    <v-row>
      <v-col>
        <idioma-form></idioma-form>
      </v-col>
      <v-col>
        <genero-form></genero-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import GeneroForm from "./GeneroForm.vue";
import IdiomaForm from "./IdiomaForm.vue";

export default {
  components: { GeneroForm, IdiomaForm },
  name: "GeneroIdioma"
};
</script>
