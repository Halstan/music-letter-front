<template>
  <footer class="footer mt-auto py-3 bg-light">
    <div class="container">
      <span class="text-muted">
        Made with 💚 from
        <a href="https://github.com/halstan" target="_blanck">Enzo Arauco</a>
      </span>
    </div>
  </footer>
</template>

<script>
export default {
  name: "CustomFooter"
};
</script>

<style scoped>
footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60px; /* Height of the footer */
}
</style>
