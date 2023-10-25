<template>
     <div>
          <v-app-bar app>
               <v-app-bar-title>Device managemet</v-app-bar-title>
               <v-btn> Dashboard </v-btn>
               <v-btn @click="route('create')"> Create Device </v-btn>
               <v-btn> Meta Settings </v-btn>
          </v-app-bar>
     </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
     name: "AppBar",
     methods: {
          route(routeName: string) {
               this.$router.push(`/${routeName}`);
          },
     },
     data() {
          return {};
     },
});
</script>
