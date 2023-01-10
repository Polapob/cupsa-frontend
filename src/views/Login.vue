<script setup lang="ts">
import useAuth from "../composables/useAuth";
import useEnterPress from "../composables/useEnterPress";
import LoadingModalVue from "../components/Modal/LoadingModal.vue";
import { useRoute, useRouter } from "vue-router";
import useUserStore from "../store/user/useUserStore";

const { handleOnSubmit, username, password, isLoading, isError } = useAuth();
const { isUserLogin } = useUserStore();
const [buttonRef, handleEnterpress] = useEnterPress();
const router = useRouter();

if (isUserLogin) {
  router.push("/search-friends");
}
</script>

<template>
  <div class="p-8 flex flex-col justify-center items-center gap-y-6 min-h-[90vh] bg-[url('/background/loginBackground.png')]">
    <div class="flex flex-col justify-center items-center lg:w-[500px] w-full gap-y-8" @keyup.enter="handleEnterpress">
      <div class="text-3xl font-bold w-full text-start">Log In</div>
      <div class="flex flex-col justify-start items-center w-full gap-y-4">
        <div class="flex flex-col justify-center items-start w-full">
          <input
            v-model.trim.lazy="username"
            class="focus:outline-none border border-[#DFDFDF] text p-4 rounded-lg w-full bg-[#F3F3F3]"
            placeholder="Username or Email"
          />
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

      <div class="relative lg:w-[550px] w-full flex justify-center items-center h-16">
        <button
          ref="buttonRef"
          :disabled="isLoading"
          @click="
            async () => {
              handleOnSubmit({ username, password });
            }
          "
          :class="[
            'absolute py-3 rounded-xl text-[18px] text-white font-bold transition-all duration-200 w-[95%] bg-[#f4b3bb]',
            'hover:bg-opacity-80 hover:py-[14px] hover:text-[20px] hover:w-full',
          ]"
        >
          Log In
        </button>
      </div>
    </div>
    <div v-if="isLoading">
      <LoadingModalVue />
    </div>
  </div>
</template>
