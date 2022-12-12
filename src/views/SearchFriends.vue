<script setup lang="ts">
import useSearchFriends from "../composables/useSearchFriends";
import _ from "lodash";
import useScroll from "../composables/useScroll";
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";
import useFriendStore from "../store/friends/useFriendStore";

const selectPage = ref<number>(0);
const [input, fetchAt] = useSearchFriends(selectPage);
const { friends, numberOfFriends } = storeToRefs(useFriendStore());
const isEmptyFriend = computed(() => {
  if (numberOfFriends.value === 0) {
    return true;
  }
  return false;
});
const [] = useScroll({ numberOfFriends: numberOfFriends, selectPage, fetchAt });
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
</script>
<template>
  <div class="flex flex-col justify-start items-center py-8 px-32 min-h-screen relative">
    <div class="hidden">{{ selectPage }}</div>
    <div class="font-bold text-2xl">ค้นหาเพื่อนจากชื่อ หรือ นามสกุล</div>
    <div class="flex flex-row justify-start items-center border border-[#DFDFDF] w-[80%] mx-6 px-6 gap-x-4 bg-[#F3F3F3] my-5 rounded-md py-3">
      <input class="focus:outline-none w-full bg-inherit" placeholder="Search" v-model="input" />
      <button class="bg-[#F4B3BB] px-10 py-2 rounded-md hover:bg-opacity-80 transition-[background-color]">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      </button>
    </div>
    <div class="flex flex-col justify-center items-center gap-y-4 my-3 w-[80%]">
      <div class="flex flex-row justify-between items-center w-full border-b border-b-[#DFDFDF] py-4 my-2 text-[rgba(0,0,0,0.4)]">
        <div class="w-[150px]">NAME</div>
        <div class="">ID</div>
        <div />
      </div>
      <div v-if="isEmptyFriend" class="w-full flex flex-col justify-center items-center">
        <div class="text-[20px] font-bold">Sorry we didn't find any friends in the database.</div>
      </div>
      <div v-for="friend in friends" v-bind:key="friend.id" class="w-full">
        <div class="flex justify-between items-center w-full py-4 rounded-xl">
          <div class="w-[250px]">{{ friend.fullName }}</div>
          <div class="">{{ friend.generationId }}</div>
          <router-link :to="{ path: `view-friend/${friend.id}` }">
            <button class="rounded-xl px-8 py-2 bg-blue-500 text-white font-semibold hover:bg-opacity-80 transition-colors duration-200">View</button>
          </router-link>
        </div>
      </div>
    </div>
    <button class="absolute bottom-[32px] right-[64px] w-12 h-12 rounded-full bg-blue-500 flex justify-center items-center" @click="scrollToTop">
      <font-awesome-icon icon="fa-solid fa-angles-up" class="text-white text-[20px]" />
    </button>
  </div>
</template>
