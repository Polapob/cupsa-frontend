const calculatePaginationResult = (page: number, itemsPerPage: number, numberOfItems: number) => {
  const startAt = (page - 1) * itemsPerPage;
  const endAt = Math.min(numberOfItems, startAt + itemsPerPage);
  return { startAt, endAt };
};

const filterDataForPagination = (page: number, itemsPerPage: number, numberOfItems: number, data: Array<any>) => {
  const { startAt, endAt } = calculatePaginationResult(page, itemsPerPage, numberOfItems);
  return data.slice(startAt, endAt);
};

export default filterDataForPagination;
