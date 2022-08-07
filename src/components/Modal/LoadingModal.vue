<script setup lang="ts">
import Loading from "../Loading/Loading.vue";
</script>
<template>
  <div class="flex justify-center items-start w-screen fixed overflow-y-hidden h-screen">
    <div class="flex flex-col justify-center items-center gap-y-8 w-[500px] h-[350px] rounded-2xl bg-white bg-opacity-80 backdrop-blur-sm">
      <div class="font-bold text-[24px]">Waiting for response</div>
      <Loading />
    </div>
  </div>
</template>
