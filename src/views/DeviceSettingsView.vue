<template>
     <div>
          <AppBar />
     </div>
     <div id="content" style="margin: 75px">
          <div id="manufactors">
               <h1>Edit Manufactors</h1>
               <ManufactorDataTable />
          </div>
     </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppBar from "../components/AppBar.vue";
import ManufactorDataTable from "../components/ManufactorDataTable.vue";

export default defineComponent({
     name: "DeviceSettingsView",
     components: {
          AppBar,
          ManufactorDataTable,
     },
     data() {
          return {};
     },
});
</script>
