const arr=[12,35,7,4,7,34,9]

function secondLargestNumber(arr){
    let largestNum = Number.NEGATIVE_INFINITY;
    let secondLargestNum = Number.NEGATIVE_INFINITY;

    for (let index = 0; index < arr.length; index++) {
        if(arr[index] > largestNum){
            secondLargestNum = largestNum;
            largestNum = arr[index];
        }
        else if(arr[index] != largestNum && arr[index] > secondLargestNum){
            secondLargestNum = arr[index];
        }
    }
    return secondLargestNum;
}

console.log(secondLargestNumber([12,35,35,7,4,7,34,9]));