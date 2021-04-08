<template>
  <div id="nav">
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="#">NavBar</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/">Home</b-nav-item>
          <b-nav-item to="/autores">Autores</b-nav-item>
          <b-nav-item to="/canciones">Canciones</b-nav-item>
          <b-nav-item to="/mis-canciones" v-if="usuarioAutenticado"
            >Mis canciones</b-nav-item
          >
          <b-nav-item :to="{ name: 'GeneroIdioma' }">Miscelaneo</b-nav-item>
          <b-nav-item :to="{ name: 'Albumes' }">Albumes</b-nav-item>
          <b-nav-item to="/about">About</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form @submit.prevent="search">
            <b-form-input
              v-model="nombre"
              size="sm"
              class="mr-sm-2"
              placeholder="Canción"
            ></b-form-input>
          </b-nav-form>

          <b-nav-item>
            <b-button
              size="sm"
              variant="outline-success"
              to="/login"
              v-if="!usuarioAutenticado"
            >
              Iniciar sesión
            </b-button>
          </b-nav-item>

          <b-nav-item-dropdown
            class="pt-1"
            :text="getUsername"
            right
            v-if="usuarioAutenticado"
          >
            <b-dropdown-item href="#">Perfil</b-dropdown-item>
            <b-dropdown-item @click="cerrarSesion"
              >Cerrar sesión</b-dropdown-item
            >
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Navbar",
  data() {
    return {
      nombre: ""
    };
  },
  computed: {
    ...mapGetters(["usuarioAutenticado", "getUsername"])
  },
  methods: {
    ...mapActions(["cerrarSesion"]),
    search: function() {
      this.$router.push({
        name: "CancionesNombre",
        params: { nombre: this.nombre }
      });
      this.nombre = "";
    }
  }
};
</script>

<style scoped>
#nav a.router-link-exact-active {
  color: #e69807;
}
</style>
