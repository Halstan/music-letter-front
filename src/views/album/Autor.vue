<template>
  <div>
    <b-card-sub-title
      >Autor: {{ autor.nombres }} {{ autor.apellidos }}</b-card-sub-title
    >
    <b-card-body>
      <b-img-lazy
        :src="autor.urlFoto"
        :alt="autor.nombres"
        fluid
        rounded
        v-bind="mainProps"
      ></b-img-lazy>
    </b-card-body>
  </div>
</template>

<script>
export default {
  name: "AutorComponent",
  props: {
    autor: {
      required: false,
      type: Object,
    },
  },
  data() {
    return {
      mainProps: {
        width: 175,
        height: 175,
      },
    };
  },
};
</script>
