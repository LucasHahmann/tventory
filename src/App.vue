<template>
     <v-app>
          <v-main>
               <v-app>
                    <router-view v-if="showApplication" />
                    <div v-if="showError">No connection!</div>
               </v-app>
          </v-main>
     </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import fatch from "./methods/fatch.js";
import { CheckBackendConnection } from "./methods/api.js";
export default defineComponent({
     name: "App",

     data() {
          return {
               showError: false,
               showApplication: false,
          };
     },
     async created() {
          if (await CheckBackendConnection()) {
               this.showApplication = true;
          } else {
               this.showError = true;
          }
     },
     methods: {},
});
</script>
