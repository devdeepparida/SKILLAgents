let input= "Hello devdeep welcome to class"
// using normal funcation 
function finduniqChar(str){

    let uniqArr=[];
   for (const chr of str) {
        if(chr !== " " && !uniqArr.includes(chr)){
            uniqArr.push(chr);
        }
   }
   console.log(uniqArr)
}

finduniqChar(input)

//using Set
const arr =input.split('');
console.log(arr);

console.log([...new Set(arr.filter(e=> e!==" "))])


// Actual one using filter
function uniqueCharsWithFilter(str, { ignoreSpaces = true, caseInsensitive = true } = {}) {
  let s = caseInsensitive ? str.toLowerCase() : str;
  if (ignoreSpaces) s = s.replace(/\s+/g, '');
  const chars = Array.from(s);
  return chars.filter((ch, i, arr) => arr.indexOf(ch) === arr.lastIndexOf(ch));
}


console.log(uniqueCharsWithFilter(input));
// Default output (ignore spaces, case-insensitive): [ 'h', 'o', 'v', 'm', 't' ]
