<script setup lang="ts">
import { defineProps } from "vue";
defineProps<{ title: string; data: [string, any][] }>();
</script>
<template>
  <div class="w-full mb-4">
    <div class="font-bold md:text-20 sm:text-18 text-16 mb-3">{{ title }}</div>
    <div
      class=""
      v-for="([dataTitle, dataValue], index) in data"
      :key="dataTitle">
      <div
        class="flex flex-row justify-start gap-x-2 items-center p-2"
        :class="{
          'bg-gray-100': index % 2 === 0,
          'bg-white': index % 2 === 1,
        }">
        <div class="min-w-[150px] md:text-18 sm:text-16 text-14 font-semibold">
          {{ dataTitle }}
        </div>
        <div class="md:text-18 sm:text-16 text-14 break-all">
          {{ dataValue }}
        </div>
      </div>
    </div>
  </div>
</template>
