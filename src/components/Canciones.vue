<template>
  <b-container>
    <b-card-group
      v-for="cancion in canciones"
      :key="cancion.idCancion"
      class="mt-3"
      deck
    >
      <b-card :title="cancion.nombre">
        <b-card-sub-title> Album: {{ cancion.album.nombre }} </b-card-sub-title>

        <b-card-body>
          <b-card-text>
            Autor:
            {{
              cancion.album.autor.nombres + " " + cancion.album.autor.apellidos
            }}
          </b-card-text>
        </b-card-body>
        <router-link
          class="btn btn-secondary"
          :to="{
            name: 'AutorDetail',
            params: { id: cancion.album.autor.idAutor }
          }"
        >
          Ver autor
        </router-link>
        <router-link
          class="btn btn-primary ml-2"
          :to="{
            name: 'CancionDetail',
            params: { id: cancion.idCancion }
          }"
        >
          Ver completo
        </router-link>

        <template #footer>
          <em>Fecha de lanzamiento: {{ cancion.fechaLanzamiento }}</em>
        </template>
      </b-card>
    </b-card-group>
  </b-container>
</template>

<script>
export default {
  name: "CancionesComponent",
  props: {
    canciones: {
      type: Array,
      required: true
    }
  }
};
</script>

<style></style>
