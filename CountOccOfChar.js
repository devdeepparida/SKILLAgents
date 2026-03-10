let str= "devdeep parida Welcome"
str= str.replace(/\s+/g, '')
console.log(str);
let count= new Map()

for(let char of str){

    count.set(char,(count.get(char)|| 0)+1)
}
  const uniques = [];
for (const [key, val] of count.entries()) {
  
    if (val === 1) uniques.push(key);
    
}

console.log(count)
console.log(uniques)