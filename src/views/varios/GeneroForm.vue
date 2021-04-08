<template>
  <b-container>
    <b-form ref="form">
      <b-form-group label="Nombre">
        <b-form-input
          v-model="genero.nombre"
          placeholder="Nombre del género"
        ></b-form-input>
        <b-form-invalid-feedback
          class="mt-2"
          variant="danger"
          :state="$v.genero.nombre.maxLength"
        >
          Debe tener como maximo
          {{ $v.genero.nombre.$params.maxLength.max }} caracteres
        </b-form-invalid-feedback>
      </b-form-group>

      <b-button
        type="submit"
        variant="outline-primary"
        @click="addGenero"
        :disabled="$v.genero.$invalid"
        >Registrar</b-button
      >
    </b-form>
    <b-container class="mt-3">
      <b-table-lite
        responsive
        small
        striped
        hover
        :items="generos"
        outlined
        primary-key="idGenero"
      ></b-table-lite>
    </b-container>
  </b-container>
</template>

<script>
import { addGenero, getGeneros } from "@/service/generoService";
import { required, maxLength } from "vuelidate/lib/validators";

export default {
  name: "GeneroForm",
  data() {
    return {
      genero: {
        idGenero: 0,
        nombre: ""
      },
      generos: []
    };
  },
  created() {
    this.getGeneros();
  },
  validations: {
    genero: {
      nombre: {
        required,
        maxLength: maxLength(30)
      }
    }
  },
  methods: {
    addGenero(e) {
      e.preventDefault();
      delete this.genero.idGenero;

      addGenero(this.genero)
        .then(res => {
          this.generos.push(res.data);
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.$refs.form.reset();
        });
    },
    getGeneros() {
      getGeneros()
        .then(res => {
          this.generos = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
