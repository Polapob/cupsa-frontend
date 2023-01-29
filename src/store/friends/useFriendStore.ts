import { AxiosError } from "axios";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import friendService from "../../services/FriendService";
import { LoadingStatus } from "../type";
import { FriendDataTypes } from "../../utils/Composables/useSearchFriends/type";
import processFriendData from "../../utils/FriendService/processFriendData";
import {
  PaginationMetadataTypes,
  SearchFriendMode,
} from "../../utils/FriendService/type";

const useFriendStore = defineStore("friend", () => {
  const friends = ref<FriendDataTypes[]>([]);
  const loadingStatus = ref<LoadingStatus>(LoadingStatus.IDLE);
  const errorMessage = ref<string>("");

  const numberOfFriends = computed(() => {
    return friends.value.length;
  });

  const searchFriends = async (
    page = 0,
    mode: SearchFriendMode,
    keyword = ""
  ) => {
    try {
      loadingStatus.value = LoadingStatus.LOADING;
      const response = await friendService.searchFriends(page, keyword, mode);
      if (!response) {
        return { paginationData: {} as PaginationMetadataTypes };
      }
      const { data, paginationData } = processFriendData(response);
      friends.value = page === 0 ? data : [...friends.value, ...data];
      loadingStatus.value = LoadingStatus.FINISH;
      return { paginationData };
    } catch (err) {
      loadingStatus.value = LoadingStatus.ERROR;
      const axiosError = err as AxiosError<{ message: string }>;
      loadingStatus.value = LoadingStatus.ERROR;
      errorMessage.value = axiosError.response?.data.message || "";
      return { paginationData: {} as PaginationMetadataTypes };
    }
  };

  return {
    friends,
    loadingStatus,
    errorMessage,
    numberOfFriends,
    searchFriends,
  };
});

export default useFriendStore;
