<template>
     <div>
          <AppBar />
          <div id="content"></div>
     </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppBar from "../components/AppBar.vue";

export default defineComponent({
     name: "DashboardView",
     components: {
          AppBar,
     },
     data() {
          return {};
     },
});
</script>
