<script setup lang="ts">
import useSearchFriends from "../composables/useSearchFriends";
import usePagination from "../composables/usePagination";
import Navbar from "../components/Navbar/Navbar.vue";
import _ from "lodash";
import useScroll from "../composables/useScroll";
import Observer from "mobx-vue-lite";
import friendStore from "../store/friends/model";
import { getSnapshot } from "mobx-state-tree";
const [selectPage] = usePagination();

const [input, fetchAt] = useSearchFriends(selectPage);
const { friends } = getSnapshot(friendStore);
console.log(friends.length);
const [] = useScroll({ numberOfFriends: friends.length, selectPage, fetchAt });

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
</script>
<template>
  <Navbar />
  <div class="flex flex-col justify-start items-center py-8 px-32 min-h-screen relative">
    <div class="hidden">{{ selectPage }}</div>
    <div class="flex flex-col justify-center items-center">{{ friends.length }}</div>
    <div class="font-bold text-2xl">ค้นหาเพื่อนจากชื่อ หรือ นามสกุล</div>
    <div class="flex flex-row justify-start items-center border border-[#DFDFDF] w-[80%] mx-6 px-6 gap-x-4 bg-[#F3F3F3] my-5 rounded-md py-3">
      <img src="/icon/SearchIcon.svg" class="w-6 h-6" />
      <input class="focus:outline-none w-full bg-inherit" placeholder="Search" v-model="input" />
    </div>
    <div class="flex flex-col justify-center items-start gap-y-4 my-3 w-[80%]">
      <div class="grid grid-cols-12 justify-start items-center w-full border-b border-b-[#DFDFDF] py-4 my-2">
        <div class="text-[rgba(0,0,0,0.4)] col-span-5">NAME</div>
        <div class="text-[rgba(0,0,0,0.4)] col-span-5">ID</div>
        <div class="text-[rgba(0,0,0,0.4)] col-span-2">STATUS</div>
      </div>
      <div v-for="friend in friends" v-bind:key="friend.id" class="w-full">
        <div class="grid grid-cols-12 justify-between items-center w-full py-4 rounded-xl w-f">
          <div class="col-span-5">{{ friend.fullName }}</div>
          <div class="col-span-5">{{ friend.id }}</div>
          <div class="col-span-2 flex flex-row justify-start items-center gap-x-[14px]">
            <div class="p-[4.5px] rounded-full bg-[#15C183]"></div>
            <div>สามัญสมาชิก</div>
          </div>
        </div>
      </div>
    </div>
    <button class="absolute bottom-[32px] right-[64px] w-12 h-12 rounded-full bg-blue-500 flex justify-center items-center" @click="scrollToTop">
      <font-awesome-icon icon="fa-solid fa-angles-up" class="text-white text-[20px]" />
    </button>
  </div>
</template>
