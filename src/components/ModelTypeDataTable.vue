<template>
     <div>
          <!-- Table Settings -->
          <v-data-table
               :headers="ModelTypeDataTableHeaders"
               :items="ModelTypeDataTableItems"
               class="elevation-1"
          >
               <template v-slot:top>
                    <v-toolbar flat>
                         <v-toolbar-title> All Model Types </v-toolbar-title>
                         <v-divider class="mx-4" inset vertical></v-divider>
                         <v-spacer></v-spacer>
                         <v-btn
                              color="primary"
                              dark
                              class="mb-2"
                              @click="ModelTypeCreateOverlay = true"
                         >
                              Create Type
                         </v-btn>
                    </v-toolbar>
               </template>

               <template v-slot:[`item.actions`]="{ item }">
                    <v-icon small class="mr-2" @click="editModelType(item)">
                         mdi-pencil-box
                    </v-icon>
                    <v-icon small class="mr-2" @click="deleteModelType(item)">
                         mdi-delete
                    </v-icon>
               </template>
               <template v-slot:no-data>
                    <v-btn
                         color="primary"
                         @click="initializeModelTypeDataTable"
                    >
                         Reset
                    </v-btn>
               </template>
          </v-data-table>

          <!-- Overlays -->

          <v-overlay v-model="ModelTypeDeleteOverlay" class="center">
               <v-card width="500">
                    <v-card-title>Remove Type</v-card-title>
                    <v-card-text>
                         Do you really want to remove
                         {{ toBeDeletedModelType.Name }} ?
                    </v-card-text>

                    <v-card-actions>
                         <v-spacer></v-spacer>
                         <v-btn
                              color="primary"
                              text
                              @click="ModelTypeDeleteOverlay = false"
                         >
                              No
                         </v-btn>
                         <v-btn
                              color="primary"
                              text
                              @click="sendDeleteModelType()"
                         >
                              Yes
                         </v-btn>
                    </v-card-actions>
               </v-card>
          </v-overlay>
          <v-overlay v-model="ModelTypeEditOverlay" class="center">
               <v-card width="500">
                    <v-card-title>Edit Model Type</v-card-title>
                    <v-card-text>
                         <v-text-field
                              label="Type Name"
                              filled
                              outlined
                              v-model="editableModelType.Name"
                         ></v-text-field>
                    </v-card-text>

                    <v-card-actions>
                         <v-spacer></v-spacer>
                         <v-btn
                              color="primary"
                              text
                              @click="ModelTypeEditOverlay = false"
                         >
                              No
                         </v-btn>
                         <v-btn
                              color="primary"
                              text
                              @click="sendEditModelType()"
                         >
                              Submit
                         </v-btn>
                    </v-card-actions>
               </v-card>
          </v-overlay>

          <v-overlay v-model="ModelTypeCreateOverlay" class="center">
               <v-card width="500">
                    <v-card-title>Add Model Type</v-card-title>
                    <v-card-text>
                         <v-text-field
                              label="Type Name"
                              filled
                              outlined
                              v-model="newModelType.Name"
                         ></v-text-field>
                    </v-card-text>

                    <v-card-actions>
                         <v-spacer></v-spacer>
                         <v-btn
                              color="primary"
                              text
                              @click="ModelTypeCreateOverlay = false"
                         >
                              No
                         </v-btn>
                         <v-btn
                              color="primary"
                              text
                              @click="sendNewModelType()"
                         >
                              Submit
                         </v-btn>
                    </v-card-actions>
               </v-card>
          </v-overlay>
     </div>
     <v-alert
          v-if="ModelTypeAlertShown"
          :type="ModelTypeAlertType"
          :title="ModelTypeAlterTitle"
          :text="ModelTypeAlertText"
     />
</template>

<script>
/* eslint-disable */
import fatch from "../methods/fatch.js";
import {
     getAllModelTypes,
     createModelType,
     createModel,
} from "../methods/api.js";
export default {
     name: "ModelTypeDataTable",

     data: () => ({
          // Main DataTable Variables
          ModelTypeDataTableItems: [],
          ModelTypeDataTableHeaders: [],

          // New ModelType Overlay Variables
          ModelTypeCreateOverlay: false,
          newModelType: {},

          // Edit ModelType Overlay Variables
          ModelTypeEditOverlay: false,
          editableModelType: {},

          // Remove ModelType Overlay Variables
          ModelTypeDeleteOverlay: false,
          toBeDeletedModelType: {},

          // Alert Varaibles
          ModelTypeAlertShown: false,
          ModelTypeAlertType: "",
          ModelTypeAlterTitle: "",
          ModelTypeAlertText: "",
     }),

     created() {
          this.initializeModelTypeDataTable();
     },

     methods: {
          // Main Data Table Functions
          async initializeModelTypeDataTable() {
               let dataItems = await getAllModelTypes();
               if (dataItems.data.length == 0) return;
               this.ModelTypeDataTableHeaders = [
                    {
                         text: "Name",
                         align: "start",
                         value: "Type",
                    },
                    { text: "Actions", value: "actions", sortable: false },
               ];
               this.ModelTypeDataTableItems = dataItems.data;
          },
          // Add ModelType Functions
          async sendNewModelType() {
               let createRequeste = await createModelType(
                    this.newModelType.Name
               );
               if (createRequeste.status == 200) {
                    this.ModelTypeAlertType = "success";
                    this.ModelTypeAlertText = createRequeste.message;
                    this.ModelTypeAlterTitle = "Successfully created";
                    this.ModelTypeAlertShown = true;
               } else {
                    this.ModelTypeAlertType = "error";
                    this.ModelTypeAlertText = createRequeste.error;
                    this.ModelTypeAlterTitle = "Something went wrong";
                    this.ModelTypeAlertShown = true;
               }
               this.ModelTypeCreateOverlay = false;
               this.initializeModelTypeDataTable();
          },

          // Edit ModelType Functions
          async editModelType(item) {
               this.editableModelType = item;
               this.ModelTypeEditOverlay = true;
          },
          async sendEditModelType() {
               let editRequest = await fatch("EditModelType", {
                    id: this.editableModelType.id,
                    Name: this.editableModelType.Name,
               });
               if (editRequest.status == 200) {
                    this.ModelTypeAlertType = "success";
                    this.ModelTypeAlertText = editRequest.message;
                    this.ModelTypeAlterTitle = "Successfully edited";
                    this.ModelTypeAlertShown = true;
               } else {
                    this.ModelTypeAlertType = "error";
                    this.ModelTypeAlertText = editRequest.error;
                    this.ModelTypeAlterTitle = "Something went wrong";
                    this.ModelTypeAlertShown = true;
               }
               this.ModelTypeEditOverlay = false;
               this.initializeModelTypeDataTable();
          },

          // Remove ModelType Functions
          async deleteModelType(item) {
               this.toBeDeletedModelType = item;
               this.ModelTypeDeleteOverlayName = item.Name;
               this.ModelTypeDeleteOverlay = true;
          },
          async sendDeleteModelType() {
               let deleteRequest = await fatch(
                    "RemoveModelType",
                    this.toBeDeletedModelType.id
               );
               if (deleteRequest.status == 200) {
                    this.ModelTypeAlertType = "success";
                    this.ModelTypeAlertText = deleteRequest.message;
                    this.ModelTypeAlterTitle = "Successfully deleted";
                    this.ModelTypeAlertShown = true;
               } else {
                    this.ModelTypeAlertType = "error";
                    this.ModelTypeAlertText = deleteRequest.error;
                    this.ModelTypeAlterTitle = "Something went wrong";
                    this.ModelTypeAlertShown = true;
               }
               this.ModelTypeDeleteOverlay = false;
               this.initializeModelTypeDataTable();
          },
     },
};
</script>

<style>
@import "../main.css";
</style>
