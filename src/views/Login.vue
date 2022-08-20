<script setup lang="ts">
import { computed } from "vue";
import useAuth from "../composables/useAuth";
import validateLoginForm from "../utils/Login/validateLoginForm";
import useEnterPress from "../composables/useEnterPress";
import userStore from "../store/user/model";
import Navbar from "../components/Navbar/Navbar.vue";
import Observer from "mobx-vue-lite";
const [handleOnSubmit, email, password] = useAuth();

console.log(userStore.getFirstName, " ", userStore.checkMemberStatus);
const [buttonRef, handleEnterpress] = useEnterPress();

const isInputValid = computed(() => {
  return validateLoginForm({ email: email.value, password: password.value });
});
</script>

<template>
  <Navbar />
  <div class="p-8 flex flex-col justify-center items-center gap-y-6 min-h-[90vh] bg-[url('/background/loginBackground.png')]">
    <div class="flex flex-col justify-center items-center w-[500px] gap-y-8" @keyup.enter="handleEnterpress()">
      <div>Member Status {{ userStore.checkMemberStatus }}</div>
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

      <div class="relative min-w-[550px] flex justify-center items-center h-16">
        <button
          ref="buttonRef"
          @click="() => handleOnSubmit(email, password)"
          :disabled="!isInputValid"
          :class="[
            'absolute py-3 rounded-xl text-[18px] text-white font-bold transition-all duration-200 w-[95%] bg-[rgba(244,179,187,1)]',
            isInputValid ? 'hover:bg-opacity-80 hover:py-[14px] hover:text-[20px] hover:w-full' : 'disabled:bg-gray-500',
          ]"
        >
          Log In
        </button>
      </div>
    </div>
  </div>
</template>
