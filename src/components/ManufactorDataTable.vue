<template>
     <div>
          <!-- Table Settings -->
          <v-data-table
               :headers="ManufactorDataTableHeaders"
               :items="ManufactorDataTableItems"
               class="elevation-1"
          >
               <template v-slot:top>
                    <v-toolbar flat>
                         <v-toolbar-title> All Manufactors </v-toolbar-title>
                         <v-divider class="mx-4" inset vertical></v-divider>
                         <v-spacer></v-spacer>
                         <v-btn
                              color="primary"
                              dark
                              class="mb-2"
                              @click="ManufactorCreateOverlay = true"
                         >
                              Create Manufactor
                         </v-btn>
                    </v-toolbar>
               </template>

               <template v-slot:[`item.actions`]="{ item }">
                    <v-icon small class="mr-2" @click="editManufactor(item)">
                         mdi-pencil-box
                    </v-icon>
                    <v-icon small class="mr-2" @click="deleteManufactor(item)">
                         mdi-delete
                    </v-icon>
               </template>
               <template v-slot:no-data>
                    <v-btn
                         color="primary"
                         @click="initializeManufactorDataTable"
                    >
                         Reset
                    </v-btn>
               </template>
          </v-data-table>

          <!-- Overlays -->

          <v-overlay v-model="ManufactorDeleteOverlay" class="center">
               <v-card width="500">
                    <v-card-title>Remove Manufactor</v-card-title>
                    <v-card-text>
                         Do you really want to remove
                         {{ toBeDeletedManufactor.Name }} ?
                    </v-card-text>

                    <v-card-actions>
                         <v-spacer></v-spacer>
                         <v-btn
                              color="primary"
                              text
                              @click="ManufactorDeleteOverlay = false"
                         >
                              No
                         </v-btn>
                         <v-btn
                              color="primary"
                              text
                              @click="sendDeleteManufactor()"
                         >
                              Yes
                         </v-btn>
                    </v-card-actions>
               </v-card>
          </v-overlay>
          <v-overlay v-model="ManufactorEditOverlay" class="center">
               <v-card width="500">
                    <v-card-title>Edit Manufactor</v-card-title>
                    <v-card-text>
                         <v-text-field
                              label="Manufactors Name"
                              filled
                              outlined
                              v-model="editableManufactor.Name"
                         ></v-text-field>
                    </v-card-text>

                    <v-card-actions>
                         <v-spacer></v-spacer>
                         <v-btn
                              color="primary"
                              text
                              @click="ManufactorEditOverlay = false"
                         >
                              No
                         </v-btn>
                         <v-btn
                              color="primary"
                              text
                              @click="sendEditManufactor()"
                         >
                              Submit
                         </v-btn>
                    </v-card-actions>
               </v-card>
          </v-overlay>

          <v-overlay v-model="ManufactorCreateOverlay" class="center">
               <v-card width="500">
                    <v-card-title>Add Manufactor</v-card-title>
                    <v-card-text>
                         <v-text-field
                              label="Manufactors Name"
                              filled
                              outlined
                              v-model="newManufactor.Name"
                         ></v-text-field>
                    </v-card-text>

                    <v-card-actions>
                         <v-spacer></v-spacer>
                         <v-btn
                              color="primary"
                              text
                              @click="ManufactorCreateOverlay = false"
                         >
                              No
                         </v-btn>
                         <v-btn
                              color="primary"
                              text
                              @click="sendNewManufactor()"
                         >
                              Submit
                         </v-btn>
                    </v-card-actions>
               </v-card>
          </v-overlay>
     </div>
     <v-alert
          v-if="ManufactorAlertShown"
          :type="ManufactorAlertType"
          :title="ManufactorAlterTitle"
          :text="ManufactorAlertText"
     />
</template>

<script>
import fatch from "../methods/fatch.js";
export default {
     name: "ManufactorDataTable",

     data: () => ({
          // Main DataTable Variables
          ManufactorDataTableItems: [],
          ManufactorDataTableHeaders: [],

          // New Manufactor Overlay Variables
          ManufactorCreateOverlay: false,
          newManufactor: {},

          // Edit Manufactor Overlay Variables
          ManufactorEditOverlay: false,
          editableManufactor: {},

          // Remove Manufactor Overlay Variables
          ManufactorDeleteOverlay: false,
          toBeDeletedManufactor: {},

          // Alert Varaibles
          ManufactorAlertShown: false,
          ManufactorAlertType: "",
          ManufactorAlterTitle: "",
          ManufactorAlertText: "",
     }),

     created() {
          this.initializeManufactorDataTable();
     },

     methods: {
          // Main Data Table Functions
          async initializeManufactorDataTable() {
               let dataItems = await fatch("GetAllManufactors");
               if (dataItems.data.length == 0) return;
               this.ManufactorDataTableHeaders = [
                    {
                         text: "Name",
                         align: "start",
                         value: "Name",
                    },
                    { text: "Actions", value: "actions", sortable: false },
               ];
               this.ManufactorDataTableItems = dataItems.data;
          },
          // Add Manufactor Functions
          async sendNewManufactor() {
               let createRequeste = await fatch(
                    "CreateManufactor",
                    this.newManufactor
               );
               if (createRequeste.status == 200) {
                    this.ManufactorAlertType = "success";
                    this.ManufactorAlertText = createRequeste.message;
                    this.ManufactorAlterTitle = "Successfully created";
                    this.ManufactorAlertShown = true;
               } else {
                    this.ManufactorAlertType = "error";
                    this.ManufactorAlertText = createRequeste.error;
                    this.ManufactorAlterTitle = "Something went wrong";
                    this.ManufactorAlertShown = true;
               }
               this.ManufactorCreateOverlay = false;
               this.initializeManufactorDataTable();
          },

          // Edit Manufactor Functions
          async editManufactor(item) {
               this.editableManufactor = item;
               this.ManufactorEditOverlay = true;
          },
          async sendEditManufactor() {
               let editRequest = await fatch("EditManufactor", {
                    id: this.editableManufactor.id,
                    Name: this.editableManufactor.Name,
               });
               if (editRequest.status == 200) {
                    this.ManufactorAlertType = "success";
                    this.ManufactorAlertText = editRequest.message;
                    this.ManufactorAlterTitle = "Successfully edited";
                    this.ManufactorAlertShown = true;
               } else {
                    this.ManufactorAlertType = "error";
                    this.ManufactorAlertText = editRequest.error;
                    this.ManufactorAlterTitle = "Something went wrong";
                    this.ManufactorAlertShown = true;
               }
               this.ManufactorEditOverlay = false;
               this.initializeManufactorDataTable();
          },

          // Remove Manufactor Functions
          async deleteManufactor(item) {
               this.toBeDeletedManufactor = item;
               this.ManufactorDeleteOverlayName = item.Name;
               this.ManufactorDeleteOverlay = true;
          },
          async sendDeleteManufactor() {
               let deleteRequest = await fatch(
                    "RemoveManufactor",
                    this.toBeDeletedManufactor.id
               );
               if (deleteRequest.status == 200) {
                    this.ManufactorAlertType = "success";
                    this.ManufactorAlertText = deleteRequest.message;
                    this.ManufactorAlterTitle = "Successfully deleted";
                    this.ManufactorAlertShown = true;
               } else {
                    this.ManufactorAlertType = "error";
                    this.ManufactorAlertText = deleteRequest.error;
                    this.ManufactorAlterTitle = "Something went wrong";
                    this.ManufactorAlertShown = true;
               }
               this.ManufactorDeleteOverlay = false;
               this.initializeManufactorDataTable();
          },
     },
};
</script>

<style>
@import "../main.css";
</style>
