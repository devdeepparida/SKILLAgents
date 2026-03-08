
function isprime(n) {

    if (n < 2)
        return false

    if (n % 2 === 0)
        return n === 2;

    for (let factor = 3; factor * factor <= n; factor += 2) {
        if (n % factor === 0)
            return false
    }

    return true
}
console.log("1 isprime: " + isprime(1))
console.log("2 isprime: " + isprime(2))
console.log("3 isprime: " + isprime(3))
console.log("5 isprime: " + isprime(5))
console.log("6 isprime: " + isprime(7))
console.log("7 isprime: " + isprime(8))
console.log("8 isprime: " + isprime(9))
console.log("97 isprime: " + isprime(97))