<template>
     <div>
          <AppBar />
     </div>
     <div style="margin: 75px">
          <container>
               <v-row>
                    <v-col>
                         <v-card>
                              <v-card-title>Employee Informations</v-card-title>
                              <v-card-text>
                                   <v-container>
                                        <v-row>
                                             <v-col> First Name </v-col>
                                             <v-col>
                                                  <v-text-field
                                                       label="First Name"
                                                       filled
                                                       outlined
                                                  ></v-text-field>
                                             </v-col>
                                        </v-row>
                                        <v-row>
                                             <v-col> Last Name </v-col>
                                             <v-col>
                                                  <v-text-field
                                                       label="Last Name"
                                                       filled
                                                       outlined
                                                  ></v-text-field>
                                             </v-col>
                                        </v-row>
                                        <v-row>
                                             <v-col> E-Mail</v-col>
                                             <v-col>
                                                  <v-text-field
                                                       label="Employees E-Mail"
                                                       filled
                                                       outlined
                                                  ></v-text-field>
                                             </v-col>
                                        </v-row>

                                        <v-row>
                                             <v-col> E-Mail</v-col>
                                             <v-col>
                                                  <v-autocomplete
                                                       id="EmployeeBuildingAutoCompleteField"
                                                       label="Building"
                                                       :items="
                                                            EmployeeInformationBuildingAutoCompleteValues
                                                       "
                                                       v-model="
                                                            newEmployee.Buidling
                                                       "
                                                  ></v-autocomplete>
                                             </v-col>
                                        </v-row> </v-container
                              ></v-card-text>
                         </v-card>
                    </v-col>
                    <v-col>
                         <v-card>
                              <v-card-title>Asset informations</v-card-title>
                              <v-card-text
                                   ><v-container>
                                        <v-row>
                                             <v-col></v-col>
                                        </v-row> </v-container
                              ></v-card-text>
                         </v-card>
                    </v-col>
               </v-row>
          </container>
     </div>
     <div style="margin: 75px">
          <h1>Create Asset</h1>
          {{ $route.params.InventoryNumber }}
     </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppBar from "../components/AppBar.vue";
import { getBuildings, getEmployees } from "../methods/api";

interface Building {
     id: number;
     Name: string;
}

export default defineComponent({
     name: "AssetView",
     components: {
          AppBar,
     },
     created() {
          return null;
     },
     data() {
          return {
               EmployeeInformationBuildingAutoCompleteValues: [] as string[],
          };
     },
     methods: {
          async getEmployee() {},
          async getBuildings() {
               let buildings = await getBuildings();
               buildings.data.forEach((element: Building) => {
                    this.EmployeeInformationBuildingAutoCompleteValues.push(
                         element.Name
                    );
               });
          },
     },
});
</script>
