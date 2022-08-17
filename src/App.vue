<script setup lang="ts">
import { ref } from "vue";
import { onMounted } from "vue-demi";
import userService from "./services/UserService";
import { UserResult } from "./utils/UserService/type";

const getImageUrl = (name: string) => {
  console.log(new URL(`../${name}`, import.meta.url).href);
  return new URL(`${name}`, import.meta.url).href;
};

const userData = ref<UserResult>({} as UserResult);

onMounted(() => {
  const fetchData = async () => {
    const response = await userService.getUserProfile();
    if (response) {
      const {
        data: { result },
      } = response;
      console.log(result);
      console.log(Boolean(userData.value.is_member));
      userData.value = result;
    }
  };
  fetchData();
});
</script>

<template>
  <div class="flex flex-row w-full justify-between items-center gap-8 py-4 mb-4 px-8 bg-white">
    <div class="flex flex-row justify-start items-center gap-x-3">
      <img :src="getImageUrl('/icon/CUPSAA.png')" class="w-10 h-10" />
      <div class="font-bold text-[20px]">CUPSAA</div>
    </div>
    <div class="flex flex-row justify-start items-center gap-x-6" v-if="!userData.email">
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
      <div>{{ userData.first_name }}</div>
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
