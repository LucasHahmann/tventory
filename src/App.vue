<template>
     <v-app>
          <v-main>
               <v-app>
                    <router-view v-if="RouterViewShown" />
                    <v-alert
                         v-if="CoonectionAlertShown"
                         type="error"
                         title="No connection to server!"
                         text="The connection to the server ist not available. Please contact your System Administrator!"
                    />
               </v-app>
          </v-main>
     </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import fatch from "./methods/fatch.js";
export default defineComponent({
     name: "App",

     data() {
          return {
               CoonectionAlertShown: false,
               RouterViewShown: false,
          };
     },
     created() {
          this.checkBackendConnection();
     },
     methods: {
          /**
           * This function checked the Backend Connection. If the connections exists, the router-view ist loaded.
           * If not, an error is shown.
           **/
          async checkBackendConnection() {
               let res = await fatch("CheckBackendConnection");
               // If the status is not OK, return the err
               if (res.status != "OK")
                    return (this.CoonectionAlertShown = true);
               // If the connection is OK, view the router-view
               this.RouterViewShown = true;
          },
     },
});
</script>
