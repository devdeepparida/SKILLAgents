function isBigEnough(value) {
  return value >= 10;
}
function isSamllEnough(value){
    return value<10
}
const filtered = [12, 5, 8, 130, 44].filter(isBigEnough);
const filtered2 = [12, 5, 8, 130, 44].filter(e=> isSamllEnough(e)).reduce((p, c)=> p+c);
console.log(filtered)
console.log(filtered2)