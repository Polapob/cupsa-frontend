export type PaginationMetadataTypes = Record<"page" | "numberItemsInPage" | "numberOfItems" | "maxPage", number>;

export interface IPaginationResult {
  startIdx: number;
  endIdx: number;
}
