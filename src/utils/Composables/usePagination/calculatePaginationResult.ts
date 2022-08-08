import { Ref } from "vue";
import { PaginationMetadataTypes } from "./type";

const calculatePaginationResult = (paginationMetadata: Ref<PaginationMetadataTypes>) => {
  const { page, numberItemsInPage, numberOfItems } = paginationMetadata.value;
  const startIdx = (page - 1) * numberItemsInPage;
  const endIdx = Math.min(page * numberItemsInPage, numberOfItems);
  return { startIdx, endIdx };
};

export default calculatePaginationResult;
