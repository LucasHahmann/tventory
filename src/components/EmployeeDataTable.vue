<template>
     <div>
          <!-- Table Settings -->
          <v-data-table
               :headers="EmployeeDataTableHeaders"
               :items="EmployeeDataTableItems"
               class="elevation-1"
          >
               <template v-slot:top>
                    <v-toolbar flat>
                         <v-toolbar-title> All Employees </v-toolbar-title>
                         <v-divider class="mx-4" inset vertical></v-divider>
                         <v-spacer></v-spacer>
                         <v-btn
                              color="primary"
                              dark
                              class="mb-2"
                              @click="openEmployeeCreateOverlay()"
                         >
                              Create Employee
                         </v-btn>
                    </v-toolbar>
               </template>

               <template v-slot:[`item.actions`]="{ item }">
                    <v-icon small class="mr-2" @click="editEmployee(item)">
                         mdi-pencil-box
                    </v-icon>
                    <v-icon small class="mr-2" @click="deleteEmployee(item)">
                         mdi-delete
                    </v-icon>
               </template>
               <template v-slot:no-data>
                    <v-btn color="primary" @click="initializeEmployeeDataTable">
                         Reset
                    </v-btn>
               </template>
          </v-data-table>

          <!-- Overlays -->

          <v-overlay v-model="EmployeeDeleteOverlay" class="center">
               <v-card width="500">
                    <v-card-title>Remove Employee</v-card-title>
                    <v-card-text>
                         Do you really want to remove
                         {{ toBeDeletedEmployee.Name }} ?
                    </v-card-text>

                    <v-card-actions>
                         <v-spacer></v-spacer>
                         <v-btn
                              color="primary"
                              text
                              @click="EmployeeDeleteOverlay = false"
                         >
                              No
                         </v-btn>
                         <v-btn
                              color="primary"
                              text
                              @click="sendDeleteEmployee()"
                         >
                              Yes
                         </v-btn>
                    </v-card-actions>
               </v-card>
          </v-overlay>
          <v-overlay v-model="EmployeeEditOverlay" class="center">
               <v-card width="500">
                    <v-card-title>Edit Employee</v-card-title>
                    <v-card-text>
                         <v-text-field
                              label="Employees Name"
                              filled
                              outlined
                              v-model="editableEmployee.Name"
                         ></v-text-field>
                    </v-card-text>

                    <v-card-actions>
                         <v-spacer></v-spacer>
                         <v-btn
                              color="primary"
                              text
                              @click="EmployeeEditOverlay = false"
                         >
                              No
                         </v-btn>
                         <v-btn
                              color="primary"
                              text
                              @click="sendEditEmployee()"
                         >
                              Submit
                         </v-btn>
                    </v-card-actions>
               </v-card>
          </v-overlay>

          <v-overlay v-model="EmployeeCreateOverlay" class="center">
               <v-card width="500">
                    <v-card-title>Add Employee</v-card-title>
                    <v-card-text>
                         <v-text-field
                              label="First Name"
                              filled
                              outlined
                              v-model="newEmployee.FirstName"
                         ></v-text-field>
                         <v-text-field
                              label="Last Name"
                              filled
                              outlined
                              v-model="newEmployee.LastName"
                         ></v-text-field>
                         <v-text-field
                              label="Employees E-Mail"
                              filled
                              outlined
                              v-model="newEmployee.EMail"
                         ></v-text-field>
                         <v-autocomplete
                              id="EmployeeBuildingAutoCompleteField"
                              label="Building"
                              :items="BuildingAutoCompleteFieldItems"
                              v-model="newEmployee.Buidling"
                         ></v-autocomplete>
                    </v-card-text>

                    <v-card-actions>
                         <v-spacer></v-spacer>
                         <v-btn
                              color="primary"
                              text
                              @click="EmployeeCreateOverlay = false"
                         >
                              No
                         </v-btn>
                         <v-btn color="primary" text @click="sendNewEmployee()">
                              Submit
                         </v-btn>
                    </v-card-actions>
               </v-card>
          </v-overlay>
     </div>
     <v-alert
          v-if="EmployeeAlertShown"
          :type="EmployeeAlertType"
          :title="EmployeeAlterTitle"
          :text="EmployeeAlertText"
     />
</template>

<script>
import fatch from "../methods/fatch.js";
import {
     getEmployees,
     createEmployee,
     editEmployee,
     removeEmployee,
     getBuildings,
} from "../methods/api.js";
export default {
     name: "EmployeeDataTable",

     data: () => ({
          BuildingAutoCompleteFieldItems: [],

          // Main DataTable Variables
          EmployeeDataTableItems: [],
          EmployeeDataTableHeaders: [],

          // New Employee Overlay Variables
          EmployeeCreateOverlay: false,
          newEmployee: {},

          // Edit Employee Overlay Variables
          EmployeeEditOverlay: false,
          editableEmployee: {},

          // Remove Employee Overlay Variables
          EmployeeDeleteOverlay: false,
          toBeDeletedEmployee: {},

          // Alert Varaibles
          EmployeeAlertShown: false,
          EmployeeAlertType: "",
          EmployeeAlterTitle: "",
          EmployeeAlertText: "",
     }),

     created() {
          this.initializeEmployeeDataTable();
     },

     methods: {
          // Main Data Table Functions
          async initializeEmployeeDataTable() {
               let dataItems = await getEmployees();
               if (dataItems.data.length == 0) return;
               this.EmployeeDataTableHeaders = [
                    {
                         text: "First Name",
                         align: "start",
                         value: "FirstName",
                    },
                    {
                         text: "Last Name",
                         align: "start",
                         value: "LastName",
                    },
                    {
                         text: "E-Mail",
                         align: "start",
                         value: "EMail",
                    },
                    {
                         text: "Building",
                         align: "start",
                         value: "BuildingName",
                    },
                    { text: "Actions", value: "actions", sortable: false },
               ];
               this.EmployeeDataTableItems = dataItems.data;
          },
          openEmployeeCreateOverlay() {
               this.getBuildings();
               this.EmployeeCreateOverlay = true;
          },
          async getBuildings() {
               let buildings = await getBuildings();
               buildings.data.forEach((element) => {
                    this.BuildingAutoCompleteFieldItems.push(element.Name);
               });
          },
          // Add Employee Functions
          async sendNewEmployee() {
               let createRequeste = await createEmployee(this.newEmployee);
               if (createRequeste.status == 201) {
                    this.EmployeeAlertType = "success";
                    this.EmployeeAlertText = createRequeste.message;
                    this.EmployeeAlterTitle = "Successfully created";
                    this.EmployeeAlertShown = true;
               } else {
                    this.EmployeeAlertType = "error";
                    this.EmployeeAlertText = createRequeste.error;
                    this.EmployeeAlterTitle = "Something went wrong";
                    this.EmployeeAlertShown = true;
               }
               this.EmployeeCreateOverlay = false;
               this.initializeEmployeeDataTable();
          },

          // Edit Employee Functions
          async editEmployee(item) {
               this.editableEmployee = item;
               this.EmployeeEditOverlay = true;
          },
          async sendEditEmployee() {
               let editRequest = await editEmployee(
                    this.editableEmployee.id,
                    this.editableEmployee.Name
               );
               if (editRequest.status == 200) {
                    this.EmployeeAlertType = "success";
                    this.EmployeeAlertText = editRequest.message;
                    this.EmployeeAlterTitle = "Successfully edited";
                    this.EmployeeAlertShown = true;
               } else {
                    this.EmployeeAlertType = "error";
                    this.EmployeeAlertText = editRequest.error;
                    this.EmployeeAlterTitle = "Something went wrong";
                    this.EmployeeAlertShown = true;
               }
               this.EmployeeEditOverlay = false;
               this.initializeEmployeeDataTable();
          },

          // Remove Employee Functions
          async deleteEmployee(item) {
               this.toBeDeletedEmployee = item;
               this.EmployeeDeleteOverlayName = item.Name;
               this.EmployeeDeleteOverlay = true;
          },
          async sendDeleteEmployee() {
               let deleteRequest = await removeEmployee(
                    this.toBeDeletedEmployee.id
               );
               if (deleteRequest.status == 200) {
                    this.EmployeeAlertType = "success";
                    this.EmployeeAlertText = deleteRequest.message;
                    this.EmployeeAlterTitle = "Successfully deleted";
                    this.EmployeeAlertShown = true;
               } else {
                    this.EmployeeAlertType = "error";
                    this.EmployeeAlertText = deleteRequest.error;
                    this.EmployeeAlterTitle = "Something went wrong";
                    this.EmployeeAlertShown = true;
               }
               this.EmployeeDeleteOverlay = false;
               this.initializeEmployeeDataTable();
          },
     },
};
</script>

<style>
@import "../main.css";
</style>
