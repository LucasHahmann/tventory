<template>
     <AppBar />
     <div style="margin: 75px">
          <AssetDataTable />
     </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppBar from "../components/AppBar.vue";
import AssetDataTable from "@/components/AssetDataTable.vue";

export default defineComponent({
     name: "DashboardView",
     components: {
          AppBar,
          AssetDataTable,
     },
     data() {
          return {};
     },
});
</script>
