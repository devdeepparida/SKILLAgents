function reverse(arr, start, end) {
  while (start < end) {
    let temp = arr[start];
    arr[start] = arr[end];
    arr[end] = temp;
    start++;
    end--;
  }
}
function rotateArray(arr, k) {
  k = k % arr.length;
  reverse(arr, 0, arr.length - 1);
  console.log(arr)
  
  return arr;
}



console.log(rotateArray([1, 2, 3, 4, 5, 6, 7], 3)); // [5, 6, 7, 1, 2, 3, 4]