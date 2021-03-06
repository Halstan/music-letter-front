import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/autores",
    name: "Autores",
    component: () => import(/* */ "../views/autor/Index.vue")
  },
  {
    path: "/autor/:id",
    name: "AutorDetail",
    component: () => import(/* */ "../views/autor/autorDetail/Index.vue")
  },
  {
    path: "/cancion/:id",
    name: "CancionDetail",
    component: () => import(/* */ "../views/cancion/cancionDetail/Index.vue")
  },
  {
    path: "/albumes/autor/:id",
    name: "AlbumesAutor",
    component: () => import(/* */ "../views/album/albumAutor/Index.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
