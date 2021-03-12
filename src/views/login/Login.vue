<template>
  <b-container>
    <h2>Login</h2>
    <hr />
    <div class="row">
      <div class="col-md-5">
        <form role="form" method="post">
          <fieldset>
            <p class="text-uppercase pull-center">Registrate</p>
            <b-form-group label="Nombre de usuario">
              <b-form-input
                type="text"
                name="username"
                id="username"
                class="form-control input-lg"
                placeholder="username"
              />
            </b-form-group>

            <b-form-group label="Correo">
              <b-form-input
                type="email"
                name="email"
                id="email"
                class="form-control input-lg"
                placeholder="Email Address"
              />
            </b-form-group>
            <b-form-group label="Contraseña">
              <b-form-input
                type="password"
                name="password"
                id="password"
                class="form-control input-lg"
                placeholder="Password"
              />
            </b-form-group>
            <b-form-group label="Confirma tu contraseña">
              <b-form-input
                type="password"
                name="password2"
                id="password2"
                class="form-control input-lg"
                placeholder="Password2"
              />
            </b-form-group>
            <b-form-group label="">
              <label class="form-check-label">
                <b-form-checkbox type="checkbox" />
                By Clicking register you're agree to our policy & terms
              </label>
            </b-form-group>
            <div>
              <b-button type="submit" variant="primary">Registrarme</b-button>
            </div>
          </fieldset>
        </form>
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
              <b-button @click="login" type="submit" variant="primary"
                >Ingresar</b-button
              >
            </div>
          </fieldset>
          <b-card>
            {{ usuario }}
          </b-card>
        </form>
      </div>
    </div>
  </b-container>
</template>

<script>
import { login } from "../../service/loginService";

export default {
  name: "Login",
  data() {
    return {
      usuario: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    login(e) {
      e.preventDefault();

      login(this.usuario)
        .then(res => {
          console.log(res.data);
          console.log(res.data.access_token);
        })
        .catch(err => {
          console.log(err.message);
          console.log(err);
          console.log(err.path);
          console.log(err.timestamp);
          console.log(err.status);
          console.log(err.error);
          console.log(err.error_description);
        });
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
