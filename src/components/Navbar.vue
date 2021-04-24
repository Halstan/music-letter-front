<template>
  <nav>
    <v-app-bar app color="secondary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <div class="d-flex align-center">
        <router-link :to="{ name: 'Home' }">
          <span class="white--text">ListenMe</span>
        </router-link>
      </div>
      <v-spacer></v-spacer>
      <v-form class="pt-4 pr-4" @submit.prevent="search">
        <v-text-field placeholder="Canción" v-model="nombre"></v-text-field>
      </v-form>
      <v-btn v-if="usuarioAutenticado" @click="cerrarSesion">
        <span class="mr-2">Cerrar sesión</span>
        <v-icon>fas fa-address-book</v-icon>
      </v-btn>
      <v-btn to="/login" v-else>
        <span class="mr-2">Iniciar sesión</span>
        <v-icon>fas fa-sign-in-alt</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer class="indigo" temporary v-model="drawer" absolute app>
      <v-row v-if="usuarioAutenticado" class="mt-5 text-center">
        <v-col>
          <v-icon class="white--text">fas fa-user-circle</v-icon>
          <h1 class="text-capitalize white--text">{{ getUsername }}</h1>
        </v-col>
      </v-row>
      <v-list>
        <v-list-item-group>
          <v-list-item to="/">
            <v-list-item-icon>
              <v-icon class="white--text"> fas fa-home </v-icon>
            </v-list-item-icon>
            <v-list-item-title class="white--text">
              Home
            </v-list-item-title>
          </v-list-item>

          <v-list-item to="/autores">
            <v-list-item-icon>
              <v-icon class="white--text"> fas fa-headphones </v-icon>
            </v-list-item-icon>
            <v-list-item-title class="white--text">
              Autores
            </v-list-item-title>
          </v-list-item>

          <v-list-item to="/canciones">
            <v-list-item-icon>
              <v-icon class="white--text"> fas fa-music </v-icon>
            </v-list-item-icon>
            <v-list-item-title class="white--text">
              Canciones
            </v-list-item-title>
          </v-list-item>

          <v-list-item to="/mis-canciones" v-if="usuarioAutenticado">
            <v-list-item-icon>
              <v-icon class="white--text"> fas fa-music </v-icon>
              <v-icon class="white--text"> fas fa-user </v-icon>
            </v-list-item-icon>
            <v-list-item-title class="white--text">
              Mis canciones
            </v-list-item-title>
          </v-list-item>

          <v-list-item :to="{ name: 'GeneroIdioma' }">
            <v-list-item-icon>
              <v-icon class="white--text"> fas fa-tags </v-icon>
            </v-list-item-icon>
            <v-list-item-title class="white--text">
              Miscelaneo
            </v-list-item-title>
          </v-list-item>

          <v-list-item :to="{ name: 'Albumes' }">
            <v-list-item-icon>
              <v-icon class="white--text"> fas fa-compact-disc </v-icon>
            </v-list-item-icon>
            <v-list-item-title class="white--text">
              Albumes
            </v-list-item-title>
          </v-list-item>

          <v-list-item to="/about">
            <v-list-item-icon>
              <v-icon class="white--text"> far fa-address-card </v-icon>
            </v-list-item-icon>
            <v-list-item-title class="white--text">
              About
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Navbar",
  data() {
    return {
      nombre: "",
      drawer: false
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
