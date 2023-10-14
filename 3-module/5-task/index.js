function getMinMax(str) {
  const filteredString = str.split(' ').filter(item => !isNaN(item));
  const min = Math.min(...filteredString);
  const max = Math.max(...filteredString);

  return { min, max };
}