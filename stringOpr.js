let wrd= "HellO Sir How are U"
console.log(convertTolowerCase(wrd));
console.log(convertTouppercase(wrd));
function convertTolowerCase(str){
    let result=""
    for (let index = 0; index < str.length; index++) {
        if(str.charCodeAt(index)>=60 && str.charCodeAt(index)<= 90)
        {
            result += String.fromCharCode(str.charCodeAt(index) + 32)
        }
        else{
            result+=str[index]
        }  
    }
    return result

}

function convertTouppercase(str){
    let result=""
    for (let index = 0; index < str.length; index++) {
        if(str.charCodeAt(index)>=60 && str.charCodeAt(index)<= 90)
        {
            result+=str[index]
        }
        else{f
            str[index]!=" "? result += String.fromCharCode(str.charCodeAt(index) - 32) : result += str[index]
        }  
    }
    return result

}