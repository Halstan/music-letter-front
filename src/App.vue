<template>
  <v-app>
    <v-main>
      <navbar></navbar>
      <router-view :key="$route.fullPath" />
      <custom-footer></custom-footer>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
import CustomFooter from "./components/CustomFooter.vue";
import Navbar from "./components/Navbar.vue";

export default {
  components: { CustomFooter, Navbar },
  created() {
    this.cargarUsuario();
  },
  methods: {
    ...mapActions(["cargarUsuario"])
  }
};
</script>

<style>
#app {
  text-align: center;
  min-height: 100vh;
}
</style>
