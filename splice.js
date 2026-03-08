const months = ["Jan", "March", "April", "June"];

//console.log(months.splice(0, 2, "March"));

console.log(months.splice(1,0, "FEB"));
console.log(months);
console.log(months.splice(4,0, "MAY"));
console.log(months);


console.log([...months.splice(3), ...months.splice(0, 3)])

function rotateArr(k){

    k= k % arr.length(); 
}
