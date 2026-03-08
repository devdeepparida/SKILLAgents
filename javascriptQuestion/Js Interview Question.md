# JavaScript Interview Questions & Solutions

> **Tricky Questions • Arrays • Strings • Objects • Functions • Async**

---

## 📌 Section 1: Tricky JavaScript Questions

> These are output-based and concept questions frequently asked in technical rounds.

---

### Q1. What is the output? `console.log(typeof null)`

✅ **Answer:**

```js
console.log(typeof null); // "object"
```

`null` is a primitive, but `typeof null` returns `"object"` — this is a known **bug in JavaScript** that was never fixed for backward compatibility.

```js
// Correct way to check for null:
value === null // true
```

> 💡 `typeof null === 'object'` is a historical bug. Always use `=== null` to check for null.

---

### Q2. What is the output? `console.log(0.1 + 0.2 === 0.3)`

✅ **Answer:**

```js
console.log(0.1 + 0.2);          // 0.30000000000000004
console.log(0.1 + 0.2 === 0.3);  // false

// Fix 1: toFixed
+(0.1 + 0.2).toFixed(1) === 0.3; // true

// Fix 2: Number.EPSILON
Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON; // true
```

> 💡 JavaScript uses IEEE 754 floating point. Binary can't represent 0.1 or 0.2 exactly.

---

### Q3. What is the difference between `==` and `===`?

✅ **Answer:**

```js
0 == false    // true  (coercion: false → 0)
0 === false   // false (different types)
'' == false   // true
'' === false  // false
null == undefined  // true  (special rule)
null === undefined // false
NaN == NaN    // false (NaN ≠ itself!)
NaN === NaN   // false
```

> 💡 Always use `===` in production. `==` triggers type coercion which leads to subtle bugs.

---

### Q4. What is the output? `var` vs `let` in a loop with `setTimeout`

✅ **Answer:**

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
// Output: 3  3  3  (NOT 0 1 2!)

// Fix — use let:
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
// Output: 0  1  2  ✅
```

> 💡 `var` is function-scoped — all callbacks share the same `i`. `let` creates a new binding per iteration.

---

### Q5. Explain Hoisting — what is the output?

✅ **Answer:**

```js
console.log(a); // undefined  (hoisted, not initialised)
var a = 5;
console.log(a); // 5

console.log(b); // ReferenceError (TDZ)
let b = 10;

greet();        // 'Hello!' — fully hoisted
function greet() { return 'Hello!'; }

sayHi();        // TypeError: not a function
var sayHi = () => 'Hi!';
```

> 💡 `var` → hoisted as `undefined`. `let`/`const` → Temporal Dead Zone. Function declarations → fully hoisted.

---

### Q6. What does this print? `console.log([] + [])`

✅ **Answer:**

```js
console.log([] + []);    // ''  (both → empty string)
console.log([] + {});    // '[object Object]'
console.log({} + []);    // 0   (in console, {} = empty block)
console.log(+[]);        // 0
console.log(+{});        // NaN
console.log(+null);      // 0
console.log(+undefined); // NaN
```

> 💡 Arrays coerce to `''` with `+`. Objects coerce to `'[object Object]'`. Leading `{}` is parsed as a block, not an object.

---

### Q7. What is a Closure? Give an example.

✅ **Answer:**

A closure is a function that **retains access to its outer scope's variables** even after the outer function has returned.

```js
function makeCounter() {
  let count = 0; // private variable
  return {
    increment() { return ++count; },
    decrement() { return --count; },
    value()     { return count; }
  };
}
const c = makeCounter();
c.increment(); // 1
c.increment(); // 2
c.decrement(); // 1
c.value();     // 1
```

> 💡 Closures power: data privacy, memoization, currying, factory functions, and event handlers.

---

### Q8. What is the difference between `null` and `undefined`?

✅ **Answer:**

- `undefined` — variable declared but **not assigned** a value.
- `null` — **intentionally assigned** 'no value'.

```js
let a;             // undefined (JS sets it)
let b = null;      // null (developer sets it)

typeof undefined   // 'undefined'
typeof null        // 'object' ← bug

null == undefined  // true  (loose)
null === undefined // false (strict)
```

> 💡 Use `null` when YOU want to say 'empty'. `undefined` means JS hasn't assigned a value yet.

---

### Q9. Arrow function vs regular function — `this` keyword

✅ **Answer:**

```js
const obj = {
  name: 'JS',
  regular: function() { return this.name; },
  arrow:   () => this.name,
};

obj.regular(); // 'JS'       ✅ this = obj
obj.arrow();   // undefined  ❌ this = outer scope
```

> 💡 Arrow functions do NOT have their own `this`. They inherit `this` from the surrounding lexical scope.

---

### Q10. Prototype chain — tricky example

✅ **Answer:**

```js
function Person(name) { this.name = name; }
Person.prototype.greet = function() {
  return 'Hi, I am ' + this.name;
};

const p = new Person('Anil');
console.log(p.greet());                   // 'Hi, I am Anil'
console.log(p.hasOwnProperty('name'));    // true
console.log(p.hasOwnProperty('greet'));   // false
```

`greet` is on the **prototype**, not an own property of `p`.

> 💡 Every JS object has a `[[Prototype]]` chain. Own properties are direct. Prototype properties are inherited.

---

### Q11. What is event delegation?

✅ **Answer:**

Attaching a **single event listener to a parent** to handle events for all child elements (even future ones).

```js
// ❌ Bad — listener on every button
buttons.forEach(btn =>
  btn.addEventListener('click', handler)
);

// ✅ Good — one listener on parent
document.querySelector('.container')
  .addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      console.log(e.target.textContent);
    }
  });
```

> 💡 Event delegation uses event bubbling. More performant and works for dynamically added elements.

---

### Q12. What is the output of this Promise chain?

✅ **Answer:**

```js
console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');

// Output: 1  4  3  2
```

Order: **Sync → Microtask queue (Promises) → Macrotask queue (setTimeout)**

> 💡 Promises go to the microtask queue which runs **BEFORE** the macrotask queue (setTimeout/setInterval).

---

## 📦 Section 2: Arrays — All Methods & Interview Questions

### 2.1 — Array Methods Reference

#### 🔵 Methods that MUTATE the original array

| Method | Syntax / Example | Returns / Notes |
|---|---|---|
| `push()` | `arr.push(4,5)` | Adds to end → returns new length |
| `pop()` | `arr.pop()` | Removes last item → returns it |
| `unshift()` | `arr.unshift(0)` | Adds to start → returns new length |
| `shift()` | `arr.shift()` | Removes first item → returns it |
| `splice()` | `arr.splice(1,2,'x')` | Remove/replace/add at index |
| `reverse()` | `arr.reverse()` | Reverses in place |
| `sort()` | `arr.sort((a,b)=>a-b)` | Sorts in place |
| `fill()` | `arr.fill(0,1,3)` | Fills with value from start to end |
| `copyWithin()` | `arr.copyWithin(0,2)` | Copies within array in place |

#### 🟢 Methods that do NOT mutate (return new value)

| Method | Syntax / Example | Returns / Notes |
|---|---|---|
| `map()` | `arr.map(x=>x*2)` | New transformed array |
| `filter()` | `arr.filter(x=>x>2)` | New array of matches |
| `reduce()` | `arr.reduce((a,b)=>a+b,0)` | Single accumulated value |
| `find()` | `arr.find(x=>x>2)` | First matching element |
| `findIndex()` | `arr.findIndex(x=>x>2)` | Index of first match |
| `some()` | `arr.some(x=>x>5)` | `true` if any match |
| `every()` | `arr.every(x=>x>0)` | `true` if all match |
| `includes()` | `arr.includes(3)` | `true`/`false` |
| `indexOf()` | `arr.indexOf(3)` | Index or `-1` |
| `lastIndexOf()` | `arr.lastIndexOf(3)` | Last index or `-1` |
| `flat()` | `arr.flat(Infinity)` | Flattens nested arrays |
| `flatMap()` | `arr.flatMap(x=>[x,x])` | `map` + `flat(1)` in one step |
| `slice()` | `arr.slice(1,3)` | Portion `[start, end)` |
| `concat()` | `arr.concat([4,5])` | Merges arrays → new array |
| `join()` | `arr.join('-')` | Joins elements → string |
| `forEach()` | `arr.forEach(x=>log(x))` | Iterates — returns `undefined` |
| `at()` | `arr.at(-1)` | Element at index (supports negative) |
| `findLast()` | `arr.findLast(x=>x>2)` | Last matching element |
| `toSorted()` | `arr.toSorted()` | Sorted copy (non-mutating) |
| `toReversed()` | `arr.toReversed()` | Reversed copy (non-mutating) |
| `toSpliced()` | `arr.toSpliced(1,1)` | Spliced copy (non-mutating) |

#### 🟣 Static Array Methods

| Method | Syntax / Example | Returns / Notes |
|---|---|---|
| `Array.isArray()` | `Array.isArray([])` | `true` if array |
| `Array.from()` | `Array.from('abc')` | Creates array from iterable |
| `Array.of()` | `Array.of(1,2,3)` | Creates array from arguments |

---

### 2.2 — Array Interview Questions

#### Q1. Remove duplicates from an array — 3 ways

```js
const arr = [1, 2, 2, 3, 3, 4];

// Way 1: Set (cleanest)
[...new Set(arr)]; // [1,2,3,4]

// Way 2: filter + indexOf
arr.filter((v,i) => arr.indexOf(v) === i);

// Way 3: reduce + includes
arr.reduce((acc,v) =>
  acc.includes(v) ? acc : [...acc, v], []);
```

> 💡 `Set` is O(n). `filter+indexOf` is O(n²). For large arrays always prefer `Set`.

---

#### Q2. Flatten a deeply nested array

```js
const arr = [1,[2,[3,[4]]]];

// Way 1: flat(Infinity)
arr.flat(Infinity); // [1,2,3,4]

// Way 2: recursion
const flatten = a => a.reduce(
  (acc,v) => Array.isArray(v)
    ? acc.concat(flatten(v))
    : acc.concat(v), []);

// Way 3: toString trick (numbers only)
arr.toString().split(',').map(Number);
```

> 💡 `flat(Infinity)` is simplest. Recursion works for any depth without built-ins.

---

#### Q3. Find the maximum and minimum in an array

```js
const arr = [3, 1, 9, 2, 7];

// Way 1: Math.max / Math.min + spread
Math.max(...arr); // 9
Math.min(...arr); // 1

// Way 2: reduce
arr.reduce((a,b) => a > b ? a : b); // 9
arr.reduce((a,b) => a < b ? a : b); // 1

// Way 3: sort
[...arr].sort((a,b)=>b-a)[0]; // 9 (max)
```

> 💡 Spread with `Math.max` fails for huge arrays (stack overflow). Use `reduce` for large arrays.

---

#### Q4. Sort array of numbers correctly

```js
const arr = [10, 9, 2, 21, 3];

// Wrong — default sort (alphabetical)
arr.sort(); // [10,2,21,3,9] ← WRONG

// Correct — comparator
arr.sort((a,b) => a - b); // ascending
arr.sort((a,b) => b - a); // descending

// Sort array of objects
users.sort((a,b) => a.age - b.age);
```

> 💡 `Array.sort()` default converts to strings. Always pass a comparator for numbers.

---

#### Q5. Find intersection, union, and difference of two arrays

```js
const a = [1,2,3,4], b = [3,4,5,6];

// Union
[...new Set([...a,...b])]; // [1,2,3,4,5,6]

// Intersection
a.filter(x => b.includes(x)); // [3,4]

// Difference (in a not b)
a.filter(x => !b.includes(x)); // [1,2]

// Symmetric difference
[...a.filter(x=>!b.includes(x)),
 ...b.filter(x=>!a.includes(x))]; // [1,2,5,6]
```

> 💡 Convert to `Set` for O(1) lookup when arrays are large: `const setB = new Set(b)`.

---

#### Q6. Chunk an array into groups of size n

```js
const arr = [1,2,3,4,5,6,7];
const n = 3;

// Way 1: slice in loop
const chunk = (arr, n) => {
  const res = [];
  for (let i=0; i<arr.length; i+=n)
    res.push(arr.slice(i, i+n));
  return res;
};
chunk(arr,3); // [[1,2,3],[4,5,6],[7]]

// Way 2: reduce
arr.reduce((acc,v,i) => {
  if (i % n === 0) acc.push([]);
  acc[acc.length-1].push(v);
  return acc;
}, []);
```

> 💡 Chunking is a common interview question. Know both the loop and the reduce approach.

---

#### Q7. Move all zeros to end without changing order

```js
const arr = [0,1,0,3,12];

// Way 1: filter + spread (readable)
const nonZero = arr.filter(x=>x!==0);
const zeros   = arr.filter(x=>x===0);
[...nonZero,...zeros]; // [1,3,12,0,0]

// Way 2: two-pointer (in-place, optimal)
let i = 0;
for(let j=0;j<arr.length;j++){
  if(arr[j]!==0) arr[i++]=arr[j];
}
while(i<arr.length) arr[i++]=0;
```

> 💡 Two-pointer is O(n) time O(1) space — the expected optimal answer in FAANG interviews.

---

#### Q8. Difference between map, filter, reduce, and forEach?

```js
const arr = [1,2,3,4,5];

arr.map(x=>x*2);          // [2,4,6,8,10]  — transform
arr.filter(x=>x%2===0);   // [2,4]          — subset
arr.reduce((a,b)=>a+b,0); // 15             — accumulate
arr.forEach(x=>log(x));   // undefined      — side effects

// Chaining:
arr.filter(x=>x>2).map(x=>x*10); // [30,40,50]
```

> 💡 `forEach` returns `undefined` — can't be chained. `map`/`filter`/`reduce` return new values — chain them.

---

## 🔤 Section 3: String Manipulation — Methods & Questions

> Strings are **immutable** in JS. All methods return new strings.

### 3.1 — String Methods Reference

| Method | Syntax / Example | Returns / Notes |
|---|---|---|
| `length` | `str.length` | Number of characters |
| `charAt()` | `str.charAt(0)` | Char at index |
| `charCodeAt()` | `str.charCodeAt(0)` | Unicode of char at index |
| `at()` | `str.at(-1)` | Char at index (supports negative) |
| `indexOf()` | `str.indexOf('a')` | First index or `-1` |
| `lastIndexOf()` | `str.lastIndexOf('a')` | Last index or `-1` |
| `includes()` | `str.includes('hi')` | `true`/`false` |
| `startsWith()` | `str.startsWith('H')` | `true`/`false` |
| `endsWith()` | `str.endsWith('!')` | `true`/`false` |
| `slice()` | `str.slice(1,4)` | Extract substring (supports negative) |
| `substring()` | `str.substring(1,4)` | Extract substring (no negative) |
| `toUpperCase()` | `str.toUpperCase()` | ALL CAPS — new string |
| `toLowerCase()` | `str.toLowerCase()` | all lowercase — new string |
| `trim()` | `str.trim()` | Remove whitespace both ends |
| `trimStart()` | `str.trimStart()` | Remove whitespace from start |
| `trimEnd()` | `str.trimEnd()` | Remove whitespace from end |
| `replace()` | `str.replace('a','b')` | Replace first match |
| `replaceAll()` | `str.replaceAll('a','b')` | Replace all matches |
| `split()` | `str.split(',')` | Split to array |
| `repeat()` | `str.repeat(3)` | Repeat string n times |
| `padStart()` | `str.padStart(5,'0')` | Pad from start |
| `padEnd()` | `str.padEnd(5,'.')` | Pad from end |
| `concat()` | `str.concat(' World')` | Join strings |
| `match()` | `str.match(/\d+/g)` | Regex match → array |
| `matchAll()` | `str.matchAll(/\d+/g)` | All regex matches → iterator |
| `search()` | `str.search(/\d/)` | Regex search → index |
| `String.fromCharCode()` | `String.fromCharCode(65)` | Number → char (`'A'`) |

---

### 3.2 — String Interview Questions

#### Q1. Reverse a string — 3 ways

```js
const str = 'hello';

// Way 1: spread + reverse + join
[...str].reverse().join(''); // 'olleh'

// Way 2: reduce
str.split('').reduce((a,c)=>c+a,'');

// Way 3: manual loop
let rev = '';
for(let i=str.length-1; i>=0; i--)
  rev += str[i];
```

> 💡 `spread` handles Unicode/emoji correctly. `str.split('')` can break emoji — use `[...str]` instead.

---

#### Q2. Check if a string is a palindrome

```js
// Way 1: reverse compare
const isPalin = s =>
  s === [...s].reverse().join('');
isPalin('racecar'); // true

// Way 2: two-pointer (no extra space)
const isPalin2 = s => {
  let l=0, r=s.length-1;
  while(l<r){
    if(s[l]!==s[r]) return false;
    l++; r--;
  }
  return true;
};
```

> 💡 Two-pointer is O(n) time O(1) space. Handle case-insensitive: `s.toLowerCase()` first.

---

#### Q3. Count occurrences of each character

```js
const str = 'banana';

// Way 1: reduce
const freq = [...str].reduce((acc,c)=>{
  acc[c] = (acc[c]||0) + 1;
  return acc;
},{});
// {b:1, a:3, n:2}

// Way 2: Map
const map = new Map();
for(const c of str)
  map.set(c, (map.get(c)||0)+1);
```

> 💡 `Map` preserves insertion order. Object approach is simpler but keys become strings.

---

#### Q4. Find the first non-repeating character

```js
const str = 'aabbcde';

// Way 1: frequency map (two-pass)
const firstUnique = s => {
  const map = {};
  for(const c of s) map[c]=(map[c]||0)+1;
  for(const c of s) if(map[c]===1) return c;
  return null;
};
firstUnique('aabbcde'); // 'c'

// Way 2: find with filter
str.split('').find(
  c => str.split(c).length-1 === 1
);
```

> 💡 Two-pass approach is O(n). The filter/split approach is O(n²) — avoid for large strings.

---

#### Q5. Check if two strings are anagrams

```js
// Way 1: sort and compare
const isAnagram = (a,b) =>
  a.split('').sort().join('') ===
  b.split('').sort().join('');
isAnagram('listen','silent'); // true

// Way 2: char frequency map (O(n))
const isAnagram2 = (a,b) => {
  if(a.length!==b.length) return false;
  const map={};
  for(const c of a) map[c]=(map[c]||0)+1;
  for(const c of b){
    if(!map[c]) return false;
    map[c]--;
  }
  return true;
};
```

> 💡 Sort method is O(n log n). Frequency map is O(n). Always mention both and the tradeoff.

---

#### Q6. Count words in a string

```js
const str = '  Hello   World  JS  ';

// Way 1: trim + split regex
str.trim().split(/\s+/).length; // 3

// Way 2: match
(str.match(/\S+/g)||[]).length; // 3

// Way 3: manual loop (no built-ins)
let count=0, inWord=false;
for(const c of str){
  if(c!==' '&&!inWord){ count++; inWord=true; }
  else if(c===' ') inWord=false;
}
```

> 💡 Always `trim()` first and use `/\s+/` to handle multiple consecutive spaces.

---

#### Q7. Capitalize first letter of each word

```js
const str = 'hello world from js';

// Way 1: split map join
str.split(' ')
   .map(w => w[0].toUpperCase() + w.slice(1))
   .join(' ');
// 'Hello World From Js'

// Way 2: replace with regex
str.replace(/\b\w/g, c => c.toUpperCase());
// 'Hello World From Js'
```

> 💡 `\b` is a word boundary. `\w` matches word characters. The regex approach is the most concise.

---

#### Q8. Truncate a string to n characters

```js
const truncate = (str, n) =>
  str.length > n ? str.slice(0, n) + '...' : str;

truncate('Hello World', 5); // 'Hello...'
truncate('Hi', 10);         // 'Hi'

// Truncate at word boundary
const truncateWord = (str, n) => {
  if(str.length <= n) return str;
  return str.slice(0, str.lastIndexOf(' ', n))+'...';
};
```

> 💡 `lastIndexOf(' ', n)` finds the last space before position `n` — avoids cutting mid-word.

---

## 🧩 Section 4: Objects — Methods & Interview Questions

### 4.1 — Object Methods Reference

| Method | Syntax / Example | Returns / Notes |
|---|---|---|
| `Object.keys()` | `Object.keys(obj)` | Array of own enumerable keys |
| `Object.values()` | `Object.values(obj)` | Array of own enumerable values |
| `Object.entries()` | `Object.entries(obj)` | Array of `[key, value]` pairs |
| `Object.assign()` | `Object.assign({},a,b)` | Shallow merge/copy |
| `Object.freeze()` | `Object.freeze(obj)` | Makes object immutable |
| `Object.seal()` | `Object.seal(obj)` | No add/delete, can modify |
| `Object.create()` | `Object.create(proto)` | Creates with given prototype |
| `Object.fromEntries()` | `Object.fromEntries(arr)` | Array of pairs → object |
| `Object.hasOwn()` | `Object.hasOwn(obj,'k')` | Own property check (modern) |
| `Object.getPrototypeOf()` | `Object.getPrototypeOf(obj)` | Returns prototype |
| `Object.defineProperty()` | `Object.defineProperty(obj,'k',{...})` | Define with descriptor |
| `hasOwnProperty()` | `obj.hasOwnProperty('k')` | Own property check (classic) |
| Spread `{...}` | `{...obj1,...obj2}` | Shallow merge |

---

### 4.2 — Object Interview Questions

#### Q1. Deep clone an object — 3 ways

```js
const obj = {a:1, b:{c:2}};

// Way 1: JSON (simple, fails on functions/Date)
JSON.parse(JSON.stringify(obj));

// Way 2: structuredClone (modern built-in)
structuredClone(obj);

// Way 3: recursive function
function deepClone(o){
  if(o===null||typeof o!=='object') return o;
  const copy = Array.isArray(o)?[]:{};
  for(const k in o) copy[k]=deepClone(o[k]);
  return copy;
}
```

> 💡 `structuredClone()` handles Date, Map, Set, but not functions. JSON method is simple but lossy.

---

#### Q2. `Object.freeze()` vs `Object.seal()`

```js
const obj = {a:1, b:2};

Object.freeze(obj);
obj.a = 99;    // ❌ silently fails
obj.c = 3;     // ❌ can't add
delete obj.a;  // ❌ can't delete

const obj2 = {x:1};
Object.seal(obj2);
obj2.x = 99;   // ✅ can modify
obj2.y = 2;    // ❌ can't add
delete obj2.x; // ❌ can't delete
```

> 💡 `freeze` = no change at all. `seal` = can update existing props, but can't add or delete.

---

#### Q3. Flatten a nested object with dot notation keys

```js
const obj = {a:1, b:{c:2, d:{e:3}}};

function flatten(obj, prefix='', res={}) {
  for(const k in obj){
    const key = prefix ? `${prefix}.${k}` : k;
    if(typeof obj[k]==='object' && obj[k]!==null)
      flatten(obj[k], key, res);
    else
      res[key] = obj[k];
  }
  return res;
}
// Result: {a:1, 'b.c':2, 'b.d.e':3}
```

> 💡 Very common in real-world form handling and config management. Recursion + prefix is the pattern.

---

#### Q4. Group array of objects by a property

```js
const people = [
  {name:'Anil', dept:'IT'},
  {name:'Riya', dept:'HR'},
  {name:'Sam',  dept:'IT'},
];

const grouped = people.reduce((acc, p) => {
  const key = p.dept;
  if(!acc[key]) acc[key] = [];
  acc[key].push(p);
  return acc;
}, {});
// {IT:[...], HR:[...]}
```

> 💡 `groupBy` with `reduce` is a classic interview pattern. `Object.groupBy()` is now available in modern JS.

---

## ⚙️ Section 5: Functions — Key Concepts & Questions

#### Q1. What is the difference between `call`, `apply`, and `bind`?

```js
function greet(greeting, punct) {
  return `${greeting}, ${this.name}${punct}`;
}
const user = { name: 'Anil' };

// call — args individually
greet.call(user, 'Hello', '!');  // 'Hello, Anil!'

// apply — args as array
greet.apply(user, ['Hi', '?']);  // 'Hi, Anil?'

// bind — returns new function
const sayHi = greet.bind(user, 'Hey');
sayHi('.');  // 'Hey, Anil.'
```

> 💡 `call` & `apply` execute immediately. `bind` returns a new function for later use.

---

#### Q2. What is currying? Implement a curry function.

```js
// Currying = transforming f(a,b,c) into f(a)(b)(c)

function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    }
    return (...more) => curried(...args, ...more);
  };
}

const add = curry((a,b,c) => a+b+c);
add(1)(2)(3); // 6
add(1,2)(3);  // 6
add(1)(2,3);  // 6
```

> 💡 Currying uses closures to partially apply arguments. `fn.length` tells us the expected argument count.

---

#### Q3. Implement memoization

```js
function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      console.log('From cache');
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

const slowAdd = memoize((a,b) => a+b);
slowAdd(1,2); // computed
slowAdd(1,2); // from cache
```

> 💡 Memoization caches results of expensive function calls. Used heavily in React (`useMemo`, `useCallback`).

---

#### Q4. Implement debounce and throttle

```js
// Debounce — delay until user stops
function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(()=>fn(...args), delay);
  };
}

// Throttle — call at most once per interval
function throttle(fn, limit) {
  let lastCall = 0;
  return function(...args) {
    const now = Date.now();
    if(now - lastCall >= limit){
      lastCall = now;
      return fn(...args);
    }
  };
}
```

> 💡 **Debounce**: search input (fire after typing stops). **Throttle**: scroll/resize (fire at most every 100ms).

---

## ⏳ Section 6: Async JavaScript

#### Q1. What is the Event Loop?

JavaScript is single-threaded. The event loop manages execution order:

1. **Call Stack** — executes synchronous code
2. **Web APIs** — handle async operations (setTimeout, fetch)
3. **Microtask Queue** — Promises, `queueMicrotask` (runs **FIRST**)
4. **Macrotask Queue** — setTimeout, setInterval (runs **AFTER** microtasks)

```js
console.log('1');
setTimeout(()=>console.log('2'),0);
Promise.resolve().then(()=>console.log('3'));
console.log('4');
// Output: 1  4  3  2
```

> 💡 Microtasks (Promises) **ALWAYS** run before macrotasks (setTimeout) — even with 0ms delay.

---

#### Q2. `Promise.all` vs `Promise.race` vs `Promise.allSettled` vs `Promise.any`

```js
const p1=Promise.resolve(1);
const p2=Promise.resolve(2);
const p3=Promise.reject('err');

// all — waits for ALL, rejects on first fail
await Promise.all([p1,p2]);        // [1,2]
await Promise.all([p1,p3]);        // throws 'err'

// allSettled — waits for ALL, never rejects
await Promise.allSettled([p1,p3]);
// [{status:'fulfilled',value:1}, {status:'rejected',reason:'err'}]

// race — first to resolve/reject wins
await Promise.race([p1,p2]);       // 1

// any — first to FULFILL wins, ignores rejects
await Promise.any([p3,p1]);        // 1
```

> 💡 `allSettled` never rejects — use it when you want results of all promises regardless of failure.

---

#### Q3. Implement async retry with delay

```js
async function retry(fn, retries=3, delay=1000) {
  for(let i=0; i<=retries; i++) {
    try {
      return await fn();
    } catch(err) {
      if(i===retries) throw err;
      console.log(`Retry ${i+1}...`);
      await new Promise(r=>setTimeout(r,delay));
    }
  }
}

await retry(() => fetch('/api/data'), 3, 2000);
```

> 💡 Retry with **exponential backoff** is common in production: `delay = delay * 2` on each retry.

---

## 🧠 Section 7: DSA Patterns in JavaScript

#### Q1. Two Sum — Find pair that adds to target

```js
function twoSum(nums, target) {
  const map = new Map();
  for(let i=0; i<nums.length; i++){
    const complement = target - nums[i];
    if(map.has(complement))
      return [map.get(complement), i];
    map.set(nums[i], i);
  }
}
twoSum([2,7,11,15], 9); // [0,1]
```

> 💡 Hash map approach is O(n) vs brute force O(n²). This is the most common DSA pattern.

---

#### Q2. Fibonacci — iterative and recursive

```js
// Recursive (clean but slow — O(2^n))
const fib = n => n<=1 ? n : fib(n-1)+fib(n-2);

// Iterative (O(n) time, O(1) space)
function fib2(n){
  let a=0, b=1;
  for(let i=2;i<=n;i++) [a,b]=[b,a+b];
  return n===0?a:b;
}

// Memoized recursive (O(n) time)
const memo={};
const fib3 = n =>
  n<=1 ? n : (memo[n]??=fib3(n-1)+fib3(n-2));
```

> 💡 Always mention the time complexity of each approach. Interviewers want to see you know the tradeoffs.

---

#### Q3. Check balanced parentheses using a stack

```js
function isBalanced(str) {
  const stack = [];
  const map = {')':'(',']':'[','}':'{'};
  for(const c of str){
    if('([{'.includes(c)){
      stack.push(c);
    } else if(')]}'.includes(c)){
      if(stack.pop()!==map[c]) return false;
    }
  }
  return stack.length===0;
}
isBalanced('({[]})'); // true
isBalanced('({[)');   // false
```

> 💡 Stack is the perfect data structure for matching pairs. This exact question appears in 80% of coding rounds.

---

## 📋 Section 8: Quick Reference Cheat Sheet

| Concept | Key Points to Remember |
|---|---|
| `var` / `let` / `const` | `var` = function-scoped, hoisted. `let`/`const` = block-scoped, TDZ. Use `const` by default. |
| `==` vs `===` | `==` coerces types. `===` strict. Always use `===`. `NaN !== NaN`. |
| `typeof null` | `'object'` — JS bug. Use `=== null` to check for null. |
| Closure | Inner function retains outer scope variables after outer fn returns. |
| `this` keyword | Regular fn: depends on caller. Arrow fn: inherits from outer scope. |
| Hoisting | `var` → undefined. Function declarations → fully hoisted. `let`/`const` → TDZ. |
| Event Loop | Sync → Microtasks (Promises) → Macrotasks (setTimeout). |
| Prototype chain | Objects inherit via `[[Prototype]]`. `hasOwnProperty` checks own props. |
| Shallow vs Deep copy | Spread/assign = shallow. `JSON.parse`/`structuredClone` = deep. |
| Promise combinators | `all` = wait all (fail fast). `allSettled` = wait all (never fail). `race` = first. `any` = first success. |
| `call`/`apply`/`bind` | `call(ctx,...args)`. `apply(ctx,[args])`. `bind` returns new fn. |
| Truthy/Falsy | Falsy: `0`, `''`, `null`, `undefined`, `NaN`, `false`. ALL else truthy (`[]`, `{}`). |
| Array mutators | `push`/`pop`/`shift`/`unshift`/`splice`/`sort`/`reverse` — modify original. |
| Array non-mutators | `map`/`filter`/`reduce`/`slice`/`concat`/`find` — return new value. |
| String immutable | All string methods return new strings. Original never changes. |
| Debounce vs Throttle | Debounce: delay until idle. Throttle: max once per interval. |
| `Set` | Unique values only. O(1) `has`/`add`/`delete`. Use for dedup. |
| `Map` vs `Object` | `Map`: any key type, ordered, iterable. `Object`: string keys only. |
| Optional chaining `?.` | Safe property access. Returns `undefined` instead of throwing. |
| Nullish coalescing `??` | Fallback only for `null`/`undefined`. Not for `0`, `''`, `false`. |

---

> 🚀 **Good luck with your interviews!**
>
> *Practice daily. Consistency beats intensity.*