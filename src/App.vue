<script setup lang="ts">
import { storeToRefs } from "pinia";
import Navbar from "./components/Navbar/Navbar.vue";
</script>

<template>
  <Navbar />
  <router-view />
</template>
