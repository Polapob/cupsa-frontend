const calculateScrollData = () => {
  const scrollPosition = window.pageYOffset;
  const bottomPosition = document.body.clientHeight - document.documentElement.clientHeight;
  const scrollRatio = scrollPosition / bottomPosition;
  return { scrollPosition, bottomPosition, scrollRatio };
};

export default calculateScrollData;
