<script setup lang="ts">
import useFetchFriends from "../composables/useFetchFriends";

const [friends] = useFetchFriends();
</script>
<template>
  <div class="flex flex-col justify-center items-center p-8">
    <div class="font-bold text-2xl">Show List of your friends</div>
    <div class="font-bold text-[20px] my-2">You can search your friends</div>
    <input />
    <div class="flex flex-col justify-center items-start w-[500px] gap-y-3">
      <div v-for="(friend, index) in friends.data" v-bind:key="friend.id" class="w-full">
        <div class="flex flex-row justify-between items-center w-full">
          <div>id: {{ friend.id }}</div>
          <div>fullname: {{ friend.fullName }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
