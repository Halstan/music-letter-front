<template>
  <b-container class="mt-3">
    <h2>Mis canciones</h2>
    <loading v-if="isLoad"></loading>
    <div v-if="canciones">
      <canciones :canciones="canciones"></canciones>
    </div>
  </b-container>
</template>

<script>
import { getCancionPorUsuario } from "@/service/cancionService";
import { mapGetters } from "vuex";
import Loading from "@/components/Loading.vue";
import Canciones from "@/components/Canciones.vue";

export default {
  components: { Loading, Canciones },
  name: "MisCanciones",
  data() {
    return {
      canciones: [],
      isLoad: true
    };
  },
  computed: {
    ...mapGetters(["getToken"])
  },
  created() {
    this.getCancionUsuario(this.getToken);
  },
  methods: {
    getCancionUsuario(token) {
      getCancionPorUsuario(token)
        .then(data => {
          this.canciones = data.data;
        })
        .catch(err => {
          console.error(err);
        })
        .finally(() => {
          this.isLoad = false;
        });
    }
  }
};
</script>

<style></style>
