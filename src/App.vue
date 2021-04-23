<template>
  <v-app>
    <navbar></navbar>
    <v-main>
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

/*#nav {
  padding: 5px;
}*/
</style>
