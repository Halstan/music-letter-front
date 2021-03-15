<template>
  <b-container class="mt-3">
    <b-container class="mt-3">
      <b-form ref="form">
        <b-form-group label="Nombre">
          <b-form-input
            placeholder="Ingrese nombre"
            v-model="album.nombre"
            type="text"
          >
          </b-form-input>
          <b-form-invalid-feedback
            class="mt-2"
            variant="danger"
            :state="$v.album.nombre.maxLength"
            >Debe tener como máximo 50 caracteres</b-form-invalid-feedback
          >
        </b-form-group>

        <b-form-group label="Autor">
          <b-form-select v-model="album.autor.idAutor">
            <b-form-select-option value="" disabled selected
              >Elige un autor</b-form-select-option
            >
            <b-form-select-option
              v-for="autor in autores"
              :key="autor.idAutor"
              :value="autor.idAutor"
            >
              {{ autor.nombres }} {{ autor.apellidos }}
            </b-form-select-option>
          </b-form-select>
          <b-form-invalid-feedback
            class="mt-2"
            variant="danger"
            :state="$v.album.autor.required"
            >Debe seleccionar un autor</b-form-invalid-feedback
          >
        </b-form-group>

        <b-form-group label="Género">
          <b-form-select v-model="album.genero.idGenero">
            <b-form-select-option value="" disabled aria-selected=""
              >Elige un genero</b-form-select-option
            >
            <b-form-select-option
              v-for="genero in generos"
              :key="genero.idGenero"
              :value="genero.idGenero"
            >
              {{ genero.nombre }}
            </b-form-select-option>
          </b-form-select>
          <b-form-invalid-feedback
            class="mt-2"
            variant="danger"
            :state="$v.album.genero.required"
            >Debe seleccionar un autor</b-form-invalid-feedback
          >
        </b-form-group>

        <b-form-group label="Subgéneros">
          <b-form-select multiple v-model="album.subGeneros">
            <b-form-select-option value="" disabled aria-selected=""
              >Elige un genero</b-form-select-option
            >
            <b-form-select-option
              v-for="genero in generos"
              :key="genero.idGenero"
              :value="genero"
            >
              {{ genero.nombre }}
            </b-form-select-option>
          </b-form-select>
        </b-form-group>

        <b-form-group label="Fecha de lanzamiento">
          <b-form-datepicker
            v-model="album.fechaLanzamiento"
          ></b-form-datepicker>

          <b-form-invalid-feedback
            class="mt-2"
            variant="danger"
            :state="$v.album.fechaLanzamiento.required"
            >Debe seleccionar un autor</b-form-invalid-feedback
          >
        </b-form-group>

        <b-button
          v-if="$route.params.id"
          @click="editAlbum"
          type="submit"
          variant="outline-success"
          :disabled="$v.album.$invalid"
          >Editar</b-button
        >

        <b-button
          v-else
          @click="addAlbum"
          type="submit"
          variant="outline-primary"
          :disabled="$v.album.$invalid"
          >Registrar</b-button
        >
      </b-form>
      <pre>
          {{ album }}
      </pre>
    </b-container>
  </b-container>
</template>

<script>
import { getAutores } from "@/service/autorService";
import { getGeneros } from "../../service/generoService";
import { addAlbum, editAlbum, getAlbum } from "../../service/albumService";
import { required, maxLength } from "vuelidate/lib/validators";

export default {
  name: "AlbumForm",
  data() {
    return {
      album: {
        idAlbum: 0,
        nombre: "",
        autor: {
          idAutor: 0,
          nombres: "",
          apellidos: "",
          alias: "",
        },
        genero: {
          idGenero: 0,
          nombre: "",
        },
        subGeneros: [],
        fechaLanzamiento: Date(),
      },
      autores: [],
      generos: [],
    };
  },
  validations: {
    album: {
      nombre: {
        required,
        maxLength: maxLength(50),
      },
      autor: {
        required,
      },
      genero: {
        required,
      },
      fechaLanzamiento: {
        required,
      },
    },
  },
  watch: {
    "album.nombre": function (val) {
      console.log(val.length);
    },
    "album.genero.idGenero": function (val) {
      console.log(val);
    },
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

      addAlbum(this.album)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.reset();
        });
    },
    getAlbumById() {
      getAlbum(this.$route.params.id)
        .then((res) => {
          this.album = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    reset() {
      this.$refs.form.reset();
    },
    editAlbum(e) {
      e.preventDefault();

      editAlbum(this.album)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
