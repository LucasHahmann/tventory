import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import DashboardView from "../views/DashboardView.vue";
import CreateAssetView from "../views/CreateAssetView.vue";

const routes: Array<RouteRecordRaw> = [
     {
          path: "/",
          name: "dashboard",
          component: DashboardView,
     },
     {
          path: "/create",
          name: "createDevice",
          component: CreateAssetView,
     },
];

const router = createRouter({
     history: createWebHistory(process.env.BASE_URL),
     routes,
});

export default router;
