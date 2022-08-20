import { computed, onUpdated, reactive, ref, watch } from "vue";
import calculatePaginationResult from "../utils/Composables/usePagination/calculatePaginationResult";
import { IPaginationResult } from "../utils/Composables/usePagination/type";

const usePagination = () => {
  const selectPage = ref(0);
  const incrementPage = () => {
    selectPage.value++;
  };
  return [selectPage, incrementPage] as const;
};

export default usePagination;
