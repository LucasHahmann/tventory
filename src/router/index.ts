import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import DashboardView from "../views/DashboardView.vue";
import CreateDeviceView from "../views/CreateDeviceView.vue";

const routes: Array<RouteRecordRaw> = [
     {
          path: "/",
          name: "dashboard",
          component: DashboardView,
     },
     {
          path: "/create",
          name: "createDevice",
          component: CreateDeviceView,
     },
];

const router = createRouter({
     history: createWebHistory(process.env.BASE_URL),
     routes,
});

export default router;
