<template>
  <div class="container mt-3">
    <h2 v-show="title != undefined">{{ title }}</h2>
    <loading v-if="isLoad"></loading>
    <div v-if="canciones">
      <canciones :canciones="canciones"></canciones>
    </div>
  </div>
</template>

<script>
import Loading from "../../components/Loading";
import {
  getCanciones,
  getCancionByAlbum,
  getCancionByNombre
} from "../../service/cancionService";
import Canciones from "@/components/Canciones.vue";

export default {
  components: { Loading, Canciones },
  name: "CancionesMain",
  data() {
    return {
      canciones: [],
      title: "Canciones",
      isLoad: true
    };
  },
  mounted() {
    if (this.$route.params.id) {
      this.getCancionAlbum();
    } else if (this.$route.params.nombre) {
      this.getCancionNombre();
    } else {
      this.getCanciones();
    }
  },
  methods: {
    getCancionAlbum() {
      getCancionByAlbum(this.$route.params.id)
        .then(data => {
          this.canciones = data.data;
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.title = "Canciones por album";
          this.isLoad = false;
        });
    },
    getCancionNombre() {
      getCancionByNombre(this.$route.params.nombre)
        .then(data => {
          this.canciones = data.data;
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.title = `Canciones que coincidan con ${this.$route.params.nombre}`;
          this.isLoad = false;
        });
    },
    getCanciones() {
      getCanciones()
        .then(data => {
          this.canciones = data.data;
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.isLoad = false;
        });
    }
  }
};
</script>
