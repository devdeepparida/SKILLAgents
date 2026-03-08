function isPrime(n) {
  if (n < 2) {
    return false;
  }
  if (n % 2 === 0) {
    return n === 2;
  }
  for (let factor = 3; factor * factor <= n; factor += 2) {
    if (n % factor === 0) {
      return false;
    }
  }
  return true;
}
console.log(isPrime(97))
//console.log([4, 6, 8, 12].find(isPrime)); // undefined, not found
console.log([4, 5, 8, 12].find(isPrime)); // 5

const arr=[4, 6, 12,8, 12];
console.log(arr.find(e => e ===12))
console.log(arr.findIndex(e => e ===12))
console.log(arr.findLast(e => e ===12))
console.log(arr.findLastIndex(e => e ===12))