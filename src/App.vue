<script setup lang="ts"></script>

<template>
  <div class="flex flex-row w-full justify-between items-center gap-8 px-8 bg-[#55AAFF]">
    <div class="font-bold text-2xl">CUPSAA</div>
    <div class="flex flex-row justify-start items-center gap-x-6">
      <router-link to="/" class="p-4 border-b-4 border-[#55AAFF] hover:border-b-4 hover:border-[#00008B] transition-[border-color] duration-200">
        <div class="font-bold">Home</div>
      </router-link>
      <router-link to="/login" class="p-4 border-b-4 border-[#55AAFF] hover:border-b-4 hover:border-[#00008B] transition-[border-color] duration-200">
        <div class="font-bold">Login</div>
      </router-link>
      <router-link to="/search-friends" class="p-4 border-b-4 border-[#55AAFF] hover:border-b-4 hover:border-[#00008B] transition-[border-color] duration-200">
        <div class="font-bold">Search Friends</div>
      </router-link>
      <router-link
        to="/check-member-status"
        class="p-4 border-b-4 border-[#55AAFF] hover:border-b-4 hover:border-[#00008B] transition-[border-color] duration-200"
      >
        <div class="font-bold">Status</div>
      </router-link>
    </div>
  </div>
  <router-view />
</template>
