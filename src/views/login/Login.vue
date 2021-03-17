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
              <b-form-invalid-feedback
                class="mt-2"
                variant="danger"
                :state="$v.usuarioReg.nombres.required"
                >Campo requerido</b-form-invalid-feedback
              >
              <b-form-invalid-feedback
                class="mt-2"
                variant="danger"
                :state="$v.usuarioReg.nombres.maxLength"
                >Debe tener como máximo
                {{ $v.usuarioReg.nombres.$params.maxLength.max }}
                caracteres</b-form-invalid-feedback
              >
            </b-form-group>

            <b-form-group label="Apellidos">
              <b-form-input
                type="text"
                name="apellidos"
                v-model="usuarioReg.apellidos"
                placeholder="Apellidos"
              />
              <b-form-invalid-feedback
                class="mt-2"
                variant="danger"
                :state="$v.usuarioReg.apellidos.maxLength"
                >Debe tener como máximo
                {{ $v.usuarioReg.apellidos.$params.maxLength.max }}
                caracteres</b-form-invalid-feedback
              >
            </b-form-group>

            <b-form-group label="Nombre de usuario">
              <b-form-input
                type="text"
                name="username"
                v-model="usuarioReg.nombreDeUsuario"
                placeholder="Nombre de usuario"
              />
              <b-form-invalid-feedback
                class="mt-2"
                variant="danger"
                :state="$v.usuarioReg.nombreDeUsuario.required"
                >Campo requerido</b-form-invalid-feedback
              >
              <b-form-invalid-feedback
                class="mt-2"
                variant="danger"
                :state="$v.usuarioReg.nombreDeUsuario.maxLength"
                >Debe tener como máximo
                {{ $v.usuarioReg.nombreDeUsuario.$params.maxLength.max }}
                caracteres</b-form-invalid-feedback
              >
            </b-form-group>

            <b-form-group label="Correo">
              <b-form-input
                type="email"
                name="email"
                v-model="usuarioReg.correo"
                placeholder="Correo electronico"
              />
              <b-form-invalid-feedback
                class="mt-2"
                variant="danger"
                :state="$v.usuarioReg.correo.required"
                >Campo requerido</b-form-invalid-feedback
              >
              <b-form-invalid-feedback
                class="mt-2"
                variant="danger"
                :state="$v.usuarioReg.correo.maxLength"
                >Debe tener como máximo
                {{ $v.usuarioReg.correo.$params.maxLength.max }}
                caracteres</b-form-invalid-feedback
              >
            </b-form-group>

            <b-form-group label="Contraseña">
              <b-form-input
                type="password"
                name="password"
                v-model="usuarioReg.contrasenha"
                id="password"
                placeholder="Contraseña"
              />
              <b-form-invalid-feedback
                class="mt-2"
                variant="danger"
                :state="$v.usuarioReg.contrasenha.required"
                >Campo requerido</b-form-invalid-feedback
              >
              <b-form-invalid-feedback
                class="mt-2"
                variant="danger"
                :state="$v.usuarioReg.contrasenha.maxLength"
                >Debe tener como máximo
                {{ $v.usuarioReg.contrasenha.$params.maxLength.max }}
                caracteres</b-form-invalid-feedback
              >
              <b-form-invalid-feedback
                class="mt-2"
                variant="danger"
                :state="$v.usuarioReg.contrasenha.minLength"
                >Debe tener como máximo
                {{ $v.usuarioReg.contrasenha.$params.minLength.min }}
                caracteres</b-form-invalid-feedback
              >
            </b-form-group>

            <b-form-group label="Confirma tu contraseña">
              <b-form-input
                type="password"
                name="password2"
                v-model="confirmPassword"
                id="password2"
                placeholder="Vuelve a introducir tu contraseña"
              />
              <b-form-invalid-feedback
                class="mt-2"
                variant="danger"
                :state="$v.confirmPassword.required"
                >Campo requerido</b-form-invalid-feedback
              >
              <b-form-invalid-feedback
                class="mt-2"
                variant="danger"
                :state="$v.confirmPassword.maxLength"
                >Debe tener como máximo
                {{ $v.confirmPassword.$params.maxLength.max }}
                caracteres</b-form-invalid-feedback
              >
              <b-form-invalid-feedback
                class="mt-2"
                variant="danger"
                :state="$v.confirmPassword.minLength"
                >Debe tener como máximo
                {{ $v.confirmPassword.$params.minLength.min }}
                caracteres</b-form-invalid-feedback
              >
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
                Haciendo clic en registrar esta de acuerdo con nuestra política
                de privacidad
              </label>
            </b-form-group>
            <div>
              <b-button
                variant="primary"
                @click="register"
                :disabled="$v.usuarioReg.$invalid || isValid()"
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
    reset() {
      this.$refs.form.reset();
    },
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
            this.reset();
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
