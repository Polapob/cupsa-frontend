<script setup lang="ts">
import { ref } from "vue";

interface InputFileEvent extends Event {
  target: HTMLInputElement;
}

const email = ref("");
const password = ref("");
const message = ref("");

function handleOnSubmit(email: string, password: string) {
  alert(`submit ${email} ${password}`);
}
</script>

<template>
  <h1 class="p-8 flex flex-col justify-center items-center gap-y-6">
    <div class="flex flex-col justify-center items-start">
      <div class="text-xl font-bold my-2 border-blue-600 border-b-2">Username</div>
      <input v-model="email" class="focus:outline-none border-2 text py-2 px-4 rounded-lg w-[300px]" />
    </div>
    <div class="flex flex-col justify-center items-start">
      <div class="text-xl font-bold my-2 border-blue-600 border-b-2">Password</div>
      <input type="password" v-model="password" class="focus:outline-none border-2 text py-2 px-4 rounded-lg w-[300px]" />
    </div>
    <button
      @click="() => handleOnSubmit(email, password)"
      class="border-2 w-[500px] my-4 py-2 rounded-xl bg-blue-400 hover:bg-opacity-80 font-bold transition-[background-color] duration-200"
    >
      Login
    </button>
  </h1>
</template>
