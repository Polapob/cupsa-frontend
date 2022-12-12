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
  <div class="flex flex-col justify-center items-center">
    <div class="font-bold text-[20px]">ข้อมูลที่ได้จากการค้นหาข้อมูล</div>
    <div>Triamudom ID = {{ friendInfo.tu_id && friendInfo.tu_id.split("-").slice(-1).toString() }}</div>
    <div>เตรียมอุดมรุ่นที่ {{ friendInfo.tu_id && friendInfo.tu_id.split("-")[0].toString() }}</div>
    <div v-if="friendInfo.is_member === '1'">เป็นสามัญสมาชิก</div>
    <div v-else>ไม่เป็นสามัญสมาชิก</div>
    <div>ชื่อ: {{ friendInfo.first_name }}</div>
    <div>นามสกุล: {{ friendInfo.last_name }}</div>
  </div>
</template>
