<script setup lang="ts">
import Navbar from "../components/Navbar/Navbar.vue";
</script>
<template>
  <Navbar />
  <div class="flex flex-col justify-start items-center min-h-screen bg-gray-200 py-8 gap-y-4">
    <div class="font-bold text-2xl">The content is available for member only.</div>
    <router-link to="/login">
      <button
        class="px-6 py-2 font-bold bg-blue-500 rounded-md hover:bg-opacity-70 transition-[background-color_padding_text] ease-linear duration-200 hover:py-[10px] hover:text-[18px]"
      >
        Back to Login Page
      </button>
    </router-link>
  </div>
</template>
