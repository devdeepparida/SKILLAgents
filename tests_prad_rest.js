let num1=[1,2,7,9]
let num2=[6,7,8,8]
let a="AbS";
const fNum=[...num1, ...num2]
const sum= ( ...num)=>{ return num } 
console.log(sum( a, num1,num2));
console.log(fNum);