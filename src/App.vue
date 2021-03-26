<template>
  <div id="app">
    <navbar></navbar>
    <router-view :key="$route.fullPath" />
    <custom-footer></custom-footer>
  </div>
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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
  min-height: 100vh;
  padding-bottom: 5rem;
}

/*#nav {
  padding: 5px;
}*/
</style>
