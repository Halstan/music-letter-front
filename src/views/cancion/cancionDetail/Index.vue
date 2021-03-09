<template>
  <div>
    <loading v-if="!cancion"></loading>
    <div v-if="cancion" class="container mt-3">
      <h2>{{ cancion.nombre }}</h2>
      <p>
        Escrito por:
        {{ cancion.album.autor.nombres + " " + cancion.album.autor.apellidos }}
      </p>
      <p class="text-center">Género: {{ cancion.album.genero.nombre }}</p>
      <p class="text-center" style="white-space: pre-line">
        {{ cancion.letra }}
      </p>
      <p>Subido por: {{ cancion.usuario.nombreDeUsuario }}</p>
    </div>
  </div>
</template>

<script>
import Loading from "../../../components/Loading";
import { getCancionById } from "../../../service/cancionService";

export default {
  components: { Loading },
  name: "CancionDetail",
  data() {
    return {
      cancion: null
    };
  },
  created() {
    getCancionById(this.$route.params.id)
      .then(data => {
        this.cancion = data.data;
        console.log(data.data);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
