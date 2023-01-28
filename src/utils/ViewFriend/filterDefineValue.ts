const filterDefineValue = <T extends Object>(data: T) => {
  const filterArray = Object.entries(data).reduce((prev, curr) => {
    const [key, value] = curr;
    if (value) {
      return [...prev, curr];
    }
    return [...prev];
  }, [] as [string, any][]);
  return filterArray;
};

export default filterDefineValue;
