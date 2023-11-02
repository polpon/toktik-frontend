<template>
  <v-app>
    <v-main>
      <Navbar v-if="!$route.meta.hideNavbar" />
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import Navbar from "@/components/Navbar.vue";
  //
</script>
