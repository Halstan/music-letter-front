<template>
  <v-container>
    <h2>Login</h2>
    <v-divider></v-divider>
    <v-row>
      <v-col cols="5">
        <v-form ref="form">
          <p class="text-uppercase pull-center">Registrate</p>
          <v-text-field
            v-model="usuarioReg.nombres"
            label="Nombres"
            :counter="$v.usuarioReg.nombres.$params.maxLength.max"
          >
          </v-text-field>
          <v-alert
            dense
            outlined
            type="error"
            v-show="!$v.usuarioReg.nombres.required"
            >Campo requerido</v-alert
          >

          <v-text-field
            type="text"
            v-model="usuarioReg.apellidos"
            label="Apellidos"
            :counter="$v.usuarioReg.apellidos.$params.maxLength.max"
          ></v-text-field>

          <v-text-field
            type="text"
            v-model="usuarioReg.nombreDeUsuario"
            label="Nombre de usuario"
            :counter="$v.usuarioReg.nombreDeUsuario.$params.maxLength.max"
          ></v-text-field>
          <v-alert
            dense
            outlined
            type="error"
            v-show="!$v.usuarioReg.nombreDeUsuario.required"
            >Campo requerido</v-alert
          >

          <v-text-field
            type="email"
            v-model="usuarioReg.correo"
            label="Correo electronico"
            :counter="$v.usuarioReg.correo.$params.maxLength.max"
          ></v-text-field>
          <v-alert
            dense
            outlined
            type="error"
            v-show="!$v.usuarioReg.correo.required"
            >Campo requerido</v-alert
          >

          <v-text-field
            type="password"
            v-model="usuarioReg.contrasenha"
            label="Contraseña"
            :counter="$v.usuarioReg.contrasenha.$params.maxLength.max"
          ></v-text-field>
          <v-alert
            dense
            outlined
            type="error"
            v-show="!$v.usuarioReg.contrasenha.required"
            >Campo requerido</v-alert
          >
          <v-alert
            dense
            outlined
            type="error"
            v-show="!$v.usuarioReg.contrasenha.minLength"
            >Debe tener como mínimo
            {{ $v.usuarioReg.contrasenha.$params.minLength.min }}
            caracteres</v-alert
          >

          <v-text-field
            type="password"
            v-model="confirmPassword"
            label="Vuelve a introducir tu contraseña"
            :counter="$v.confirmPassword.$params.maxLength.max"
          ></v-text-field>
          <v-alert
            dense
            outlined
            type="error"
            v-show="!$v.confirmPassword.required"
            >Campo requerido</v-alert
          >
          <v-alert
            dense
            outlined
            type="error"
            v-show="!$v.confirmPassword.minLength"
            >Debe tener como mínimo
            {{ $v.confirmPassword.$params.minLength.min }}
            caracteres</v-alert
          >
          <v-alert dense outlined type="error" v-show="isInValid()"
            >Las contraseña no coinciden</v-alert
          >

          <v-btn
            color="primary"
            @click="register"
            :disabled="$v.usuarioReg.$invalid || !isInValid()"
            >Registrarme</v-btn
          >
        </v-form>
      </v-col>

      <v-col cols="2">
        <!-------null------>
      </v-col>

      <v-col cols="5">
        <v-form role="form">
          <p class="text-uppercase">Ingresa usando tu cuenta</p>

          <v-text-field
            type="text"
            name="username"
            v-model="usuario.username"
            :counter="$v.usuario.username.$params.maxLength.max"
            label="Nombre de usuario"
          ></v-text-field>

          <v-text-field
            type="password"
            name="password"
            v-model="usuario.password"
            label="Contraseña"
          ></v-text-field>
          <div>
            <v-btn
              :disabled="$v.usuario.$invalid"
              @click="iniciarSesion"
              type="submit"
              color="accent"
              >Ingresar</v-btn
            >
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { register } from "../../service/usuarioService";
import { required, minLength, maxLength } from "vuelidate/lib/validators";
import { mapActions, mapState } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      usuario: {
        username: "",
        password: ""
      },
      usuarioReg: {
        nombres: "",
        apellidos: "",
        nombreDeUsuario: "",
        correo: "",
        contrasenha: ""
      },
      confirmPassword: "",
      isLoading: true
    };
  },
  validations: {
    usuario: {
      username: {
        required,
        maxLength: maxLength(50)
      },
      password: {
        required,
        minLength: minLength(6)
      }
    },
    usuarioReg: {
      nombres: {
        required,
        maxLength: maxLength(30)
      },
      apellidos: {
        maxLength: maxLength(50)
      },
      nombreDeUsuario: {
        required,
        maxLength: maxLength(50)
      },
      correo: {
        required,
        maxLength: maxLength(50)
      },
      contrasenha: {
        required,
        minLength: minLength(8),
        maxLength: maxLength(15)
      }
    },
    confirmPassword: {
      required,
      minLength: minLength(8),
      maxLength: maxLength(15)
    }
  },
  computed: {
    ...mapState(["isError"])
  },
  methods: {
    reset() {
      this.$refs.form.reset();
    },
    ...mapActions(["login"]),
    iniciarSesion(e) {
      e.preventDefault();

      if (!this.$v.usuario.$invalid) {
        this.login(this.usuario);
        if (!this.isError) {
          this.$swal({
            title: `Bienvenido`,
            text: `Inicio de sesión exitoso`,
            icon: "success",
            showConfirmButton: false,
            position: "bottom-right",
            toast: true,
            timer: 2000,
            timerProgressBar: true
          });
        } else {
          this.$swal({
            title: `Error`,
            text: `Credenciales incorrectas`,
            icon: "error",
            showConfirmButton: false,
            position: "bottom-right",
            toast: true,
            timer: 2000,
            timerProgressBar: true
          });
        }
      }
    },

    register(e) {
      e.preventDefault();

      if (
        !this.$v.usuarioReg.$invalid &&
        !this.$v.confirmPassword.$invalid &&
        !this.isInValid()
      )
        register(this.usuarioReg)
          .then(res => {
            this.$swal({
              title: `Bienvenido ${res.data.nombres} ${res.data.apellidos}`,
              text: `Se envio un correo a ${res.data.correo}`,
              icon: "success",
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true
            });
          })
          .catch(err => {
            console.log(err);
          });
    },

    isInValid() {
      if (this.usuarioReg.contrasenha !== this.confirmPassword) {
        return true;
      } else return false;
    }
  }
};
</script>

<style scoped>
.container-fluid {
  padding: 50px;
}
.container {
  background-color: white;
  padding: 50px;
}
#title {
  font-family: "Lobster", cursive;
}
</style>
