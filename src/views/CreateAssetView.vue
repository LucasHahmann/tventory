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
                              :items="employeeAutoCompleteValues"
                              v-model="EmployeeAutoCompleteFieldModel"
                         ></v-autocomplete>
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
                                                       id="ManufactorAutoCompleteField"
                                                       label="Manufactor"
                                                       :items="
                                                            ManufactorAutoCompleteFieldItems
                                                       "
                                                       v-model="
                                                            assets[index]
                                                                 .Manufactor
                                                       "
                                                       @update:modelValue="
                                                            initModels(index)
                                                       "
                                                  ></v-autocomplete>
                                             </v-col>
                                             <v-col>
                                                  <v-autocomplete
                                                       id="ModelsAutoCompleteField"
                                                       label="Model"
                                                       :items="
                                                            assets[index]
                                                                 .ModelArray
                                                       "
                                                       v-model="
                                                            assets[index].Model
                                                       "
                                                  ></v-autocomplete>
                                             </v-col>
                                        </v-row>
                                        <v-row>
                                             <v-col>
                                                  <v-text-field
                                                       v-model="
                                                            assets[index]
                                                                 .InventoryNumber
                                                       "
                                                       label="Inventorynumber"
                                                  ></v-text-field>
                                             </v-col>
                                        </v-row>
                                   </v-container>
                              </v-card-text>
                         </v-card>
                    </v-row>
               </div>
               <div style="margin: 30px">
                    <v-btn color="primary" @click="createAssets()">
                         Create asset
                    </v-btn>
               </div>
          </v-container>
     </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppBar from "../components/AppBar.vue";
import fatch from "../methods/fatch.js";
import {
     getEmployees,
     getManufactors,
     getModeslByManufacor,
     createAsset,
     getInventoryPrefix,
} from "../methods/api";

interface Employee {
     BuildingName: string;
     CreatedAt: Date;
     EMail: string;
     FirstName: string;
     Fullname: string;
     LastName: string;
     UpdatetAt: Date;
     id: number;
}

interface Manufactor {
     id: number;
     Name: string;
}

interface Model {
     id: number;
     Model: string;
     ManufactorName: string;
     AssetTypeName: string;
}

interface Asset {
     Manufactor?: string;
     Model?: string;
     InventoryNumber?: string;
     ModelArray: string[];
}

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
               assets: [] as Asset[],
               employeeAutoCompleteValues: [] as string[],
               EmployeeAutoCompleteFieldModel: "" as string,
               ManufactorAutoCompleteFieldItems: [] as string[],
               ModelsAutoCompleteFieldItems: [] as string[],
               AllEmployees: [] as Employee[],
          };
     },
     methods: {
          async addAsset() {
               this.assets.push({
                    ModelArray: [],
                    InventoryNumber: (await getInventoryPrefix()) + "-",
               });
          },
          async initAutocompletes() {
               // Emplyoees
               let employees = await getEmployees();
               this.AllEmployees = employees.data;
               this.AllEmployees.forEach((element: Employee) => {
                    this.employeeAutoCompleteValues.push(element.Fullname);
               });

               // Manufactors
               let manufactors = await getManufactors();
               manufactors.data.forEach((element: Manufactor) => {
                    this.ManufactorAutoCompleteFieldItems.push(element.Name);
               });
          },
          async createAssets() {
               let selectedEmployee =
                    this.AllEmployees[
                         this.employeeAutoCompleteValues.indexOf(
                              this.EmployeeAutoCompleteFieldModel
                         )
                    ];
               this.assets.forEach(async (element) => {
                    console.log(
                         await createAsset({
                              ID: selectedEmployee.id,
                              ModelName: element.Model,
                              InventoryNumber: element.InventoryNumber,
                         })
                    );
               });
          },
          required(v: string) {
               return !!v || "Field is required";
          },
          async initModels(index: number) {
               // First, delete array
               this.assets[index].ModelArray = [];
               // Get models from manufactor
               let models = await getModeslByManufacor(
                    this.assets[index].Manufactor
               );
               // Insert the Model Name in the array
               models.data.forEach((element: Model) => {
                    this.assets[index]?.ModelArray?.push(element.Model);
               });
               this.assets[index].InventoryNumber = await getInventoryPrefix();
          },
     },
});
</script>
