import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import DashboardView from "../views/DashboardView.vue";
import CreateAssetView from "../views/CreateAssetView.vue";
import DeviceSettingsView from "../views/DeviceSettingsView.vue";
import MetaSettingsView from "../views/MetaSettingsView.vue";
import AssetView from "../views/AssetView.vue";
import TestView from "../views/TestTable.vue";

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
          path: "/asset/:InventoryNumber",
          name: "AssetView",
          component: AssetView,
     },
     {
          path: "/test",
          name: "test",
          component: TestView,
     },
];

const router = createRouter({
     history: createWebHistory(process.env.BASE_URL),
     routes,
});

export default router;
