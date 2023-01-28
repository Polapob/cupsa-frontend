<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import friendService from "../services/FriendService";
import friendDataAdapter, {
  FriendDataAdapterResult,
} from "../utils/ViewFriend/friendDataAdapter";
import DisplayData from "../components/ViewFriend/DisplayData.vue";

const friendInfo = ref<FriendDataAdapterResult>({} as FriendDataAdapterResult);

onMounted(async () => {
  const router = useRoute();
  const studentId = router.path.split("/").slice(-1).toString();
  const friendData = await friendService.viewFriend(studentId);
  if (friendData) {
    friendInfo.value = friendDataAdapter(friendData.data.result);
    console.log(friendDataAdapter(friendData.data.result));
  }
});
</script>
<template>
  <div class="flex flex-col justify-start items-center">
    <div class="flex justify-center items-center relative w-full">
      <button
        @click="$router.go(-1)"
        class="flex-1 bg-red-500 text-[16px] leading-6 text-white py-2 px-4 rounded-lg transition-colors hover:bg-opacity-80 absolute left-0">
        Back
      </button>
      <div class="font-bold text-[28px] h-full">
        ข้อมูลที่ได้จากการค้นหาข้อมูล
      </div>
    </div>
    <div
      class="flex flex-col justify-center items-start w-[500px]"
      v-if="friendInfo.isShowGeneral">
      <div>
        <div class="font-bold text-[24px] leading-9">
          {{ friendInfo.availableData.prefix }}
          {{ friendInfo.availableData.first_name }}
          {{ friendInfo.availableData.last_name }}
          (รุ่น {{ friendInfo.availableData.generation_id }})
        </div>
      </div>
      <DisplayData title="ข้อมูลทั่วไป" :data="friendInfo.generalInfo" />
    </div>
  </div>
</template>
