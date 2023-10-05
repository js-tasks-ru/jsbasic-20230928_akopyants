function factorial(n) {
  if (n === 0 || n === 1) {
    return 1;
  }

  let result = 1;

  for (let i = n; i != 0; i--) {
    result *= i;
  }
  
  return result;
}
