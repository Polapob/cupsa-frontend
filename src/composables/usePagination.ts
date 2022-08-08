import { computed, onUpdated, reactive, ref, watch } from "vue";
import calculatePaginationResult from "../utils/Composables/usePagination/calculatePaginationResult";
import { IPaginationResult } from "../utils/Composables/usePagination/type";

const usePagination = (maxPage: number, numberItemsInPage: number, numberOfItems: number) => {
  const paginationMetadata = ref({ page: 1, numberItemsInPage, numberOfItems, maxPage });

  const nextPage = () => {
    if (paginationMetadata.value.page <= paginationMetadata.value.maxPage) {
      paginationMetadata.value.page++;
    }
  };

  watch(paginationMetadata, () => {});

  const selectPage = (page: number) => {
    paginationMetadata.value.page = page;
  };

  const previousPage = () => {
    if (paginationMetadata.value.page - 1 >= 0) {
      paginationMetadata.value.page--;
    }
  };

  onUpdated(() => {
    console.log(maxPage, numberItemsInPage, numberOfItems);
    paginationMetadata.value.numberOfItems = numberOfItems;
    paginationMetadata.value.maxPage = Math.ceil(numberOfItems / paginationMetadata.value.numberItemsInPage);
  });

  const paginationResult = computed<IPaginationResult>(() => {
    return calculatePaginationResult(paginationMetadata);
  });

  return [paginationMetadata, paginationResult, nextPage, selectPage, previousPage] as const;
};

export default usePagination;
