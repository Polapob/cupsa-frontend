<script setup lang="ts">
import useSearchFriends from "../composables/useSearchFriends";
import _ from "lodash";
import useScroll from "../composables/useScroll";
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";
import useFriendStore from "../store/friends/useFriendStore";
import useUserStore from "../store/user/useUserStore";
import { SearchFriendMode } from "../utils/FriendService/type";

const selectPage = ref<number>(0);
const searchMode = ref<SearchFriendMode>("my-generation");
const [input, fetchAt] = useSearchFriends(selectPage, searchMode);
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

const { checkMemberStatus } = useUserStore();
</script>
<template>
  <div
    class="flex flex-col justify-start items-center py-8 lg:px-32 px-3 min-h-screen relative">
    <div class="hidden">{{ selectPage }}</div>
    <div class="font-bold lg:text-2xl text-20 leading-7">
      ค้นหาเพื่อนจากชื่อ หรือ นามสกุล
      <span v-if="searchMode === 'my-generation'">ในรุ่นเดียวกัน</span>
      <span v-if="searchMode === 'all-generation'">กับเพื่อนทุกรุ่น</span>
    </div>
    <div
      class="flex flex-row justify-start items-center border border-[#DFDFDF] sm:w-[80%] w-[90%] mx-6 px-6 gap-x-4 bg-[#F3F3F3] my-5 rounded-md py-3">
      <input
        class="focus:outline-none w-full bg-inherit"
        placeholder="Search"
        v-model="input" />
    </div>

    <div
      v-if="checkMemberStatus"
      class="flex flex-row justify-center items-center gap-x-4">
      <input
        v-model="searchMode"
        type="radio"
        value="my-generation"
        id="my-generation" />
      <label for="my-generation">ค้นหาเพื่อนในรุ่นเดียวกัน</label>
      <input
        v-model="searchMode"
        type="radio"
        value="all-generation"
        id="all-generation" />
      <label for="all-generation">ค้นหาเพื่อนทุกรุ่น</label>
    </div>

    <div
      class="flex flex-col justify-center items-center gap-y-4 my-3 lg:w-[80%] w-full px-3">
      <div
        class="flex flex-row justify-between items-center w-full border-b border-b-[#DFDFDF] py-4 my-2 text-[rgba(0,0,0,0.4)]">
        <div class="lg:w-[150px] w-[135px]">NAME</div>
        <div class="">ID</div>
        <div />
      </div>
      <div
        v-if="isEmptyFriend"
        class="w-full flex flex-col justify-center items-center">
        <div class="sm:text-20 text-16 font-bold">
          ไม่พบเพื่อนที่มีชื่อตรงกับที่คุณกรอก
        </div>
      </div>
      <div v-for="(friend, index) in friends" v-bind:key="index" class="w-full">
        <div class="flex justify-between items-center w-full py-4 rounded-xl">
          <div class="lg:w-[250px] w-[200px] sm:text-16 text-14">
            {{ friend.fullName }}
          </div>
          <div class="">{{ friend.generationId }}</div>
          <router-link :to="{ path: `view-friend/${friend.id}` }">
            <button
              class="rounded-xl lg:px-8 px-4 py-2 bg-blue-500 text-white font-semibold hover:bg-opacity-80 transition-colors duration-200 sm:text-16 text-14"
              :class="{ invisible: !friend.canView }">
              View
            </button>
          </router-link>
        </div>
      </div>
    </div>
    <button
      class="fixed bottom-[32px] sm:right-[64px] right-5 w-12 h-12 rounded-full bg-blue-500 flex justify-center items-center"
      @click="scrollToTop">
      <font-awesome-icon
        icon="fa-solid fa-angles-up"
        class="text-white text-20" />
    </button>
  </div>
</template>
