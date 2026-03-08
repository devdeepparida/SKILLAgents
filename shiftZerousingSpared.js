const arr = [0,1,0,10,20,3]

console.log([...arr.filter(e => e!==0), ...arr.filter(e =>e ===0)])

let a=10;
let b=20;

b= a+b;
a= b-a;
b= b-a;

console.log(a)
console.log(b)