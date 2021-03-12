<template>
  <b-container>
    <h2>Login</h2>
    <hr />
    <div class="row">
      <div class="col-md-5">
        <b-form ref="form">
          <fieldset>
            <p class="text-uppercase pull-center">Registrate</p>
            <b-form-group label="Nombres">
              <b-form-input
                type="text"
                name="nombres"
                v-model="usuarioReg.nombres"
                placeholder="Nombres"
              />
            </b-form-group>

            <b-form-group label="Apellidos">
              <b-form-input
                type="text"
                name="apellidos"
                v-model="usuarioReg.apellidos"
                placeholder="Apellidos"
              />
            </b-form-group>

            <b-form-group label="Nombre de usuario">
              <b-form-input
                type="text"
                name="username"
                v-model="usuarioReg.nombreDeUsuario"
                placeholder="Nombre de usuario"
              />
            </b-form-group>

            <b-form-group label="Correo">
              <b-form-input
                type="email"
                name="email"
                v-model="usuarioReg.correo"
                placeholder="Correo electronico"
              />
            </b-form-group>

            <b-form-group label="Contraseña">
              <b-form-input
                type="password"
                name="password"
                v-model="usuarioReg.contrasenha"
                id="password"
                placeholder="Contraseña"
              />
            </b-form-group>
            <b-form-group label="Confirma tu contraseña">
              <b-form-input
                type="password"
                name="password2"
                v-model="confirmPassword"
                id="password2"
                placeholder="Vuelve a introducir tu contraseña"
              />
              <b-alert
                variant="danger"
                class="mt-2"
                @keyup="$v.confirmPassword.$touch"
                :show="isValid()"
                >Las contraseña no coinciden</b-alert
              >
            </b-form-group>
            <b-form-group label="">
              <label class="form-check-label">
                <b-form-checkbox type="checkbox" />
                Haciendo clic en registrar estas deacuerdo con nuestra politica
                de privacidad
              </label>
            </b-form-group>
            <div>
              <b-button
                variant="primary"
                @click="register"
                :disabled="$v.usuarioReg.$invalid"
                >Registrarme</b-button
              >
            </div>
          </fieldset>
        </b-form>
      </div>

      <div class="col-md-2">
        <!-------null------>
      </div>

      <div class="col-md-5">
        <form role="form">
          <fieldset>
            <p class="text-uppercase">Ingresa usando tu cuenta</p>

            <b-form-group label="Nombre de usuario">
              <b-form-input
                type="text"
                name="username"
                v-model="usuario.username"
                placeholder="Nombre de usuario"
              />
            </b-form-group>
            <b-form-group label="Contraseña">
              <b-form-input
                type="password"
                name="password"
                v-model="usuario.password"
                placeholder="Contraseña"
              />
            </b-form-group>
            <div>
              <b-button
                :disabled="$v.usuario.$invalid"
                @click="login"
                type="submit"
                variant="primary"
                >Ingresar</b-button
              >
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  </b-container>
</template>

<script>
import { login } from "../../service/loginService";
import { register } from "../../service/usuarioService";
import { required, minLength, maxLength } from "vuelidate/lib/validators";

export default {
  name: "Login",
  data() {
    return {
      usuario: {
        username: "",
        password: "",
      },
      usuarioReg: {
        nombres: "",
        apellidos: "",
        nombreDeUsuario: "",
        correo: "",
        contrasenha: "",
      },
      confirmPassword: "",
      isLoading: true,
    };
  },
  validations: {
    usuario: {
      username: {
        required,
        maxLength: maxLength(50),
      },
      password: {
        required,
        minLength: minLength(6),
      },
    },
    usuarioReg: {
      nombres: {
        required,
        maxLength: maxLength(30),
      },
      apellidos: {
        maxLength: maxLength(50),
      },
      nombreDeUsuario: {
        required,
        maxLength: maxLength(50),
      },
      correo: {
        required,
        maxLength: maxLength(50),
      },
      contrasenha: {
        required,
        minLength: minLength(8),
        maxLength: maxLength(15),
      },
    },
    confirmPassword: {
      required,
      minLength: minLength(8),
      maxLength: maxLength(15),
    },
  },
  methods: {
    login(e) {
      e.preventDefault();

      if (!this.$v.usuario.$invalid) {
        login(this.usuario)
          .then((res) => {
            this.$swal({
              title: "Éxito",
              text: `Bienvenido`,
              icon: "success",
              toast: true,
              position: "bottom-right",
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
            });
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            this.isLoading = false;
          });
      }
    },

    register(e) {
      e.preventDefault();

      if (
        !this.$v.usuarioReg.$invalid &&
        !this.$v.confirmPassword.$invalid &&
        !this.isValid()
      )
        register(this.usuarioReg)
          .then((res) => {
            this.$swal({
              title: `Bienvenido ${res.data.nombres} ${res.data.apellidos}`,
              text: `Se envio un correo a ${res.data.correo}`,
              icon: "success",
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
            });
          })
          .catch((err) => {
            console.log(err);
          });
    },

    isValid() {
      if (this.usuarioReg.contrasenha === this.confirmPassword) {
        return false;
      }
      return true;
    },
  },
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
