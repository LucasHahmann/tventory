<template>
     <div>
          <AppBar />
     </div>
     <div style="margin: 75px">
          <v-container>
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
                                                       v-model="
                                                            currentEmplyoee.FirstName
                                                       "
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
                                                       v-model="
                                                            currentEmplyoee.LastName
                                                       "
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
                                                       v-model="
                                                            currentEmplyoee.EMail
                                                       "
                                                  ></v-text-field>
                                             </v-col>
                                        </v-row>

                                        <v-row>
                                             <v-col> Building</v-col>
                                             <v-col>
                                                  <v-autocomplete
                                                       id="EmployeeBuildingAutoCompleteField"
                                                       label="Building"
                                                       :items="
                                                            EmployeeInformationBuildingAutoCompleteValues
                                                       "
                                                       v-model="
                                                            currentEmplyoee.BuildingName
                                                       "
                                                  ></v-autocomplete>
                                             </v-col>
                                        </v-row>
                                        <v-row>
                                             <!-- 
                                             <v-col>
                                                  <v-btn color="primary">
                                                       Save
                                                  </v-btn>
                                             </v-col>
                                             -->
                                        </v-row>
                                   </v-container></v-card-text
                              >
                         </v-card>
                    </v-col>
                    <v-col>
                         <v-card>
                              <v-card-title>Asset informations</v-card-title>
                              <v-card-text>
                                   <v-container>
                                        <v-row>
                                             <v-col> Inventory Number </v-col>
                                             <v-col>
                                                  <v-text-field
                                                       label="Inventory Number"
                                                       filled
                                                       outlined
                                                       v-model="
                                                            Asset.InventoryNumber
                                                       "
                                                  ></v-text-field>
                                             </v-col>
                                        </v-row>
                                        <v-row>
                                             <v-col> Modelname </v-col>
                                             <v-col>
                                                  <v-text-field
                                                       label="Model Name"
                                                       filled
                                                       outlined
                                                       v-model="Asset.ModelName"
                                                  ></v-text-field>
                                             </v-col>
                                        </v-row>
                                        <v-row>
                                             <v-col> Employee </v-col>
                                             <v-col>
                                                  <v-autocomplete
                                                       id="EmployeeBuildingAutoCompleteField"
                                                       label="Building"
                                                       :items="
                                                            EmployeeInformationBuildingAutoCompleteValues
                                                       "
                                                       v-model="
                                                            currentEmplyoee.BuildingName
                                                       "
                                                  ></v-autocomplete>
                                             </v-col>
                                        </v-row>

                                        <v-row>
                                             <v-col> Asset Type </v-col>
                                             <v-col>
                                                  <v-text-field
                                                       label="Asset Type"
                                                       filled
                                                       outlined
                                                       v-model="
                                                            currentModel.AssetTypeName
                                                       "
                                                  ></v-text-field>
                                             </v-col>
                                        </v-row>
                                        <v-row>
                                             <v-col> Manufactor </v-col>
                                             <v-col>
                                                  <v-text-field
                                                       label="Manufactor"
                                                       filled
                                                       outlined
                                                       disabled
                                                       v-model="
                                                            currentModel.ManufactorName
                                                       "
                                                  ></v-text-field>
                                             </v-col>
                                        </v-row>
                                        <v-row>
                                             <!--
                                             <v-col>
                                                  
                                                  <v-btn color="primary">
                                                       Save
                                                  </v-btn>
                                             </v-col>
                                             -->
                                        </v-row>
                                   </v-container></v-card-text
                              >
                         </v-card>
                    </v-col>
               </v-row>
          </v-container>
     </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppBar from "../components/AppBar.vue";
import {
     getBuildings,
     getEmployees,
     getAssetByInventoryNumber,
} from "../methods/api";

interface Building {
     id: number;
     Name: string;
}

interface Asset {
     id: number;
     EmployeeID: number;
     Employee: any;
     ModelName: string;
     InventoryNumber: string;
     Model?: any;
     link?: string;
}

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

interface Model {
     AssetTypeName: string;
     ManufactorName: string;
     Model: string;
     id: number;
}

export default defineComponent({
     name: "AssetView",
     components: {
          AppBar,
     },
     created() {
          return null;
     },
     beforeMount() {
          this.getAsset();
          this.getBuildings();
     },
     data() {
          return {
               EmployeeInformationBuildingAutoCompleteValues: [] as string[],
               test: "" as string,
               Asset: {} as Asset,
               currentEmplyoee: {} as Employee,
               currentModel: {} as Model,
          };
     },
     methods: {
          async getAsset() {
               this.Asset = await getAssetByInventoryNumber(
                    this.$route.params.InventoryNumber
               );
               this.currentEmplyoee = this.Asset.Employee;
               this.currentModel = this.Asset.Model;
          },

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
