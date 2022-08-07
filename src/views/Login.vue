<script setup lang="ts">
import useAuth from "../composables/useAuth.js";
const [handleOnSubmit, email, password] = useAuth();
</script>

<template>
  <div class="p-8 flex flex-col justify-start items-center gap-y-6 bg-gray-200 min-h-screen">
    <div class="flex flex-col justify-center items-start">
      <div class="text-xl font-bold my-2 border-blue-600 border-b-2">Email</div>
      <input v-model.trim.lazy="email" class="focus:outline-none border-2 text py-2 px-4 rounded-lg w-[300px]" />
    </div>
    <div class="flex flex-col justify-center items-start">
      <div class="text-xl font-bold my-2 border-blue-600 border-b-2">Password</div>
      <input type="password" v-model.trim.lazy="password" class="focus:outline-none border-2 text py-2 px-4 rounded-lg w-[300px]" />
    </div>
    <button
      @click="() => handleOnSubmit(email, password)"
      class="border-2 w-[500px] my-4 py-2 rounded-xl bg-blue-400 hover:bg-opacity-80 font-bold transition-[background-color] duration-200"
    >
      Login
    </button>
  </div>
</template>
