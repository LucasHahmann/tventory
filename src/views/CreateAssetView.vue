<template>
     <div>
          <app-bar />
     </div>

     <div class="content">
          <h1>Create Asset</h1>
          <v-container>
               <v-row>
                    <v-col>
                         <v-autocomplete
                              v-model="EmployeeAutoCompleteFieldModel"
                              :items="employeeAutoCompleteValues"
                              label="Employee"
                              id="EmployeeAutoCompleteField"
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
                                                       v-model="
                                                            asset.Manufactor
                                                       "
                                                       :items="
                                                            ManufactorAutoCompleteFieldItems
                                                       "
                                                       label="Manufactor"
                                                       id="ManufactorAutoCompleteField"
                                                       no-data-text="No manufactors avaiable"
                                                       @update:modelValue="
                                                            initModels(index)
                                                       "
                                                  ></v-autocomplete>
                                             </v-col>
                                             <v-col>
                                                  <v-autocomplete
                                                       v-model="asset.Model"
                                                       :items="asset.ModelArray"
                                                       label="Model"
                                                       id="ModelsAutoCompleteField"
                                                       no-data-text="Please Select a manufactor first"
                                                  ></v-autocomplete>
                                             </v-col>
                                        </v-row>
                                        <v-row>
                                             <v-col>
                                                  <v-text-field
                                                       v-model="
                                                            asset.InventoryNumber
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
          </v-container>
     </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppBar from "../components/AppBar.vue";
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
     UpdatedAt: Date;
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
               EmployeeAutoCompleteFieldItems: [] as string[],
               assets: [] as Asset[],
               employeeAutoCompleteValues: [] as string[],
               EmployeeAutoCompleteFieldModel: "" as string,
               ManufactorAutoCompleteFieldItems: [] as string[],
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
               // Employees
               let employees = await getEmployees();
               this.AllEmployees = employees.data;
               this.AllEmployees.forEach((element: Employee) => {
                    this.employeeAutoCompleteValues.push(element.Fullname);
               });

               // Manufacturers
               let manufacturers = await getManufactors();
               manufacturers.data.forEach((element: Manufactor) => {
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
               this.assets.forEach(async (asset) => {
                    await createAsset({
                         ID: selectedEmployee.id,
                         ModelName: asset.Model,
                         InventoryNumber: asset.InventoryNumber,
                    });
               });
          },
          async initModels(index: number) {
               // First, delete array
               this.assets[index].ModelArray = [];
               // Get models from manufacturer
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
