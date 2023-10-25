<template>
     <div>
          <AppBar />
     </div>

     <div style="margin: 75px">
          <h1>Create device</h1>
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
                         <v-btn @click="addDevice" color="primary">
                              Add Device
                         </v-btn>
                    </v-col>
               </v-row>
               <div v-for="(device, index) in devices" :key="index">
                    <v-row>
                         <v-card style="margin: 25px" width="95%">
                              <v-card-title>
                                   Device {{ index + 1 }}
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
               <v-btn color="primary"> Create devices </v-btn>
          </v-container>
     </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppBar from "../components/AppBar.vue";

export default defineComponent({
     name: "CreateDeviceView",
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
               devices: new Array<object>(),
          };
     },
     methods: {
          addDevice() {
               this.devices.push({});
          },
          initAutocompletes() {
               this.EmployeeAutoCompleteFieldItems = [
                    "California",
                    "Colorado",
                    "Florida",
                    "Georgia",
                    "Texas",
                    "Wyoming",
               ];
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
