<template>
  <v-container>
    <v-form ref="form">
      <v-text-field
        v-model="idioma.nombre"
        label="Nombre del idioma"
        :counter="$v.idioma.nombre.$params.maxLength.max"
      ></v-text-field>
      <v-btn
        color="success"
        type="submit"
        @click="addIdioma"
        :disabled="$v.idioma.$invalid"
        >Registrar</v-btn
      >
    </v-form>
    <v-container class="mt-3">
      <v-simple-table dense>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-center">Id</th>
              <th class="text-center">Nombre</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(idioma, index) in idiomas" :key="index">
              <td>{{ idioma.idIdioma }}</td>
              <td>{{ idioma.nombre }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-container>
  </v-container>
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
