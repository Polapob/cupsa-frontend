<script setup lang="ts">
import useCheckMember from "../composables/useCheckMember";
const [isMember] = useCheckMember();
</script>
<template>
  <div class="p-8 flex flex-col justify-start items-center bg-gray-200 min-h-screen">
    <div v-if="isMember">
      <div class="font-bold text-2xl">You are a general member.</div>
    </div>
    <div v-else>
      <div class="font-bold text-2xl">You aren't a general member.</div>
    </div>
  </div>
</template>
