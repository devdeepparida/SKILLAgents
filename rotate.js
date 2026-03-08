function rotateArray(arr, k) {
  k = k % arr.length;

    console.log(...arr.slice(-k))
    console.log(...arr.slice(0, arr.length - k))
  return [...arr.slice(-k), ...arr.slice(0, arr.length - k)];
}

console.log(rotateArray([1, 2, 3, 4, 5, 6, 7], 3));