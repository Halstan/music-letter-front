<template>
  <div>
    <v-card-subtitle
      >Autor: {{ autor.nombres }} {{ autor.apellidos }}</v-card-subtitle
    >
    <v-img
      :src="autor.urlFoto"
      :alt="autor.nombres"
      width="175"
      height="175"
    ></v-img>
  </div>
</template>

<script>
export default {
  name: "AutorComponent",
  props: {
    autor: {
      required: false,
      type: Object
    }
  }
};
</script>
