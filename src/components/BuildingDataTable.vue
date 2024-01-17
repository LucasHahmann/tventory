<template>
     <div>
          <!-- Table Settings -->
          <v-data-table
               :headers="BuildingDataTableHeaders"
               :items="BuildingDataTableItems"
               class="elevation-1"
          >
               <template v-slot:top>
                    <v-toolbar flat>
                         <v-toolbar-title> All Buildings </v-toolbar-title>
                         <v-divider class="mx-4" inset vertical></v-divider>
                         <v-spacer></v-spacer>
                         <v-btn
                              color="primary"
                              dark
                              class="mb-2"
                              @click="BuildingCreateOverlay = true"
                         >
                              Create Building
                         </v-btn>
                    </v-toolbar>
               </template>

               <template v-slot:[`item.actions`]="{ item }">
                    <v-icon small class="mr-2" @click="editBuilding(item)">
                         mdi-pencil-box
                    </v-icon>
                    <v-icon small class="mr-2" @click="deleteBuilding(item)">
                         mdi-delete
                    </v-icon>
               </template>
               <template v-slot:no-data>
                    <v-btn color="primary" @click="initializeBuildingDataTable">
                         Reset
                    </v-btn>
               </template>
          </v-data-table>

          <!-- Overlays -->

          <v-overlay v-model="BuildingDeleteOverlay" class="center">
               <v-card width="500">
                    <v-card-title>Remove Building</v-card-title>
                    <v-card-text>
                         Do you really want to remove
                         {{ toBeDeletedBuilding.Name }} ?
                    </v-card-text>

                    <v-card-actions>
                         <v-spacer></v-spacer>
                         <v-btn
                              color="primary"
                              text
                              @click="BuildingDeleteOverlay = false"
                         >
                              No
                         </v-btn>
                         <v-btn
                              color="primary"
                              text
                              @click="sendDeleteBuilding()"
                         >
                              Yes
                         </v-btn>
                    </v-card-actions>
               </v-card>
          </v-overlay>
          <v-overlay v-model="BuildingEditOverlay" class="center">
               <v-card width="500">
                    <v-card-title>Edit Building</v-card-title>
                    <v-card-text>
                         <v-text-field
                              label="Buildings Name"
                              filled
                              outlined
                              v-model="editableBuilding.Name"
                         ></v-text-field>
                    </v-card-text>

                    <v-card-actions>
                         <v-spacer></v-spacer>
                         <v-btn
                              color="primary"
                              text
                              @click="BuildingEditOverlay = false"
                         >
                              No
                         </v-btn>
                         <v-btn
                              color="primary"
                              text
                              @click="sendEditBuilding()"
                         >
                              Submit
                         </v-btn>
                    </v-card-actions>
               </v-card>
          </v-overlay>

          <v-overlay v-model="BuildingCreateOverlay" class="center">
               <v-card width="500">
                    <v-card-title>Add Building</v-card-title>
                    <v-card-text>
                         <v-text-field
                              label="Buildings Name"
                              filled
                              outlined
                              v-model="newBuilding.Name"
                         ></v-text-field>
                    </v-card-text>

                    <v-card-actions>
                         <v-spacer></v-spacer>
                         <v-btn
                              color="primary"
                              text
                              @click="BuildingCreateOverlay = false"
                         >
                              No
                         </v-btn>
                         <v-btn color="primary" text @click="sendNewBuilding()">
                              Submit
                         </v-btn>
                    </v-card-actions>
               </v-card>
          </v-overlay>
     </div>
     <v-alert
          v-if="BuildingAlertShown"
          :type="BuildingAlertType"
          :title="BuildingAlterTitle"
          :text="BuildingAlertText"
     />
</template>

<script>
import fatch from "../methods/fatch.js";
import {
     getBuildings,
     createBuilding,
     editBuilding,
     removeBuilding,
} from "../methods/api.js";
export default {
     name: "BuildingDataTable",

     data: () => ({
          // Main DataTable Variables
          BuildingDataTableItems: [],
          BuildingDataTableHeaders: [],

          // New Building Overlay Variables
          BuildingCreateOverlay: false,
          newBuilding: {},

          // Edit Building Overlay Variables
          BuildingEditOverlay: false,
          editableBuilding: {},

          // Remove Building Overlay Variables
          BuildingDeleteOverlay: false,
          toBeDeletedBuilding: {},

          // Alert Varaibles
          BuildingAlertShown: false,
          BuildingAlertType: "",
          BuildingAlterTitle: "",
          BuildingAlertText: "",
     }),

     created() {
          this.initializeBuildingDataTable();
     },

     methods: {
          // Main Data Table Functions
          async initializeBuildingDataTable() {
               let dataItems = await getBuildings();
               if (dataItems.data.length == 0) return;
               this.BuildingDataTableHeaders = [
                    {
                         text: "Name",
                         align: "start",
                         value: "Name",
                    },
                    { text: "Actions", value: "actions", sortable: false },
               ];
               this.BuildingDataTableItems = dataItems.data;
          },
          // Add Building Functions
          async sendNewBuilding() {
               let createRequeste = await createBuilding(this.newBuilding);
               if (createRequeste.status == 201) {
                    this.BuildingAlertType = "success";
                    this.BuildingAlertText = createRequeste.message;
                    this.BuildingAlterTitle = "Successfully created";
                    this.BuildingAlertShown = true;
               } else {
                    this.BuildingAlertType = "error";
                    this.BuildingAlertText = createRequeste.error;
                    this.BuildingAlterTitle = "Something went wrong";
                    this.BuildingAlertShown = true;
               }
               this.BuildingCreateOverlay = false;
               this.initializeBuildingDataTable();
          },

          // Edit Building Functions
          async editBuilding(item) {
               this.editableBuilding = item;
               this.BuildingEditOverlay = true;
          },
          async sendEditBuilding() {
               let editRequest = await editBuilding(
                    this.editableBuilding.id,
                    this.editableBuilding.Name
               );
               if (editRequest.status == 200) {
                    this.BuildingAlertType = "success";
                    this.BuildingAlertText = editRequest.message;
                    this.BuildingAlterTitle = "Successfully edited";
                    this.BuildingAlertShown = true;
               } else {
                    this.BuildingAlertType = "error";
                    this.BuildingAlertText = editRequest.error;
                    this.BuildingAlterTitle = "Something went wrong";
                    this.BuildingAlertShown = true;
               }
               this.BuildingEditOverlay = false;
               this.initializeBuildingDataTable();
          },

          // Remove Building Functions
          async deleteBuilding(item) {
               this.toBeDeletedBuilding = item;
               this.BuildingDeleteOverlayName = item.Name;
               this.BuildingDeleteOverlay = true;
          },
          async sendDeleteBuilding() {
               let deleteRequest = await removeBuilding(
                    this.toBeDeletedBuilding.id
               );
               if (deleteRequest.status == 200) {
                    this.BuildingAlertType = "success";
                    this.BuildingAlertText = deleteRequest.message;
                    this.BuildingAlterTitle = "Successfully deleted";
                    this.BuildingAlertShown = true;
               } else {
                    this.BuildingAlertType = "error";
                    this.BuildingAlertText = deleteRequest.error;
                    this.BuildingAlterTitle = "Something went wrong";
                    this.BuildingAlertShown = true;
               }
               this.BuildingDeleteOverlay = false;
               this.initializeBuildingDataTable();
          },
     },
};
</script>

<style>
@import "../main.css";
</style>
