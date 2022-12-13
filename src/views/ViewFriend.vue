<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import friendService from "../services/FriendService";
import { ViewFriendResponse } from "../utils/FriendService/type";

const friendInfo = ref<ViewFriendResponse>({} as ViewFriendResponse);

onMounted(async () => {
  const router = useRoute();
  const studentId = router.path.split("/").slice(-1).toString();
  const friendData = await friendService.viewFriend(studentId);
  if (friendData) {
    friendInfo.value = friendData.data.result;
    console.log(friendInfo.value);
  }
});
</script>
<template>
  <div class="flex flex-col justify-start items-center">
    <div class="font-bold text-[28px] mb-4">ข้อมูลที่ได้จากการค้นหาข้อมูล</div>
    <div class="flex flex-col justify-center items-start w-3/4" v-if="friendInfo.first_name">
      <div class="font-bold text-[26px]">
        {{ friendInfo.prefix }} {{ friendInfo.first_name }} {{ friendInfo.last_name }} (รุ่นที่ {{ friendInfo.generation_id }})
      </div>

      <div class="text-[24px] my-4">ข้อมูลทั่วไป</div>
      <div class="flex flex-row justify-start items-center text-[18px] w-full p-2 bg-gray-100">
        <div class="w-[200px] font-bold">ชื่อ-สกุล ภาษาไทย</div>
        <div v-if="friendInfo.first_name">{{ friendInfo.first_name }} {{ friendInfo.last_name }}</div>
        <div v-else>ไม่ระบุ</div>
      </div>
      <div class="flex flex-row justify-start items-center text-[18px] w-full p-2">
        <div class="w-[200px] font-bold">ชื่อ-สกุล ภาษาอังกฤษ</div>
        <div v-if="friendInfo.first_name_eng">{{ friendInfo.first_name_eng }} {{ friendInfo.last_name_eng }}</div>
        <div v-else>ไม่ระบุ</div>
      </div>
      <div class="flex flex-row justify-start items-center text-[18px] w-full p-2 bg-gray-100">
        <div class="w-[200px] font-bold">สถานะ</div>
        <div v-if="friendInfo.is_member === '1'">เป็นสามัญสมาชิค</div>
        <div v-else>ไม่เป็นสามัญสมาชิค</div>
      </div>
      <div class="flex flex-row justify-start items-center text-[18px] w-full p-2">
        <div class="w-[200px] font-bold">รหัสประจำตัวนักเรียน</div>
        <div>{{ friendInfo.tu_id.split("-").splice(-1).toString() }}</div>
      </div>
      <div class="flex flex-row justify-start items-center text-[18px] w-full p-2 bg-gray-100">
        <div class="w-[200px] font-bold">เพศ</div>
        <div v-if="friendInfo.sex === 'f'">หญิง</div>
        <div v-else-if="friendInfo.sex === 'm'">ชาย</div>
        <div v-else>ไม่ระบุ</div>
      </div>
      <div class="flex flex-row justify-start items-center text-[18px] w-full p-2">
        <div class="w-[200px] font-bold">รุ่นที่</div>
        <div>{{ friendInfo.generation_id }}</div>
      </div>
    </div>
  </div>
</template>
