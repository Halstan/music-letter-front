<template>
  <div class="container mt-3">
    <h2>{{ title }}</h2>
    <loading v-if="isLoading && $route.params.id"></loading>
    <b-container class="mt-3">
      <b-row>
        <b-col>
          <b-form ref="form" id="cancionForn">
            <b-form-group label="Nombre" label-for="input-nombre">
              <b-form-input
                id="input-nombre"
                v-model="cancion.nombre"
                type="text"
                placeholder="Ingrese nombre de la canción"
              ></b-form-input>
            </b-form-group>

            <b-form-group label="fechaLanzamiento">
              <b-form-datepicker
                v-model="cancion.fechaLanzamiento"
              ></b-form-datepicker>
            </b-form-group>

            <b-form-group label="Idioma">
              <b-form-select v-model="cancion.idioma.idIdioma">
                <b-form-select-option value="" disabled selected
                  >Elige un idioma</b-form-select-option
                >
                <b-form-select-option
                  v-for="idioma in idiomas"
                  v-bind:value="idioma.idIdioma"
                  :key="idioma.idIdioma"
                >
                  {{ idioma.nombre }}
                </b-form-select-option>
              </b-form-select>
            </b-form-group>

            <b-form-group label="Letra">
              <b-form-textarea
                v-model="cancion.letra"
                wrap="hard"
                rows="20"
              ></b-form-textarea>
            </b-form-group>

            <b-form-group label="Dirección del video">
              <b-form-input
                v-model="cancion.urlVideo"
                placeholder="Url del video"
              ></b-form-input>
            </b-form-group>

            <b-form-group label="Album">
              <b-form-select v-model="cancion.album.idAlbum">
                <b-form-select-option value="" disabled selected
                  >Elige un album</b-form-select-option
                >
                <b-form-select-option
                  v-for="album in albumes"
                  :key="album.idAlbum"
                  :value="album.idAlbum"
                >
                  {{ album.nombre }}
                </b-form-select-option>
              </b-form-select>
            </b-form-group>

            <b-form-group label="Usuario">
              <b-form-select v-model="cancion.usuario.idUsuario">
                <b-form-select-option value="" disabled selected
                  >Elige usuario</b-form-select-option
                >
                <b-form-select-option
                  v-for="usuario in usuarios"
                  :key="usuario.idUsuario"
                  :value="usuario.idUsuario"
                >
                  {{ usuario.nombres }} {{ usuario.apellidos }}
                </b-form-select-option>
              </b-form-select>
            </b-form-group>

            <b-button
              v-if="!this.$route.params.id"
              @click="register"
              type="submit"
              variant="outline-success"
              :disabled="$v.cancion.$invalid"
              >Registrar</b-button
            >
            <b-button
              v-else
              type="submit"
              @click="edit"
              variant="outline-primary"
              :disabled="$v.cancion.$invalid"
              >Editar</b-button
            >

            <!--<b-card class="mt-3" header="Form Data Result">
        <pre class="m-0">{{ cancion }}</pre>
      </b-card>-->
          </b-form>
        </b-col>
        <b-col>
          <h3>Video</h3>
          <iframe
            :src="addEmbed"
            width="420"
            height="315"
            frameborder="0"
          ></iframe>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import {
  addCancion,
  editCancion,
  getCancionById
} from "../../../service/cancionService";
import { getAlbumes } from "../../../service/abumService";
import { getIdiomas } from "../../../service/idiomaService";
import { getUsuarios } from "../../../service/usuarioService";
import Loading from "../../../components/Loading";
import { required, maxLength } from "vuelidate/lib/validators";

export default {
  components: { Loading },
  name: "CancionForm",
  data() {
    return {
      title: "Registrar cancion",
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
        },
        usuario: {
          idUsuario: 0,
          nombres: "",
          apellidos: ""
        }
      },
      albumes: [],
      usuarios: [],
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
      },
      usuario: {
        required
      }
    }
  },
  created() {
    if (this.$route.params.id) {
      getCancionById(this.$route.params.id)
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
    }
    this.getOpciones();
  },
  methods: {
    getOpciones() {
      Promise.all([getAlbumes(), getIdiomas(), getUsuarios()])
        .then(([albumes, idiomas, usuarios]) => {
          (this.albumes = albumes.data),
            (this.idiomas = idiomas.data),
            (this.usuarios = usuarios.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    register: function(e) {
      e.preventDefault();
      delete this.cancion.idCancion;

      addCancion(this.cancion)
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
        })
        .catch(err => {
          console.log(err);
        });
    },
    edit: function(e) {
      e.preventDefault();

      editCancion(this.cancion).then(res => {
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
      });
    }
  },
  computed: {
    addEmbed: function() {
      if (this.cancion.urlVideo.includes("youtu.be")) {
        return this.cancion.urlVideo.replace("youtu.be", "youtube.com/embed");
      } else {
        return this.cancion.urlVideo.replace("watch?v=", "embed/");
      }
    }
  }
};
</script>
