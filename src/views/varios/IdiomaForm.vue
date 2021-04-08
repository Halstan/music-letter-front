<template>
  <b-container>
    <b-form ref="form">
      <b-form-group label="Nombre">
        <b-form-input
          v-model="idioma.nombre"
          placeholder="Nombre del idioma"
        ></b-form-input>
      </b-form-group>
      <b-button
        type="submit"
        variant="outline-primary"
        @click="addIdioma"
        :disabled="$v.idioma.$invalid"
        >Registrar</b-button
      >
    </b-form>
    <b-container class="mt-3">
      <b-table
        responsive
        small
        striped
        hover
        :items="idiomas"
        outlined
        primary-key="idIdioma"
      >
      </b-table>
    </b-container>
  </b-container>
</template>

<script>
import { addIdioma, getIdiomas } from "@/service/idiomaService";
import { required, maxLength } from "vuelidate/lib/validators";

export default {
  name: "IdiomaForm",
  data() {
    return {
      idioma: {
        idIdioma: 0,
        nombre: ""
      },
      idiomas: []
    };
  },
  created() {
    this.getIdiomas();
  },
  validations: {
    idioma: {
      nombre: {
        required,
        maxLength: maxLength(30)
      }
    }
  },
  methods: {
    addIdioma(e) {
      e.preventDefault();
      delete this.idioma.idIdioma;

      addIdioma(this.idioma)
        .then(res => {
          this.idiomas.push(res.data);
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.idioma = {};
        });
    },

    getIdiomas() {
      getIdiomas()
        .then(res => {
          this.idiomas = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
