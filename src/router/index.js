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
    path: "/confirmar/:token",
    name: "ConfirmAccount",
    component: () => import(/** */ "../views/login/confirm/Index.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/login/Login.vue")
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
    path: "/autor/:id/detalle",
    name: "AutorDetail",
    component: () =>
      import(
        /* webpackChunkName: "autorDetail" */ "../views/autor/autorDetail/Index.vue"
      )
  },
  {
    path: "/autor",
    name: "AutorForm",
    component: () =>
      import(
        /* webpackChunkName: "autorForm" */ "../views/autor/autorForm/Index.vue"
      )
  },
  {
    path: "/autor/:id",
    name: "AutorFormEdit",
    component: () => import(/* */ "../views/autor/autorForm/Index.vue")
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
    path: "/album",
    name: "Album",
    component: () =>
      import(/* webpackChunkName: "album" */ "../views/album/albumForm.vue")
  },
  {
    path: "/album/:id",
    name: "AlbumEditar",
    component: () =>
      import(/* webpackChunkName: "album" */ "../views/album/albumForm.vue")
  },
  {
    path: "/albumes",
    name: "Albumes",
    component: () =>
      import(/* webpackChunkName: "albumes" */ "../views/album/Index.vue")
  },
  {
    path: "/albumes/autor/:id",
    name: "AlbumesAutor",
    component: () =>
      import(/* webpackChunkName: "albumAutor" */ "../views/album/Index.vue")
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
  },
  {
    path: "/canciones/:nombre",
    name: "CancionesNombre",
    component: Canciones
  },
  {
    path: "/cancion",
    name: "CancionForm",
    component: () => import(/* */ "../views/cancion/cancionForm/Index.vue")
  },
  {
    path: "/cancion/:id",
    name: "CancionFormEdit",
    component: () => import(/* */ "../views/cancion/cancionForm/Index.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
