<template>
  <b-container>
    <b-card-group
      v-for="(cancion, index) in canciones"
      :key="cancion.idCancion"
      class="mt-3"
      deck
    >
      <b-card :title="cancion.nombre">
        <b-card-sub-title> Album: {{ cancion.album.nombre }} </b-card-sub-title>
        <b-badge v-if="cancion.isEditado">{{
          cancion.isEditado ? "Editado" : ""
        }}</b-badge>

        <b-card-body>
          <b-card-text>
            Autor:
            {{
              cancion.album.autor.nombres + " " + cancion.album.autor.apellidos
            }}
          </b-card-text>
        </b-card-body>
        <b-button v-b-modal="index.toString()">Ver autor</b-button>
        <b-modal
          :id="index.toString()"
          :title="
            cancion.album.autor.nombres + ' ' + cancion.album.autor.apellidos
          "
        >
          <p class="text-justify">
            Biografía: {{ cancion.album.autor.biografia }}
          </p>
        </b-modal>
        <b-button variant="primary" class="ml-2" v-b-modal="cancion.idCancion"
          >Ver completo</b-button
        >
        <b-modal :id="cancion.idCancion" :title="cancion.nombre">
          <b-container>
            <div v-if="cancion" class="container mt-3">
              <p>
                Escrito por:
                {{
                  cancion.album.autor.nombres +
                    " " +
                    cancion.album.autor.apellidos
                }}
              </p>
              <b-badge variant="success" class="text-center">
                Género: {{ cancion.album.genero.nombre }}
              </b-badge>
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
                      :src="addEmbed(cancion.urlVideo)"
                      width="420"
                      height="315"
                      frameborder="0"
                    ></iframe>
                  </b-col>
                </b-row>
              </b-container>

              <p>Subido por: {{ cancion.usuario.nombreDeUsuario }}</p>
              <p v-if="usuarioAutenticado">
                ¿No te gusta como quedó la letra de esta cancion?
                <router-link
                  class="link"
                  :to="{
                    name: 'CancionFormEdit',
                    params: { id: cancion.idCancion }
                  }"
                  >Cambiala</router-link
                >
              </p>
            </div>
          </b-container>
        </b-modal>

        <template #footer>
          <em>Fecha de lanzamiento: {{ cancion.fechaLanzamiento }}</em>
        </template>
      </b-card>
    </b-card-group>
  </b-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "CancionesComponent",
  props: {
    canciones: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapGetters(["usuarioAutenticado", "getToken"])
  },
  methods: {
    addEmbed(url) {
      if (url.includes("youtu.be")) {
        return url.replace("youtu.be", "youtube.com/embed");
      } else {
        return url.replace("watch?v=", "embed/");
      }
    }
  }
};
</script>

<style></style>
