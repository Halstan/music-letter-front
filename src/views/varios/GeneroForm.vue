<template>
  <v-container>
    <v-form ref="form">
      <v-text-field
        v-model="genero.nombre"
        label="Nombre del género"
        :counter="$v.genero.nombre.$params.maxLength.max"
      ></v-text-field>

      <v-btn
        color="success"
        type="submit"
        @click="addGenero"
        :disabled="$v.genero.$invalid"
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
            <tr v-for="(genero, index) in generos" :key="index">
              <td>{{ genero.idGenero }}</td>
              <td>{{ genero.nombre }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-container>
  </v-container>
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
