<template>
  <b-container>
    <h2>Autor component</h2>
  </b-container>
</template>

<script>
import Autor from "../../models/autor.model";

export default {
  name: "AutorComponent",
  props: {
    autor: {
      required: true,
      type: Autor
    }
  }
};
</script>
