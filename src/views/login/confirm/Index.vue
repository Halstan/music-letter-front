<template>
  <b-container>
    <b-card class="mt-3">
      <loading v-if="isLoading">
        <p class="text-warning">Espere un momento por favor</p>
      </loading>
      <b-card-body v-else>
        <b-card-title>Cuenta verificada</b-card-title>
        <b-card-text>{{ message }}</b-card-text>
      </b-card-body>
    </b-card>
  </b-container>
</template>

<script>
import Loading from "../../../components/Loading";
import { confirmAccount } from "../../../service/tokenService";

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
      confirmAccount(token)
        .then(res => {
          this.message = res.data.message;
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.isLoading = false;
        });
    }
  }
};
</script>
