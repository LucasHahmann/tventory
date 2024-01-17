import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import DashboardView from "../views/DashboardView.vue";
import CreateAssetView from "../views/CreateAssetView.vue";
import DeviceSettingsView from "../views/DeviceSettingsView.vue";
import testtable from "../views/TestTable.vue";
import MetaSettingsView from "../views/MetaSettingsView.vue";

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
     {
          path: "/devicesettings",
          name: "devicesettings",
          component: DeviceSettingsView,
     },
     {
          path: "/metasettings",
          name: "metasettings",
          component: MetaSettingsView,
     },
     {
          path: "/testtable",
          name: "testtable",
          component: testtable,
     },
];

const router = createRouter({
     history: createWebHistory(process.env.BASE_URL),
     routes,
});

export default router;
