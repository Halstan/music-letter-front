<template>
  <b-container>
    <h2>Form idioma</h2>
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
  </b-container>
</template>

<script>
import { addIdioma } from "@/service/idiomaService";
import { required, maxLength } from "vuelidate/lib/validators";

export default {
  name: "IdiomaForm",
  data() {
    return {
      idioma: {
        idIdioma: 0,
        nombre: ""
      }
    };
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
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.$refs.form.reset();
        });
    }
  }
};
</script>
