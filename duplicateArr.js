let arr=[1, 1, 2, 2, 3, 4, 4, 5];
// Using filter with indexOf to find the repeated elements
// indexof --> returns index of fist occuerence 
a1 = arr.filter((item, index) => arr.indexOf(item) === index);
console.log(a1);
