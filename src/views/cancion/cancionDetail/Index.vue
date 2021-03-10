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
      <b-container class="mt-4">
        <b-row>
          <b-col>
            <h3>Letra:</h3>
            <p class="text-center" style="white-space: pre-line">
              {{ cancion.letra }}
            </p>
          </b-col>
          <b-col>
            <iframe
              :src="addEmbed"
              width="420"
              height="315"
              frameborder="0"
            ></iframe>
          </b-col>
        </b-row>
      </b-container>

      <p>Subido por: {{ cancion.usuario.nombreDeUsuario }}</p>
      <p>
        ¿No te gusta como quedó la letra de esta cancion?
        <router-link
          class="link"
          :to="{ name: 'CancionFormEdit', params: { id: cancion.idCancion } }"
          >Cambiala</router-link
        >
      </p>
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
      cancion: null,
    };
  },
  created() {
    getCancionById(this.$route.params.id)
      .then((data) => {
        this.cancion = data.data;
        console.log(data.data);
        console.log("link", this.addEmbed);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  computed: {
    addEmbed: function () {
      if (this.cancion.urlVideo.includes("youtu.be")) {
        return this.cancion.urlVideo.replace("youtu.be", "youtube.com/embed");
      } else {
        return this.cancion.urlVideo.replace("watch?v=", "embed/");
      }
    },
  },
};
</script>
