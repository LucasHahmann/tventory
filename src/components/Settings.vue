<template>
     <div>
          <v-card>
               <v-card-title>Settings</v-card-title>
               <v-card-text>
                    <v-container>
                         <v-row>
                              <v-col> Inventory Prefix </v-col>
                              <v-col>
                                   <v-text-field
                                        v-model="InventoryPrefix"
                                        label="Inventory Prefix"
                                        variant="outlined"
                                        append-inner-icon="mdi-check"
                                        @click:append-inner="toggleMarker"
                                   ></v-text-field>
                              </v-col>
                         </v-row>
                    </v-container>
               </v-card-text>
          </v-card>
     </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { getInventoryPrefix, setInventoryPrefix } from "../methods/api";

export default defineComponent({
     name: "SettingsComponent",
     components: {},
     created() {
          this.init();
     },
     methods: {
          async init() {
               this.InventoryPrefix = await getInventoryPrefix();
          },
          async toggleMarker() {
               console.log(await setInventoryPrefix(this.InventoryPrefix));
          },
     },

     data() {
          return {
               InventoryPrefix: "" as string,
          };
     },
});
</script>
