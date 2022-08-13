import { computed, onUpdated, reactive, ref, watch } from "vue";
import calculatePaginationResult from "../utils/Composables/usePagination/calculatePaginationResult";
import { IPaginationResult } from "../utils/Composables/usePagination/type";

const usePagination = () => {
  const selectPage = ref(1);
  const onSelectPage = (page: number) => {
    selectPage.value = page;
  };
  const onNextPage = () => {
    selectPage.value++;
  };
  const onPrevPage = () => {
    selectPage.value--;
  };
  return [selectPage, onSelectPage, onNextPage, onPrevPage] as const;
};

export default usePagination;
