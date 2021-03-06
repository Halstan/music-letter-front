<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <cancion></cancion>
  </div>
</template>

<script>
// @ is an alias to /src
import Cancion from "./cancion/Index";

export default {
  name: "Home",
  components: {
    Cancion
  }
};
</script>
