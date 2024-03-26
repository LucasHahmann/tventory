<template>
     <div>
          <!-- Table Settings -->
          <v-data-table
               :headers="ModelsDataTableHeaders"
               :items="ModelsDataTableItems"
               class="elevation-1"
          >
               <template v-slot:top>
                    <v-toolbar flat>
                         <v-toolbar-title> All Models </v-toolbar-title>
                         <v-divider class="mx-4" inset vertical></v-divider>
                         <v-spacer></v-spacer>
                         <v-btn
                              color="primary"
                              dark
                              class="mb-2"
                              @click="ModelsCreateOverlay = true"
                         >
                              Create Models
                         </v-btn>
                    </v-toolbar>
               </template>

               <template v-slot:[`item.actions`]="{ item }">
                    <v-icon small class="mr-2" @click="editModels(item)">
                         mdi-pencil-box
                    </v-icon>
                    <v-icon small class="mr-2" @click="deleteModels(item)">
                         mdi-delete
                    </v-icon>
               </template>
               <template v-slot:no-data>
                    <v-btn color="primary" @click="initializeModelsDataTable">
                         Reset
                    </v-btn>
               </template>
          </v-data-table>

          <!-- Overlays -->

          <v-overlay v-model="ModelsDeleteOverlay" class="center">
               <v-card width="500">
                    <v-card-title>Remove Models</v-card-title>
                    <v-card-text>
                         Do you really want to remove
                         {{ toBeDeletedModels.Name }} ?
                    </v-card-text>

                    <v-card-actions>
                         <v-spacer></v-spacer>
                         <v-btn
                              color="primary"
                              text
                              @click="ModelsDeleteOverlay = false"
                         >
                              No
                         </v-btn>
                         <v-btn
                              color="primary"
                              text
                              @click="sendDeleteModels()"
                         >
                              Yes
                         </v-btn>
                    </v-card-actions>
               </v-card>
          </v-overlay>
          <v-overlay v-model="ModelsEditOverlay" class="center">
               <v-card width="500">
                    <v-card-title>Edit Models</v-card-title>
                    <v-card-text>
                         <v-text-field
                              label="Modelss Name"
                              filled
                              outlined
                              v-model="editableModels.Name"
                         ></v-text-field>
                    </v-card-text>

                    <v-card-actions>
                         <v-spacer></v-spacer>
                         <v-btn
                              color="primary"
                              text
                              @click="ModelsEditOverlay = false"
                         >
                              No
                         </v-btn>
                         <v-btn color="primary" text @click="sendEditModels()">
                              Submit
                         </v-btn>
                    </v-card-actions>
               </v-card>
          </v-overlay>

          <v-overlay v-model="ModelsCreateOverlay" class="center">
               <v-card width="500">
                    <v-card-title>Add Models</v-card-title>
                    <v-card-text>
                         <v-text-field
                              label="Model Name"
                              filled
                              outlined
                              v-model="newModel.Name"
                         ></v-text-field>

                         <v-autocomplete
                              id="ManufactorAutoCompleteField"
                              label="Manufactor"
                              :items="ManufactorAutoCompleteFieldItems"
                              v-model="newModel.Manufactor"
                         ></v-autocomplete>

                         <v-autocomplete
                              id="AssetTypeAutoCompleteField"
                              label="Type"
                              :items="AssetTypeAutoCompleteFieldItems"
                              v-model="newModel.AssetType"
                         ></v-autocomplete>
                    </v-card-text>

                    <v-card-actions>
                         <v-spacer></v-spacer>
                         <v-btn
                              color="primary"
                              text
                              @click="ModelsCreateOverlay = false"
                         >
                              No
                         </v-btn>
                         <v-btn color="primary" text @click="sendNewModel()">
                              Submit
                         </v-btn>
                    </v-card-actions>
               </v-card>
          </v-overlay>
     </div>
     <v-alert
          v-if="ModelsAlertShown"
          :type="ModelsAlertType"
          :title="ModelsAlterTitle"
          :text="ModelsAlertText"
     />
</template>

<script>
// import fatch from "../methods/fatch.js";
import {
     getAllModels,
     getManufactors,
     getAllModelTypes,
     createModel,
} from "../methods/api";
export default {
     name: "ModelsDataTable",

     data: () => ({
          // Main DataTable Variables
          ModelsDataTableItems: [],
          ModelsDataTableHeaders: [],

          // New Models Overlay Variables
          ModelsCreateOverlay: false,
          newModel: {},
          ManufactorAutoCompleteFieldItems: [],
          AssetTypeAutoCompleteFieldItems: [],

          // Edit Models Overlay Variables
          ModelsEditOverlay: false,
          editableModels: {},

          // Remove Models Overlay Variables
          ModelsDeleteOverlay: false,
          toBeDeletedModels: {},

          // Alert Varaibles
          ModelsAlertShown: false,
          ModelsAlertType: "",
          ModelsAlterTitle: "",
          ModelsAlertText: "",
     }),

     created() {
          this.initializeModelsDataTable();
          this.getAutoCompleteItems();
     },

     methods: {
          async getAutoCompleteItems() {
               // Manufactors
               let manufactor = await getManufactors();
               manufactor.data.forEach((element) => {
                    this.ManufactorAutoCompleteFieldItems.push(element.Name);
               });

               // Types
               let types = await getAllModelTypes();
               types.data.forEach((element) => {
                    this.AssetTypeAutoCompleteFieldItems.push(element.Type);
               });
          },
          // Main Data Table Functions
          async initializeModelsDataTable() {
               let dataItems = await getAllModels();
               if (dataItems.data.length == 0) return;
               this.ModelsDataTableHeaders = [
                    {
                         text: "Model",
                         align: "start",
                         value: "Model",
                    },
                    {
                         text: "Manufactor",
                         align: "start",
                         value: "ManufactorName",
                    },
                    { text: "Actions", value: "actions", sortable: false },
               ];
               this.ModelsDataTableItems = dataItems.data;
          },
          // Add Models Functions
          async sendNewModel() {
               let createRequeste = await createModel(this.newModel); // fatch("CreateModels", this.newModels);
               if (createRequeste.status == 200) {
                    this.ModelsAlertType = "success";
                    this.ModelsAlertText = createRequeste.message;
                    this.ModelsAlterTitle = "Successfully created";
                    this.ModelsAlertShown = true;
               } else {
                    this.ModelsAlertType = "error";
                    this.ModelsAlertText = createRequeste.error;
                    this.ModelsAlterTitle = "Something went wrong";
                    this.ModelsAlertShown = true;
               }
               this.ModelsCreateOverlay = false;
               this.initializeModelsDataTable();
          },

          // Edit Models Functions
          async editModels(item) {
               this.editableModels = item;
               this.ModelsEditOverlay = true;
          },
          async sendEditModels() {
               let editRequest = 1; /* await fatch("EditModels",
               {
                    id: this.editableModels.id,
                    Name: this.editableModels.Name,
               });
               */
               if (editRequest.status == 200) {
                    this.ModelsAlertType = "success";
                    this.ModelsAlertText = editRequest.message;
                    this.ModelsAlterTitle = "Successfully edited";
                    this.ModelsAlertShown = true;
               } else {
                    this.ModelsAlertType = "error";
                    this.ModelsAlertText = editRequest.error;
                    this.ModelsAlterTitle = "Something went wrong";
                    this.ModelsAlertShown = true;
               }
               this.ModelsEditOverlay = false;
               this.initializeModelsDataTable();
          },

          // Remove Models Functions
          async deleteModels(item) {
               this.toBeDeletedModels = item;
               this.ModelsDeleteOverlayName = item.Name;
               this.ModelsDeleteOverlay = true;
          },
          async sendDeleteModels() {
               let deleteRequest = 1; /*await fatch(
                    "RemoveModels",
                    this.toBeDeletedModels.id
               );
               */
               if (deleteRequest.status == 200) {
                    this.ModelsAlertType = "success";
                    this.ModelsAlertText = deleteRequest.message;
                    this.ModelsAlterTitle = "Successfully deleted";
                    this.ModelsAlertShown = true;
               } else {
                    this.ModelsAlertType = "error";
                    this.ModelsAlertText = deleteRequest.error;
                    this.ModelsAlterTitle = "Something went wrong";
                    this.ModelsAlertShown = true;
               }
               this.ModelsDeleteOverlay = false;
               this.initializeModelsDataTable();
          },
     },
};
</script>

<style>
@import "../main.css";
</style>
