<script setup lang="ts">
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner.vue";
</script>
<template>
  <div class="fixed inset-0 flex justify-center items-center rounded-2xl">
    <div
      class="flex flex-col items-center justify-center w-[350px] h-[350px] bg-white rounded-2xl gap-y-8 backdrop-blur-xl">
      <div class="font-bold text-20">Waiting for a few seconds</div>
      <LoadingSpinner />
    </div>
  </div>
</template>
