import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Canciones from "../views/cancion/Index.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/autores",
    name: "Autores",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/autor/Index.vue")
  },
  {
    path: "/autor/:id",
    name: "AutorDetail",
    component: () =>
      import(
        /* webpackChunkName: "autorDetail" */ "../views/autor/autorDetail/Index.vue"
      )
  },
  {
    path: "/cancion/:id",
    name: "CancionDetail",
    component: () =>
      import(
        /* webpackChunkName: "cancionDetail" */ "../views/cancion/cancionDetail/Index.vue"
      )
  },
  {
    path: "/albumes/autor/:id",
    name: "AlbumesAutor",
    component: () =>
      import(
        /* webpackChunkName: "albumAutor" */ "../views/album/albumAutor/Index.vue"
      )
  },
  {
    path: "/canciones",
    name: "Canciones",
    component: Canciones
  },
  {
    path: "/canciones/album/:id",
    name: "CancionesAlbumes",
    component: Canciones
  }
];

const router = new VueRouter({
  routes
});

export default router;
