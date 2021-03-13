<template>
  <div>
    <div
      class="spinner-grow text-success m-5"
      style="width: 3rem; height: 3rem"
      role="status"
    ></div>
    <slot class="m-5">Esto es predeterminado</slot>
  </div>
</template>

<script>
export default {
  name: "Loading",
};
</script>
