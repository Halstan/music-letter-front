<template>
  <v-container class="mt-3">
    <h2>{{ title }}</h2>
    <v-container class="mt-3">
      <v-row>
        <v-col>
          <v-form ref="form">
            <v-text-field
              v-model="autor.nombres"
              type="text"
              label="Nombre del autor"
              :counter="$v.autor.nombres.$params.maxLength.max"
            ></v-text-field>

            <v-text-field
              v-model="autor.apellidos"
              type="text"
              label="Apellido del autor"
              :counter="$v.autor.apellidos.$params.maxLength.max"
            ></v-text-field>

            <v-text-field
              v-model="autor.urlFoto"
              type="text"
              label="Url de la foto"
              :counter="$v.autor.urlFoto.$params.maxLength.max"
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
                  v-model="autor.fechaNacimiento"
                  label="Fecha de nacimiento"
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="autor.fechaNacimiento"
                :max="max"
              ></v-date-picker>
            </v-menu>

            <v-text-field
              v-model="autor.alias"
              type="text"
              label="Alias del autor"
              :counter="$v.autor.alias.$params.maxLength.max"
            ></v-text-field>

            <v-textarea
              filled
              v-model="autor.biografia"
              label="Biografia"
              rows="4"
            ></v-textarea>

            <v-btn
              v-if="!this.$route.params.id"
              @click="register"
              type="submit"
              color="success"
              :disabled="this.$v.autor.$invalid"
              >Registrar</v-btn
            >
            <v-btn
              v-else
              @click="edit"
              type="submit"
              color="primary"
              :disabled="this.$v.autor.$invalid"
              >Editar</v-btn
            >
          </v-form>
        </v-col>
        <v-col>
          <picture>
            <img
              :src="autor.urlFoto"
              :alt="autor.nombre"
              width="420"
              height="315"
            />
          </picture>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import { required, minLength, maxLength } from "vuelidate/lib/validators";
import {
  addAutor,
  editAutor,
  getAutorById
} from "../../../service/autorService";

export default {
  name: "AutorForm",
  data() {
    return {
      title: "Registrar autor",
      max: new Date().toISOString().substr(0, 10),
      autor: {
        idAutor: 0 | null,
        nombres: "",
        apellidos: "",
        urlFoto: "",
        fechaNacimiento: Date(),
        alias: "",
        biografia: ""
      }
    };
  },
  validations: {
    autor: {
      nombres: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(40)
      },
      apellidos: {
        required,
        minLength: minLength(5),
        maxLength: maxLength(40)
      },
      urlFoto: {
        required,
        maxLength: maxLength(200)
      },
      fechaNacimiento: {
        required
      },
      alias: {
        required,
        maxLength: maxLength(40)
      },
      biografia: {
        maxLength: maxLength(300)
      }
    }
  },
  computed: {
    ...mapGetters(["getToken"])
  },
  created() {
    if (this.$route.params.id) {
      this.getAutorById();
    }
  },
  methods: {
    register: function(e) {
      e.preventDefault();
      delete this.autor.idAutor;

      addAutor(this.autor, this.getToken)
        .then(res => {
          this.$swal({
            title: "Registro exitoso",
            text: `${res.data.nombres} ${res.data.apellidos}`,
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
          this.$swal({
            title: "Error",
            text: err,
            icon: "error",
            toast: true,
            position: "bottom-right",
            timer: 4000,
            timerProgressBar: true
          });
        });
    },

    getAutorById() {
      getAutorById(this.$route.params.id, this.getToken)
        .then(res => {
          this.autor = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    edit: function(e) {
      e.preventDefault();

      editAutor(this.autor, this.getToken)
        .then(res => {
          this.$swal({
            title: "Actualización exitosa",
            text: `${res.data.nombres} ${res.data.apellidos}`,
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
          this.$swal({
            title: "Error",
            text: err,
            icon: "error",
            toast: true,
            position: "bottom-right",
            timer: 4000,
            timerProgressBar: true
          });
        });
    },
    alert() {
      this.$swal({
        title: "Registro exitoso",
        text: "this is a heading",
        icon: "success",
        toast: true,
        position: "bottom-right",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true
      });
    }
  }
};
</script>
