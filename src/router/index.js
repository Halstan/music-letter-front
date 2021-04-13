import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Canciones from "../views/cancion/Index.vue";
import store from "../store/index";

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
    component: () =>
      import(
        /* webpackChunkName: "confirmarCuenta" */ "../views/login/confirm/Index.vue"
      )
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
    path: "/autor",
    name: "AutorForm",
    component: () =>
      import(
        /* webpackChunkName: "autorForm" */ "../views/autor/autorForm/Index.vue"
      ),
    meta: { protectedRoute: true }
  },
  {
    path: "/autor/:id",
    name: "AutorFormEdit",
    component: () => import(/* */ "../views/autor/autorForm/Index.vue"),
    meta: { protectedRoute: true }
  },
  {
    path: "/album",
    name: "Album",
    component: () =>
      import(/* webpackChunkName: "album" */ "../views/album/albumForm.vue"),
    meta: { protectedRoute: true }
  },
  {
    path: "/album/:id",
    name: "AlbumEditar",
    component: () =>
      import(/* webpackChunkName: "album" */ "../views/album/albumForm.vue"),
    meta: { protectedRoute: true }
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
    path: "/mis-canciones",
    name: "MisCanciones",
    component: () =>
      import(
        /* webpackChunkName: "misCanciones" */ "../views/cancion/MiCancion.vue"
      ),
    meta: { protectedRoute: true }
  },
  {
    path: "/cancion",
    name: "CancionForm",
    component: () =>
      import(
        /* webpackChunkName: "cancionForm" */ "../views/cancion/cancionForm/Index.vue"
      ),
    meta: { protectedRoute: true }
  },
  {
    path: "/cancion/:id",
    name: "CancionFormEdit",
    component: () =>
      import(
        /* webpackChunkName: "CancionFormEdit" */ "../views/cancion/cancionForm/Index.vue"
      ),
    meta: { protectedRoute: true }
  },
  {
    path: "/miscelaneo",
    name: "GeneroIdioma",
    component: () =>
      import(/* webpackChunkName: "generoIdioma" */ "../views/varios/Index.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.protectedRoute) {
    if (store.getters.usuarioAutenticado) {
      next();
    } else {
      next("/login");
    }
  } else next();
});

export default router;
