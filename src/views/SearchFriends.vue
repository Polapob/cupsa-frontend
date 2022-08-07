<script setup lang="ts">
import useFetchFriends from "../composables/useFetchFriends";
import LoadingModal from "../components/Modal/LoadingModal.vue";
const [friends] = useFetchFriends();
</script>
<template>
  <div class="flex flex-col justify-start items-center p-8 bg-gray-200 min-h-screen">
    <div class="font-bold text-2xl">Show List of your friends</div>
    <div class="font-bold text-[20px] my-2">You can search your friends</div>
    <LoadingModal />
    <input class="my-5 rounded-md px-4 py-1 w-[300px] focus:outline-none" />
    <div class="flex flex-col justify-center items-start w-[700px] gap-y-4">
      <div v-for="friend in friends.data" v-bind:key="friend.id" class="w-full">
        <div class="flex flex-row justify-between items-center w-full border-2 px-8 py-4 rounded-xl bg-white">
          <div>เลขประจำตัว: {{ friend.id }}</div>
          <div>ชื่อจริง: {{ friend.fullName }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
