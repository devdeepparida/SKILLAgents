const arr = [0,1,0,10,20,3]
console.log(arr)
let i = 0;
for (let index = 0; index < arr.length; index++) {
    if(arr[index]!=0){
        arr[i]=arr[index];
        i++;
    }
   
}
console.log(arr)
 for (let index = i; index < arr.length; index++) {
        arr[index]=0;
        
    }
console.log(arr)