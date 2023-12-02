<template>
     <v-container>
          <v-card>
               <v-card-title>Sample Data Table</v-card-title>
               <v-card-text>
                    <VDataTable
                         :headers="headers"
                         :items="items"
                         :items-per-page="5"
                         class="elevation-1"
                    ></VDataTable>
               </v-card-text>
          </v-card>
     </v-container>
</template>

<script>
import { defineComponent } from "vue";

export default {
     name: "DataTableExample",
     data() {
          return {
               headers: [
                    { text: "ID", value: "id" },
                    { text: "Name", value: "name" },
                    { text: "Email", value: "email" },
                    { text: "Age", value: "age" },
               ],
               items: [
                    {
                         id: 1,
                         name: "John Doe",
                         email: "john@example.com",
                         age: 30,
                    },
                    {
                         id: 2,
                         name: "Jane Smith",
                         email: "jane@example.com",
                         age: 25,
                    },
                    // Add more data items as needed
               ],
          };
     },
     components: {},
};
</script>

<style>
/* Add any component-specific styles here */
</style>
