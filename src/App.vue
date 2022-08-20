<script setup lang="ts">
import { onUpdated, ref, watch } from "vue";
import { onMounted } from "vue-demi";
import userService from "./services/UserService";
import { UserResult } from "./utils/UserService/type";
import { getSnapshot } from "mobx-state-tree";
import userStore from "./store/user/model";

const userData = ref<UserResult>({} as UserResult);
const { checkMemberStatus, getFirstName } = userStore;
//console.log(fetchUserData);

/*onUpdated(() => {
  const fetchStateSnapshot = () => {
    const snapshot = getSnapshot(store);
    console.log("snapshot =", snapshot);
  };
  fetchStateSnapshot();
}); */

console.log(userStore.getFirstName);

/*watch(, () => {
  console.log("globalStore =", globalStore.value.user.getFirstName);
}); */
</script>

<template>
  <div class="flex flex-row w-full justify-between items-center gap-8 py-4 mb-4 px-8 bg-white">
    <div class="flex flex-row justify-start items-center gap-x-3">
      <img src="/icon/CUPSAA.png" class="w-10 h-10" />
      <div class="font-bold text-[20px]">CUPSAA</div>
    </div>
    <div class="flex flex-row justify-start items-center gap-x-6" v-if="!getFirstName">
      <router-link
        to="/login"
        class="w-[150px] text-center rounded-lg font-bold py-2 text-white bg-[rgba(244,179,187,1)] transition-[background-color] duration-200 hover:bg-[rgba(244,179,187,0.85)]"
      >
        <div class="font-bold">Log in</div>
      </router-link>
      <a
        class="w-[150px] py-2 rounded-lg font-bold hover:bg-gray-200 text-center transition-[background-color] duration-200"
        href="https://www.triamudom-alumni.org/member/user/registration"
        target="_blank"
        >Sign up</a
      >
    </div>
    <div class="flex flex-row justify-start items-center gap-x-2" v-else>
      <div>{{ getFirstName }}</div>
      <div>|</div>
      <div class="flex flex-row justify-start items-center gap-x-1">
        <div v-if="parseInt(userData.is_member)">สามัญสมาชิก</div>
        <div v-else>ไม่เป็นสามัญสมาชิก</div>
      </div>
      <div :class="['p-[4.5px] rounded-full', parseInt(userData.is_member) ? 'bg-green-500' : 'bg-[#F14C80]']"></div>
    </div>
  </div>
  <router-view />
</template>
