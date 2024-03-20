<template>
     <div>
          <AppBar />
     </div>

     <div style="margin: 75px">
          <h1>Create Asset</h1>
          {{ $route.params.InventoryNumber }}
     </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppBar from "../components/AppBar.vue";
import {} from "../methods/api";

export default defineComponent({
     name: "AssetView",
     components: {
          AppBar,
     },
     created() {
          return null;
     },
     data() {
          return {};
     },
     methods: {},
});
</script>
