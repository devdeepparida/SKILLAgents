const students = [
  { name: "Alice",   marks: 75 },
  { name: "Bob",     marks: 45 },
  { name: "Charlie", marks: 90 },
  { name: "Diana",   marks: 55 },
  { name: "Eve",     marks: 82 },
];


const nums=[3,2,4,5,6];

const mulBy3= nums.map((num, i, arr)=>{
    console.log(arr[i])
    return num * 3 + i
})
console.log(mulBy3)

const mapdatagerterThen2=nums.map((num, i, arr)=>{
    return num>3;
})

const filterdatagerterThen2=nums.filter((num, i, arr)=>{

        return num > 3

})

console.log(mapdatagerterThen2)
console.log(filterdatagerterThen2)

const reduceData=nums.reduce((acc,curr, i, arr)=>{

        return acc+curr

})
console.log(reduceData)