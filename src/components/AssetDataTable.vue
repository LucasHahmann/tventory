<template>
     <div>
          <v-card>
               <v-card-title>All Assets</v-card-title>
               <v-card-text
                    ><v-text-field
                         v-model="AssetDataTableSearching"
                         label="Search"
                         prepend-inner-icon="mdi-magnify"
                         variant="outlined"
                         hide-details
                         single-line
                    ></v-text-field>
                    <v-data-table
                         :headers="AssetDataTableHeaders"
                         :items="AssetsArray"
                         :loading="loading"
                         :search="AssetDataTableSearching"
                         @update:options="loadItems"
                    ></v-data-table
               ></v-card-text>
          </v-card>
     </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { getAllAssets } from "../methods/api";

interface Asset {
     id: number;
     EmployeeID: number;
     ModelName: string;
     InventoryNumber: string;
}

export default defineComponent({
     name: "MetaSettingsView",
     components: {},
     methods: {
          async loadItems() {
               this.loading = true;
               this.AssetDataTableHeaders = [
                    {
                         title: "Model Name",
                         align: "start",
                         sortable: false,
                         key: "ModelName",
                    },
                    {
                         title: "Inventory Number",
                         key: "InventoryNumber",
                    },
                    {
                         title: "Employee",
                         key: "Employee.Fullname",
                    },
                    {
                         title: "Model",
                         key: "Model.Model",
                    },
                    {
                         title: "Manufactor",
                         key: "Model.ManufactorName",
                    },
                    {
                         title: "Link",
                         key: "Model.ManufactorName",
                    },
               ];
               this.AssetsArray = await getAllAssets();
               this.loading = false;
          },
     },

     data() {
          return {
               AssetsArray: [] as Asset[],
               AssetDataTableHeaders: [] as object[],
               loading: true as boolean,
               AssetDataTableSearching: "" as string,
          };
     },
});
</script>
