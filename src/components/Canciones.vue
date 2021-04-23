<template>
  <v-container>
    <v-card
      class="mt-4"
      v-for="cancion in canciones"
      :key="cancion.idCancion"
      :title="cancion.nombre"
    >
      <v-card-title class="text-center"> {{ cancion.nombre }} </v-card-title>
      <v-card-subtitle> Album: {{ cancion.album.nombre }} </v-card-subtitle>
      <v-badge
        color="warning"
        v-if="cancion.isEditado"
        :content="cancion.isEditado ? 'Editado' : ''"
      ></v-badge>

      <v-card-text>
        Autor:
        {{ cancion.album.autor.nombres + " " + cancion.album.autor.apellidos }}
      </v-card-text>
      <v-divider></v-divider>
      <v-dialog width="500" transition="dialog-top-transition">
        <template v-slot:activator="{ on }">
          <v-btn color="red lighten-2" class="mb-3" v-on="on">Ver autor</v-btn>
        </template>
        <v-card>
          <v-card-title class="headline grey lighten-2">
            {{
              cancion.album.autor.nombres + " " + cancion.album.autor.apellidos
            }}
          </v-card-title>

          <v-card-text class="text-justify mt-3">
            Biografía: {{ cancion.album.autor.biografia }}
          </v-card-text>
        </v-card>
      </v-dialog>
      <!--<b-modal
        :id="index.toString()"
        :title="
          cancion.album.autor.nombres + ' ' + cancion.album.autor.apellidos
        "
      >
        <p class="text-justify">
          Biografía: {{ cancion.album.autor.biografia }}
        </p>
      </b-modal>-->
      <v-dialog width="500" transition="dialog-bottom-transition">
        <template v-slot:activator="{ on }">
          <v-btn dark class="ml-2 mb-3" v-on="on">Ver completo</v-btn>
        </template>
        <v-card>
          <v-card-title class="headline grey lighten-2">
            {{ cancion.nombre }}
          </v-card-title>
          <v-container>
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
              <v-container class="mt-4">
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
              </v-container>

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
          </v-container>
        </v-card>
      </v-dialog>

      <template #footer>
        <em>Fecha de lanzamiento: {{ cancion.fechaLanzamiento }}</em>
      </template>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "CancionesComponent",
  data() {
    return {};
  },
  props: {
    canciones: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapGetters(["usuarioAutenticado"])
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
