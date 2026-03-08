//.entries()-->instances returns a new array iterator object that contains the key/value pairs for each index in the array.
let arr=["abc","pqr",2,5,7]
const iteration= arr.entries()
for (const element of iteration) {

    console.log(element);
    
}