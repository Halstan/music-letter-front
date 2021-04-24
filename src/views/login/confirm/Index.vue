<template>
  <v-container>
    <v-card dark class="mt-3">
      <loading v-if="isLoading">
        <p class="warning--text">Espere un momento por favor</p>
      </loading>
      <template v-else>
        <v-card-title>Cuenta verificada</v-card-title>
        <v-card-text>{{ message }}</v-card-text>
      </template>
    </v-card>
  </v-container>
</template>

<script>
import Loading from "../../../components/Loading";
//import { confirmAccount } from "../../../service/tokenService";

export default {
  components: { Loading },
  name: "ConfirmAccount",
  data() {
    return {
      message: "",
      isLoading: true
    };
  },
  created() {
    this.confirm(this.$route.params.token);
  },
  methods: {
    confirm(token) {
      console.log(token);
      /*confirmAccount(token)
        .then(res => {
          this.message = res.data.message;
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.isLoading = false;
        });*/
    }
  }
};
</script>
