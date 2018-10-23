import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Search from "./views/Search.vue";
import Art from "./views/Art.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/collection/:owner",
      name: "collection",
      component: Search
    },
    {
      path: "/art/:id",
      name: "art",
      component: Art
    }
  ]
});
