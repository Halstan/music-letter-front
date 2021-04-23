<template>
  <v-container class="mt-3">
    <h2>{{ title }}</h2>
    <v-container class="mt-3">
      <v-form ref="form">
        <v-text-field
          label="Ingrese nombre"
          v-model="album.nombre"
          type="text"
          :counter="$v.album.nombre.$params.maxLength.max"
        >
        </v-text-field>

        <v-select
          v-model="album.autor.idAutor"
          label="Autor"
          :items="autores"
          item-text="nombres"
          item-value="idAutor"
        >
        </v-select>
        <v-alert
          class="mt-2"
          outlined
          dense
          color="error"
          v-show="!$v.album.autor.required"
          >Debe seleccionar un autor</v-alert
        >

        <v-select
          v-model="album.genero.idGenero"
          label="Género"
          :items="generos"
          item-text="nombre"
          item-value="idGenero"
        >
        </v-select>
        <v-alert
          class="mt-2"
          outlined
          dense
          color="error"
          v-show="!$v.album.genero.required"
          >Debe seleccionar un autor</v-alert
        >

        <v-select
          label="Subgéneros"
          multiple
          outlined
          v-model="album.subGeneros"
          :items="generos"
          item-text="nombre"
          item-value="idGenero"
        >
        </v-select>

        <v-menu
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="album.fechaLanzamiento"
              label="Fecha de lanzamiento"
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="album.fechaLanzamiento"
            :max="max"
          ></v-date-picker>
        </v-menu>

        <v-alert
          class="mt-2"
          outlined
          dense
          color="error"
          v-show="!$v.album.fechaLanzamiento.required"
          >Debe seleccionar un autor</v-alert
        >

        <v-btn
          v-if="$route.params.id"
          @click="editAlbum"
          type="submit"
          color="success"
          :disabled="$v.album.$invalid"
          >Editar</v-btn
        >

        <v-btn
          v-else
          @click="addAlbum"
          type="submit"
          color="primary"
          :disabled="$v.album.$invalid"
          >Registrar</v-btn
        >
      </v-form>
    </v-container>
  </v-container>
</template>

<script>
import { getAutores } from "@/service/autorService";
import { getGeneros } from "../../service/generoService";
import { addAlbum, editAlbum, getAlbum } from "../../service/albumService";
import { required, maxLength } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";

export default {
  name: "AlbumForm",
  data() {
    return {
      title: "Registrar album",
      max: new Date().toISOString().substr(0, 10),
      album: {
        idAlbum: 0,
        nombre: "",
        autor: {
          idAutor: 0,
          nombres: "",
          apellidos: "",
          alias: ""
        },
        genero: {
          idGenero: 0,
          nombre: ""
        },
        subGeneros: [],
        fechaLanzamiento: Date()
      },
      autores: [],
      generos: []
    };
  },
  validations: {
    album: {
      nombre: {
        required,
        maxLength: maxLength(50)
      },
      autor: {
        required
      },
      genero: {
        required
      },
      fechaLanzamiento: {
        required
      }
    }
  },
  computed: {
    ...mapGetters(["getToken"])
  },
  watch: {
    "album.nombre": function(val) {
      console.log(val.length);
    },
    "album.genero.idGenero": function(val) {
      console.log(val);
    }
  },
  created() {
    if (this.$route.params.id) {
      this.getAlbumById();
    }
    this.getOpciones();
  },
  methods: {
    getOpciones() {
      Promise.all([getGeneros(), getAutores()]).then(([generos, autores]) => {
        this.generos = generos.data;
        this.autores = autores.data;
      });
    },
    addAlbum(e) {
      e.preventDefault();
      delete this.album.idAlbum;

      addAlbum(this.album, this.getToken)
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
        })
        .finally(() => {
          this.reset();
        });
    },
    getAlbumById() {
      getAlbum(this.$route.params.id, this.getToken)
        .then(res => {
          this.album = res.data;
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.title = "Editar cancion";
        });
    },
    reset() {
      this.$refs.form.reset();
    },
    editAlbum(e) {
      e.preventDefault();

      editAlbum(this.album, this.getToken)
        .then(res => {
          this.$swal({
            title: "Modificacion exitosa",
            text: `${res.data.nombre}`,
            icon: "success",
            toast: true,
            position: "bottom-right",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true
          });
          this.$router.push({ name: "Autores" });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
