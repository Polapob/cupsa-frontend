<script setup lang="ts">
import { storeToRefs } from "pinia";
import useUserStore from "../../store/user/useUserStore";

const userStore = useUserStore();
const { getFirstName, checkMemberStatus, isUserLogin } = storeToRefs(userStore);
const { logout } = userStore;
</script>
<template>
  <div
    class="flex flex-row w-full justify-between items-center sm:gap-8 gap-4 py-4 mb-4 lg:px-8 px-3 bg-white">
    <div class="flex flex-row justify-start items-center gap-x-3">
      <img src="/icon/CUPSAA.png" class="w-10 h-10" />
      <div class="font-bold text-20 hidden">CUPSAA</div>
    </div>
    <div
      class="flex flex-row justify-start items-center gap-x-6"
      v-if="!getFirstName">
      <router-link
        to="/login"
        class="lg:w-[150px] w-[100px] text-center rounded-lg font-bold py-2 text-white bg-[rgba(244,179,187,1)] transition-[background-color] duration-200 hover:bg-[rgba(244,179,187,0.85)]">
        <div class="font-bold">Log in</div>
      </router-link>
      <a
        class="lg:w-[150px] w-[100px] py-2 rounded-lg font-bold hover:bg-gray-200 text-center transition-[background-color] duration-200"
        href="https://www.triamudom-alumni.org/member/user/registration"
        target="_blank"
        >Sign up</a
      >
    </div>
    <div
      class="flex flex-row justify-start items-center gap-x-2 sm:text-16 text-14 font-bold"
      v-else>
      <div>{{ getFirstName }}</div>
      <div>|</div>
      <div
        class="flex flex-row justify-start items-center gap-x-1 sm:text-16 text-14">
        <div v-if="checkMemberStatus">สามัญสมาชิก</div>
        <div v-else>ไม่เป็นสามัญสมาชิก</div>
      </div>
      <div
        :class="[
          'p-[4.5px] rounded-full',
          checkMemberStatus ? 'bg-green-500' : 'bg-[#F14C80]',
        ]"></div>
      <button
        v-if="isUserLogin"
        @click="logout"
        class="sm:ml-4 px-4 py-2 bg-red-500 text-white font-bold rounded-[12px] sm:text-16 text-14">
        Logout
      </button>
    </div>
  </div>
</template>
