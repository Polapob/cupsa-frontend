<script setup lang="ts">
import useAuth from "../composables/useAuth.js";
const [handleOnSubmit, email, password] = useAuth();
</script>

<template>
  <div class="p-8 flex flex-col justify-center items-center gap-y-6 border-2 border-black min-h-[90vh]">
    <div class="flex flex-col justify-center items-center w-[500px] gap-y-8">
      <div class="text-3xl font-bold w-full text-start">Log In</div>

      <div class="flex flex-col justify-start items-center w-full gap-y-4">
        <div class="flex flex-col justify-center items-start w-full">
          <input v-model.trim.lazy="email" class="focus:outline-none border border-[#DFDFDF] text p-4 rounded-lg w-full bg-[#F3F3F3]" placeholder="Email" />
        </div>
        <div class="flex flex-col justify-center items-start w-full">
          <input
            type="password"
            v-model.trim.lazy="password"
            class="focus:outline-none border border-[#DFDFDF] p-4 rounded-lg w-full bg-[#F3F3F3]"
            placeholder="Password"
          />
        </div>
      </div>

      <div class="relative min-w-[550px] border-2 flex justify-center items-center h-16">
        <button
          @click="() => handleOnSubmit(email, password)"
          class="absolute py-3 rounded-xl text-[18px] text-white bg-blue-400 hover:bg-opacity-80 font-bold transition-all hover:py-[14px] hover:text-[20px] duration-200 w-[95%] hover:w-full bg-[rgba(244,179,187,1)]"
          onkeypress="()=>{console.log('onKeyPress')}"
        >
          Log In
        </button>
      </div>
    </div>
  </div>
</template>
