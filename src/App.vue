<template>
  <div id="app">
    <div id="nav">
      <b-navbar toggleable="md" type="dark" variant="secondary">
        <b-navbar-brand to="/">Music Letter</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <router-link class="nav-link" to="/">Home</router-link>
            <router-link class="nav-link" to="/autores">Autores</router-link>
            <router-link class="nav-link" to="/canciones"
              >Canciones</router-link
            >
            <router-link class="nav-link" to="/albumes">Albumes</router-link>
            <router-link class="nav-link" to="/about">About</router-link>
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-form @submit.prevent="search">
              <b-form-input
                v-model="nombre"
                size="sm"
                class="mr-sm-2"
                placeholder="Canción"
              ></b-form-input>
              <b-button size="sm" class="my-2 my-sm-0" type="submit"
                >Buscar</b-button
              >
              <b-nav-item right>
                <router-link class="nav-link" to="/login">
                  Iniciar sesión
                </router-link>
              </b-nav-item>
            </b-nav-form>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <router-view :key="$route.fullPath" />
    <custom-footer></custom-footer>
  </div>
</template>

<script>
import CustomFooter from "./components/CustomFooter.vue";

export default {
  components: { CustomFooter },
  data() {
    return {
      nombre: "",
    };
  },
  watch: {},
  methods: {
    search: function () {
      this.$router.push({
        name: "CancionesNombre",
        params: { nombre: this.nombre },
      });
      this.nombre = "";
    },
  },
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

#nav a.router-link-exact-active {
  color: #d8881f;
}

.invalid-feedback {
  width: 100px;
  margin-top: 0.25rem;
  font-size: 80%;
  color: #dc3545;
}
</style>
