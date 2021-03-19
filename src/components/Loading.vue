<template>
  <div class="m-5">
    <span
      class="spinner-grow text-primary"
      style="width: 5rem; height: 5rem"
      role="status"
    ></span>
    <p class="mt-3"><slot>Hola</slot></p>
  </div>
</template>

<script>
export default {
  name: "Loading"
};
</script>
