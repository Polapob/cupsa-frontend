<script setup lang="ts">
import { defineProps } from "vue";
defineProps<{ title: string; data: [string, any][] }>();
</script>
<template>
  <div>
    <div class="font-bold text-[20px] leading-[30px]">{{ title }}</div>
    <div v-for="([dataTitle, dataValue], index) in data" :key="index">
      <div class="flex flex-row justify-start items-center">
        <div>{{ dataTitle }}</div>
        <div>{{ dataValue }}</div>
      </div>
    </div>
  </div>
</template>
