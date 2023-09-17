import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import database from "../views/database.vue";
import versions from "../views/versions.vue";
import dependencies from "../views/dependencies.vue";
import checkupdate from "../views/checkupdate.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: versions,
  },
  {
    name: "versions",
    path: "/versions",
    component: versions,
  },
  {
    name: "database",
    path: "/database",
    component: database,
  },
  {
    name: "dependencies",
    path: "/dependencies",
    component: dependencies,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
