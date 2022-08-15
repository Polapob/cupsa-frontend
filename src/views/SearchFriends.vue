<script setup lang="ts">
import useSearchFriends from "../composables/useSearchFriends";
import usePagination from "../composables/usePagination";
import { onMounted, onUnmounted, ref } from "vue";
import calculateScrollData from "../utils/Composables/useScroll/calculateScrollData";
import _ from "lodash";
const dataRef = ref<HTMLDivElement | null>(null);
const [selectPage] = usePagination();
const [friends, input, fetchAt] = useSearchFriends(selectPage);

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

function onScroll() {
  const { scrollPosition, bottomPosition, scrollRatio } = calculateScrollData();

  if (scrollRatio >= 0.8 && friends.data.length > 0 && selectPage.value < fetchAt.maxPage - 1) {
    selectPage.value++;
  }
}

const fn = _.debounce(() => {
  onScroll();
}, 300);

onMounted(() => {
  window.addEventListener("scroll", () => {
    fn();
  });
});

onUnmounted(() => {
  window.removeEventListener("scroll", () => {
    fn.cancel();
  });
});
</script>
<template>
  <div class="flex flex-col justify-start items-center p-8 bg-gray-200 min-h-screen relative" ref="dataRef">
    <div class="hidden">{{ selectPage }}</div>
    <div class="font-bold text-2xl">Show List of your friends</div>
    <div class="font-bold text-[20px] my-2">You can search your friends</div>
    <input class="my-5 rounded-md px-4 py-1 w-[300px] focus:outline-none" v-model.lazy="input" />
    {{ input }}
    <div class="flex flex-col justify-center items-start w-[700px] gap-y-4 my-3">
      <div v-for="friend in friends.data" v-bind:key="friend.id" class="w-full">
        <div class="flex flex-row justify-between items-center w-full border-2 px-8 py-4 rounded-xl bg-white">
          <div>เลขประจำตัว: {{ friend.id }}</div>
          <div>ชื่อจริง: {{ friend.fullName }}</div>
        </div>
      </div>
    </div>
    <button class="absolute bottom-[32px] right-[64px] w-12 h-12 rounded-full bg-blue-500 flex justify-center items-center" @click="scrollToTop">
      <font-awesome-icon icon="fa-solid fa-angles-up" class="text-white text-[20px]" />
    </button>
  </div>
</template>
