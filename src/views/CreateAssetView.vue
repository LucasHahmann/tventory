<template>
     <div>
          <AppBar />
     </div>

     <div style="margin: 75px">
          <h1>Create Asset</h1>
          <v-container>
               <v-row>
                    <v-col>
                         <v-autocomplete
                              id="EmployeeAutoCompleteField"
                              label="Employee"
                              :items="EmployeeAutoCompleteFieldItems"
                         ></v-autocomplete>
                    </v-col>
               </v-row>
               <v-row>
                    <v-col>
                         <v-autocomplete
                              id="BuildingAutoCompleteField"
                              label="Building"
                              :items="BuildingAutoCompleteFieldItems"
                         ></v-autocomplete>
                    </v-col>
                    <v-col>
                         <v-text-field
                              v-model="room"
                              label="Room"
                         ></v-text-field>
                    </v-col>
               </v-row>
               <v-row>
                    <v-col>
                         <v-btn @click="addAsset" color="primary">
                              Add Asset
                         </v-btn>
                    </v-col>
               </v-row>
               <div v-for="(asset, index) in assets" :key="index">
                    <v-row>
                         <v-card style="margin: 25px" width="95%">
                              <v-card-title>
                                   Asset {{ index + 1 }}
                              </v-card-title>
                              <v-card-text>
                                   <v-container>
                                        <v-row>
                                             <v-col>
                                                  <v-autocomplete
                                                       id="BuildingAutoCompleteField"
                                                       label="Manufactor"
                                                       :items="
                                                            BuildingAutoCompleteFieldItems
                                                       "
                                                  ></v-autocomplete>
                                             </v-col>
                                             <v-col>
                                                  <v-autocomplete
                                                       id="BuildingAutoCompleteField"
                                                       label="Model"
                                                       :items="
                                                            BuildingAutoCompleteFieldItems
                                                       "
                                                  ></v-autocomplete>
                                             </v-col>
                                        </v-row>
                                        <v-row>
                                             <v-col>
                                                  <v-text-field
                                                       v-model="room"
                                                       label="Inventorynumber"
                                                  ></v-text-field>
                                             </v-col>
                                        </v-row>
                                   </v-container>
                              </v-card-text>
                         </v-card>
                    </v-row>
               </div>
               <v-btn color="primary"> Create asset </v-btn>
          </v-container>
     </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppBar from "../components/AppBar.vue";
import fatch from "../methods/fatch.js";

export default defineComponent({
     name: "CreateAssetView",
     components: {
          AppBar,
     },
     created() {
          this.initAutocompletes();
     },
     data() {
          return {
               EmployeeAutoCompleteFieldItems: new Array<string>(),
               BuildingAutoCompleteFieldItems: new Array<string>(),
               room: new String(),
               assets: new Array<object>(),
          };
     },
     methods: {
          addAsset() {
               this.assets.push({});
          },
          async initAutocompletes() {
               console.log(await fatch("GetAllEmployees"));
          },
          onSubmit() {
               console.log("Hallo");
          },
          required(v: string) {
               return !!v || "Field is required";
          },
     },
});
</script>
