<template>
  <v-container class="mt-3">
    <h2>{{ title }}</h2>
    <loading v-if="isLoading && $route.params.id"></loading>
    <v-container class="mt-3">
      <v-row>
        <v-col>
          <v-form ref="form">
            <v-text-field
              v-model="cancion.nombre"
              type="text"
              label="Nombre de la canción"
              :counter="$v.cancion.nombre.$params.maxLength.max"
            ></v-text-field>

            <v-menu
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="cancion.fechaLanzamiento"
                  label="Fecha de lanzamiento"
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="cancion.fechaLanzamiento"
                :max="max"
              ></v-date-picker>
            </v-menu>

            <v-select
              label="Idioma"
              v-model="cancion.idioma.idIdioma"
              :items="idiomas"
              item-value="idIdioma"
              item-text="nombre"
            >
            </v-select>

            <v-textarea
              filled
              v-model="cancion.letra"
              label="Letra"
              rows="20"
            ></v-textarea>

            <v-text-field
              v-model="cancion.urlVideo"
              label="Url del video"
              :counter="$v.cancion.urlVideo.$params.maxLength.max"
            ></v-text-field>

            <v-select
              v-model="cancion.album.idAlbum"
              :items="albumes"
              item-value="idAlbum"
              item-text="nombre"
            >
            </v-select>

            <v-btn
              v-if="!this.$route.params.id"
              @click="register"
              type="submit"
              color="success"
              :disabled="$v.cancion.$invalid"
              >Registrar</v-btn
            >
            <v-btn
              v-else
              type="submit"
              @click="edit"
              color="primary"
              :disabled="$v.cancion.$invalid"
              >Editar</v-btn
            >
          </v-form>
        </v-col>
        <v-col>
          <h3>Video</h3>
          <iframe
            :src="addEmbed"
            width="420"
            height="315"
            frameborder="0"
          ></iframe>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import {
  addCancion,
  editCancion,
  getCancionById
} from "../../../service/cancionService";
import { getAlbumes } from "../../../service/albumService";
import { getIdiomas } from "../../../service/idiomaService";
import { getUsuarios } from "../../../service/usuarioService";
import Loading from "../../../components/Loading";
import { required, maxLength } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";

export default {
  components: { Loading },
  name: "CancionForm",
  data() {
    return {
      title: "Registrar cancion",
      max: new Date().toISOString().substr(0, 10),
      cancion: {
        idCancion: "" | null,
        nombre: "",
        fechaLanzamiento: Date(),
        idioma: {
          idIdioma: 0,
          nombre: ""
        },
        letra: "",
        urlVideo: "",
        estadoCancion: 0,
        album: {
          idAlbum: 0,
          nombre: ""
        }
      },
      albumes: [],
      idiomas: [],
      isLoading: true
    };
  },
  validations: {
    cancion: {
      nombre: {
        required,
        maxLength: maxLength(40)
      },
      fechaLanzamiento: {
        required
      },
      idioma: {
        required
      },
      letra: {
        required,
        maxLength: maxLength(5000)
      },
      urlVideo: {
        required,
        maxLength: maxLength(200)
      },
      estadoCancion: 0,
      album: {
        required
      }
    }
  },
  computed: {
    ...mapGetters(["getToken"]),
    addEmbed: function() {
      if (this.cancion.urlVideo.includes("youtu.be")) {
        return this.cancion.urlVideo.replace("youtu.be", "youtube.com/embed");
      } else {
        return this.cancion.urlVideo.replace("watch?v=", "embed/");
      }
    }
  },
  created() {
    if (this.$route.params.id) {
      this.getCancionId(this.$route.params.id);
    }
    this.getOpciones();
  },
  methods: {
    getOpciones() {
      Promise.all([getAlbumes(), getIdiomas(), getUsuarios()])
        .then(([albumes, idiomas, usuarios]) => {
          this.albumes = albumes.data;
          this.idiomas = idiomas.data;
          this.usuarios = usuarios.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getCancionId(id) {
      getCancionById(id, this.getToken)
        .then(res => {
          this.cancion = res.data;
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.title = "Editar cancion";
          this.isLoading = false;
        });
    },
    register: function(e) {
      e.preventDefault();
      delete this.cancion.idCancion;

      addCancion(this.cancion, this.getToken)
        .then(res => {
          this.$swal({
            title: "Registro exitoso",
            text: `${res.data.nombre}`,
            icon: "success",
            toast: true,
            position: "bottom-right",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true
          });
          this.$router.push({ name: "MisCanciones" });
        })
        .catch(err => {
          console.log(err);
        });
    },
    edit: function(e) {
      e.preventDefault();

      editCancion(this.cancion, this.getToken)
        .then(res => {
          this.$swal({
            title: "Actualización exitosa",
            text: `${res.data.nombre}`,
            icon: "success",
            toast: true,
            position: "bottom-right",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true
          });
          this.$router.push({ name: "MisCanciones" });
        })
        .catch(err => {
          this.$swal({
            title: err.response.data.exception,
            text: err.response.data.message,
            icon: "error",
            timer: 2000,
            showConfirmButton: true,
            timerProgressBar: true
          });
        });
    }
  }
};
</script>
