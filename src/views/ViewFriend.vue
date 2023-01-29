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
  }
});
</script>
<template>
  <div class="flex flex-col justify-start items-center pb-10">
    <div class="flex justify-center items-center relative w-full">
      <button
        @click="$router.go(-1)"
        class="flex-1 bg-red-500 sm:text-16 text-14 text-white py-2 sm:px-4 px-4 rounded-lg transition-colors hover:bg-opacity-80 absolute left-0">
        Back
      </button>
      <div class="font-bold md:text-28 sm:text-24 text-20 h-full">
        ข้อมูลที่ได้จากการค้นหาข้อมูล
      </div>
    </div>

    <div
      class="flex flex-col justify-center items-start xl:w-[1000px] w-full gap-y-3 px-3"
      v-if="friendInfo.isShowGeneral">
      <div
        class="font-bold md:text-24 md:leading-9 sm:text-20 sm:leading-[30px] my-4">
        {{ friendInfo.availableData.prefix }}
        {{ friendInfo.availableData.first_name }}
        {{ friendInfo.availableData.last_name }}
        (รุ่น {{ friendInfo.availableData.generation_id }})
      </div>
      <DisplayData
        v-if="friendInfo.isShowGeneral"
        title="ข้อมูลทั่วไป"
        :data="friendInfo.generalInfo" />
      <DisplayData
        v-if="friendInfo.isShowContact"
        title="ข้อมูลการติดต่อ"
        :data="friendInfo.contactInfo" />
      <DisplayData
        v-if="friendInfo.isShowEducation"
        title="ข้อมูลการศึกษา"
        :data="friendInfo.educationInfo" />
      <DisplayData
        v-if="friendInfo.isShowAddress"
        title="ข้อมูลที่อยู่"
        :data="friendInfo.addressInfo" />
      <DisplayData
        v-if="friendInfo.isShowOffice"
        title="ข้อมูลที่ทำงาน"
        :data="friendInfo.officeInfo" />
    </div>
  </div>
</template>
