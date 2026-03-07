const nums=[3,2,4,5,6];
//.map--> transform each element return new arry 

const mulBy3= nums.map((num, i, arr)=>{
    console.log(arr[i])
    return num * 3 + i
})
console.log(mulBy3)

const mapdatagerterThen2=nums.map((num, i, arr)=>{
    return num>3;
})

//.filter--> based on condition return new array 
const filterdatagerterThen2=nums.filter((num, i, arr)=>{
    return num > 3
})

console.log(mapdatagerterThen2)
console.log(filterdatagerterThen2)
//.reduced --> accumulate into one value 
const reduceData=nums.reduce((acc,curr, i, arr)=>{
     return acc+curr
})
console.log(reduceData)

//.push --> add ele at the end
const arr=[2,3,4,7,8]
arr.push(10)
console.log(arr)
//.pop --> delete last element
arr.pop();
console.log(arr)
//.unshift --> add on top
arr.unshift(10);
console.log(arr)
//.shift --> remove from top
arr.shift();
console.log(arr)
//.some --> returns true if at least one element matches
console.log(arr.some(e=>e>3))
//.every --> returns true only if all elements match
console.log(arr.every(e=>e>1));
//.find --> returns the first matching element
console.log(arr.find(e => e>5))
//.concat -->merge arrays without mutating originals
const arr2=[10,2,3,55]
const arr3= arr.concat(arr2)
console.log(arr3)
//.slice --> extract a portion from array(Example: arr.slice(start index, end index-1))
const slicarr=arr3.slice(1,5)
console.log(arr3)
console.log(slicarr)
//.splice -->  remove or insert in place
const arrV=[5,4,6,7,8,9,0]
remove=arrV.splice(3,2)
console.log(remove)
console.log(arrV)
//.fill --> fill with a value

//.findindex --> index of first matching element


//.flat — flatten nested arrays

const nested = [1, [2, 3], [4, [5, 6]]];

console.log(nested.flat(2));
//console.log(nested.flat(2));

//.reverse — reverse in place

//.sort — sort in place