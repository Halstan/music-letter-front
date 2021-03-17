<template>
  <div id="nav">
    <b-navbar toggleable="md" type="dark" variant="secondary">
      <b-navbar-brand to="/">Music Letter</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <router-link class="nav-link" to="/">Home</router-link>
          <router-link class="nav-link" to="/autores">Autores</router-link>
          <router-link class="nav-link" to="/canciones">Canciones</router-link>
          <router-link class="nav-link" :to="{ name: 'GeneroIdioma' }"
            >Miscelaneo</router-link
          >
          <router-link class="nav-link" :to="{ name: 'Albumes' }"
            >Albumes</router-link
          >
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
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      nombre: ""
    };
  },
  methods: {
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
  color: #d8881f;
}
</style>
