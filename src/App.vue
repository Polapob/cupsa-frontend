<script setup lang="ts">
const getImageUrl = (name: string) => {
  return new URL(`../${name}`, import.meta.url).href;
};
</script>

<template>
  <div class="flex flex-row w-full justify-between items-center gap-8 py-4 mb-4 px-8 bg-white">
    <div class="flex flex-row justify-start items-center gap-x-3">
      <img :src="getImageUrl('/icon/CUPSAA.png')" class="w-10 h-10" />
      <div class="font-bold text-[20px]">CUPSAA</div>
    </div>
    <div class="flex flex-row justify-start items-center gap-x-6">
      <router-link to="/login" class="w-[150px] py-2 rounded-lg hover:bg-gray-200 text-center transition-[background-color] duration-200">
        <div class="font-bold">Log in</div>
      </router-link>
      <a
        class="w-[150px] text-center rounded-lg py-2 text-white bg-[rgba(244,179,187,1)] transition-[background-color] duration-200 hover:bg-[rgba(244,179,187,0.85)]"
        href="https://www.triamudom-alumni.org/member/user/registration"
        target="_blank"
        >Sign up</a
      >
    </div>
  </div>
  <router-view />
</template>
