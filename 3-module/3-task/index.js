function ucFirst(str) {
  return str.length ? `${str[0].toUpperCase()}${str.slice(1)}` : '';
}

function camelize(str) {
  return str
    .split('-')
    .map((item, index) => index !== 0 ? ucFirst(item) : item)
    .join('');
}
