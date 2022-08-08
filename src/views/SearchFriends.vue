<script setup lang="ts">
import useFetchFriends from "../composables/useFetchFriends";
import usePagination from "../composables/usePagination";
import Pagination from "../components/Pagination/Pagination.vue";
import filterDataFromPagination from "../utils/SearchFriends/filterDataFromPagination";
import { ref } from "vue";
const [friends, numberOfFriends] = useFetchFriends();
const selectPage = ref(1);
const onSelectPage = (page: number) => {
  selectPage.value = page;
};
const onNextPage = () => {
  selectPage.value++;
};
const onPrevPage = () => {
  selectPage.value--;
};
</script>
<template>
  <div class="flex flex-col justify-start items-center p-8 bg-gray-200 min-h-screen">
    <div class="font-bold text-2xl">Show List of your friends</div>
    <div class="font-bold text-[20px] my-2">You can search your friends</div>
    <input class="my-5 rounded-md px-4 py-1 w-[300px] focus:outline-none" />
    <div class="flex flex-col justify-center items-start w-[700px] gap-y-4 my-3">
      <div v-for="friend in filterDataFromPagination(selectPage, 15, numberOfFriends, friends.data)" v-bind:key="friend.id" class="w-full">
        <div class="flex flex-row justify-between items-center w-full border-2 px-8 py-4 rounded-xl bg-white">
          <div>เลขประจำตัว: {{ friend.id }}</div>
          <div>ชื่อจริง: {{ friend.fullName }}</div>
        </div>
      </div>
    </div>
    <Pagination
      v-bind:number-of-items="numberOfFriends"
      v-bind:max-page="Math.ceil(numberOfFriends / 15)"
      :select-page="selectPage"
      :onSelectPage="onSelectPage"
      :onNextPage="onNextPage"
      :onPrevPage="onPrevPage"
    />
  </div>
</template>
