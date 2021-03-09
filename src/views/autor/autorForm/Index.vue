<template>
  <div class="container mt-3">
    <h2>Formulario de autor</h2>
    <b-form ref="form" id="AutorForm" @submit="register">
      <b-form-group
        id="input-nombres-1"
        label="Nombres"
        label-for="input-nombres"
      >
        <b-form-input
          id="input-nombres"
          v-model="autor.nombres"
          type="text"
          placeholder="Ingresa el nombre del autor"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-apellidos-1"
        label="Apellidos"
        label-for="input-apellidos"
      >
        <b-form-input
          id="input-apellidos"
          v-model="autor.apellidos"
          type="text"
          placeholder="Ingresa el apellido del autor"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-fechaNacimiento"
        label="Fecha de nacimiento"
        label-for="date-fecha"
      >
        <b-form-datepicker
          id="date-fecha"
          v-model="autor.fechaNacimiento"
        ></b-form-datepicker>
      </b-form-group>

      <b-form-group id="input-alias-1" label="Alias" label-for="input-alias">
        <b-form-input
          id="input-alias"
          v-model="autor.alias"
          type="text"
          placeholder="Ingresa el Alias del autor"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-nombres-1"
        label="Biografía"
        label-for="input-nombres"
      >
        <b-form-textarea
          id="input-bigrafia"
          v-model="autor.biografia"
        ></b-form-textarea>
      </b-form-group>

      <b-button type="submit" variant="success">Registrar</b-button>
    </b-form>
    <!--<b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ autor }}</pre>
    </b-card>-->
    <b-card>
      <pre :data="$v.autor.nombres"></pre>
    </b-card>
  </div>
</template>

<script>
import { required, minLength, maxLength } from "vuelidate/lib/validators";
import { addAutor } from "../../../service/autorService";

export default {
  name: "AutorForm",
  data() {
    return {
      autor: {
        idAutor: 0 | null,
        nombres: "",
        apellidos: "",
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
        minLength: minLength(4),
        maxLength: minLength(40)
      },
      apellidos: {
        required,
        minLength: minLength(5),
        maxLength: minLength(40)
      },
      fechaNacimiento: {
        required
      },
      alias: {
        required,
        maxLength: maxLength(40)
      },
      biografia: {
        maxLength: minLength(300)
      }
    }
  },
  methods: {
    register: function(e) {
      e.preventDefault();
      delete this.autor.idAutor;

      addAutor(this.autor)
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
