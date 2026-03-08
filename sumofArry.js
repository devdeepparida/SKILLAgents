let arr = [12,3,4,5,67,3]

console.log(arr.reduce((acc, curr)=> acc+curr))

let arrNumString = [12,45,3,"cc",4,5,67,3, "ab"]

function sumOfNumArryValue(arr){

    return arr.filter(e => typeof(e)==="number").reduce((acc, curr)=> acc+curr)
}

console.log(sumOfNumArryValue(arrNumString))