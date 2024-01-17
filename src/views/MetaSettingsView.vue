<template>
     <div>
          <AppBar />
     </div>
     <div id="content" style="margin: 75px">
          <BuildingDataTable />
     </div>
     <div id="content" style="margin: 75px">
          <EmployeeDataTable />
     </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppBar from "../components/AppBar.vue";
import BuildingDataTable from "../components/BuildingDataTable.vue";
import EmployeeDataTable from "@/components/EmployeeDataTable.vue";

export default defineComponent({
     name: "MetaSettingsView",
     components: {
          AppBar,
          BuildingDataTable,
          EmployeeDataTable,
     },
     data() {
          return {};
     },
});
</script>
