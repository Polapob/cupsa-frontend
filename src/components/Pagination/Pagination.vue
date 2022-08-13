<script setup lang="ts">
const props = defineProps<{
  maxPage: number;
  selectPage: number;
  onSelectPage: (page: number) => void;
  onPrevPage: () => void;
  onNextPage: () => void;
}>();
</script>

<template>
  <div class="flex flex-row justify-center items-center gap-x-4 my-8">
    <button @click="onPrevPage" :disabled="selectPage === 1">
      <font-awesome-icon icon="fa-solid fa-arrow-left" />
    </button>
    <div v-for="i in props.maxPage" :key="i">
      <button
        class="border-2 border-blue-500 w-10 h-10 rounded-md"
        v-if="i != props.selectPage"
        @click="
          () => {
            props.onSelectPage(i);
          }
        "
      >
        {{ i }}
      </button>
      <button
        class="border-2 border-blue-500 bg-blue-500 w-10 h-10 rounded-md"
        v-else
        @click="
          () => {
            props.onSelectPage(i);
          }
        "
      >
        {{ i }}
      </button>
    </div>
    <button @click="onNextPage" :disabled="selectPage === props.maxPage">
      <font-awesome-icon icon="fa-solid fa-arrow-right" />
    </button>
  </div>
</template>
