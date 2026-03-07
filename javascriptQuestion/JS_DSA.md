# JavaScript: Arrays & DSA
### Methods · Traversal · Interview Problems · Time & Space Complexity

---

## Quick Reference Cheatsheet

| Method | Mutates Original? | Returns | Use For |
|---|---|---|---|
| `push(x)` | ✅ Yes | New length | Add to end |
| `pop()` | ✅ Yes | Removed element | Remove from end |
| `unshift(x)` | ✅ Yes | New length | Add to start |
| `shift()` | ✅ Yes | Removed element | Remove from start |
| `map()` | ❌ No | New array | Transform each element |
| `filter()` | ❌ No | New array | Keep matching elements |
| `reduce()` | ❌ No | Single value | Aggregate data |
| `some()` | ❌ No | Boolean | At least one matches |
| `every()` | ❌ No | Boolean | All elements match |
| `find()` | ❌ No | First match or `undefined` | Find one element |
| `findIndex()` | ❌ No | Index or `-1` | Find position of element |
| `concat()` | ❌ No | New array | Merge arrays |
| `slice(s, e)` | ❌ No | New array | Extract a portion |
| `splice(s, d)` | ✅ Yes | Removed elements | Remove / insert in place |
| `flat(depth)` | ❌ No | New array | Flatten nested arrays |
| `fill(v, s, e)` | ✅ Yes | Modified array | Fill with a value |
| `reverse()` | ✅ Yes | Modified array | Reverse in place |
| `sort()` | ✅ Yes | Modified array | Sort in place |

---

## Glossary

| Term | Definition |
|---|---|
| **Zero-indexed** | Arrays start at index `0`, so the first element is `arr[0]` |
| **Mutate** | Modify the original array directly |
| **Time complexity** | How runtime grows relative to input size |
| **Space complexity** | How much extra memory an algorithm uses |
| **Two-pointer** | A technique using two indices to traverse an array efficiently |
| **In-place** | Algorithm that modifies the input without creating a new array |

---

## 1. Creating and Initializing Arrays

Using square bracket literal (preferred):

```js
const arr = [1, 2, 3, 4, 5];
```

Using the `Array` constructor:

```js
const arr = new Array(3);
console.log(arr); // [ <3 empty items> ]
```

Fill with a default value:

```js
const arr = new Array(3).fill(0);
console.log(arr); // [0, 0, 0]
```

Using `Array.from` with a mapping function:

```js
const squares = Array.from({ length: 5 }, (_, i) => i * i);
console.log(squares); // [0, 1, 4, 9, 16]

const range = Array.from({ length: 5 }, (_, i) => i + 1);
console.log(range); // [1, 2, 3, 4, 5]
```

Arrays can hold mixed types:

```js
const mixed = [1, "hello", true, null, { name: "Alice" }, [1, 2]];
```

Array length:

```js
const arr = [10, 20, 30];
console.log(arr.length); // 3
```

---

## 2. Add and Remove Elements

### push and pop — operate on the end

```js
const arr = [1, 2, 3];
arr.push(4);
console.log(arr); // [1, 2, 3, 4]

// Push multiple values at once
arr.push(5, 6);
console.log(arr); // [1, 2, 3, 4, 5, 6]
```

```js
const arr = [1, 2, 3];
const removed = arr.pop();
console.log(removed); // 3
console.log(arr);     // [1, 2]
```

### unshift and shift — operate on the start

```js
const arr = [1, 2, 3];
arr.unshift(0);
console.log(arr); // [0, 1, 2, 3]

// Unshift multiple values
arr.unshift(-2, -1);
console.log(arr); // [-2, -1, 0, 1, 2, 3]
```

```js
const arr = [1, 2, 3];
const removed = arr.shift();
console.log(removed); // 1
console.log(arr);     // [2, 3]
```

> `push` and `pop` are faster than `unshift` and `shift` because adding/removing from the start requires re-indexing every element.

---

## 3. Looping Arrays

Traditional for loop:

```js
const arr = [10, 20, 30];

for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]); // 10, 20, 30
}
```

While loop:

```js
let i = 0;
while (i < arr.length) {
  console.log(arr[i]);
  i++;
}
```

For...of loop (cleaner, no index needed):

```js
for (const val of arr) {
  console.log(val); // 10, 20, 30
}
```

forEach (callback style):

```js
arr.forEach((val, index) => {
  console.log(`Index ${index}: ${val}`);
});
// Index 0: 10
// Index 1: 20
// Index 2: 30
```

Loop in reverse:

```js
for (let i = arr.length - 1; i >= 0; i--) {
  console.log(arr[i]); // 30, 20, 10
}
```

---

## 4. Built-in Traversal Methods

### map — transform each element

```js
const nums = [1, 2, 3];
const doubled = nums.map(n => n * 2);
console.log(doubled); // [2, 4, 6]
```

```js
// Square each number
const squares = [1, 2, 3, 4].map(n => n ** 2);
console.log(squares); // [1, 4, 9, 16]

// Extract a property from objects
const users = [{ name: "Alice" }, { name: "Bob" }, { name: "Carol" }];
const names = users.map(u => u.name);
console.log(names); // ["Alice", "Bob", "Carol"]

// Convert strings to uppercase
const words = ["hello", "world"];
const upper = words.map(w => w.toUpperCase());
console.log(upper); // ["HELLO", "WORLD"]
```

### filter — keep matching elements

```js
const nums = [1, 2, 3, 4, 5];
const evens = nums.filter(n => n % 2 === 0);
console.log(evens); // [2, 4]
```

```js
// Filter out falsy values
const mixed = [0, 1, "", "hi", null, true, false];
const truthy = mixed.filter(Boolean);
console.log(truthy); // [1, "hi", true]

// Filter objects by property
const products = [
  { name: "Laptop", inStock: true },
  { name: "Mouse", inStock: false },
  { name: "Keyboard", inStock: true }
];
const available = products.filter(p => p.inStock);
console.log(available.map(p => p.name)); // ["Laptop", "Keyboard"]

// Filter numbers in a range
const scores = [45, 72, 88, 31, 95, 60];
const passing = scores.filter(s => s >= 60);
console.log(passing); // [72, 88, 95, 60]
```

### reduce — accumulate into one value

```js
const nums = [1, 2, 3, 4, 5];
const sum = nums.reduce((acc, n) => acc + n, 0);
console.log(sum); // 15
```

```js
// Find the maximum value
const max = [3, 7, 2, 9, 4].reduce((acc, n) => n > acc ? n : acc, -Infinity);
console.log(max); // 9

// Count occurrences of each value
const fruits = ["apple", "banana", "apple", "orange", "banana", "apple"];
const count = fruits.reduce((acc, fruit) => {
  acc[fruit] = (acc[fruit] || 0) + 1;
  return acc;
}, {});
console.log(count); // { apple: 3, banana: 2, orange: 1 }

// Flatten an array of arrays
const nested = [[1, 2], [3, 4], [5, 6]];
const flat = nested.reduce((acc, arr) => acc.concat(arr), []);
console.log(flat); // [1, 2, 3, 4, 5, 6]
```

### some — returns true if at least one element matches

```js
const nums = [1, 2, 3, 4, 5];
console.log(nums.some(n => n > 4)); // true
console.log(nums.some(n => n > 10)); // false
```

```js
// Check if any user is an admin
const users = [
  { name: "Alice", role: "user" },
  { name: "Bob", role: "admin" }
];
console.log(users.some(u => u.role === "admin")); // true

// Check if array has any negative number
const data = [3, 7, -1, 9];
console.log(data.some(n => n < 0)); // true
```

### every — returns true only if all elements match

```js
const nums = [1, 2, 3, 4, 5];
console.log(nums.every(n => n > 0));  // true
console.log(nums.every(n => n > 3));  // false
```

```js
// Check all passwords meet minimum length
const passwords = ["abc123", "securePass", "xy1z9"];
console.log(passwords.every(p => p.length >= 6)); // true

// Verify all items are in stock
const cart = [
  { item: "Shirt", inStock: true },
  { item: "Shoes", inStock: true }
];
console.log(cart.every(c => c.inStock)); // true
```

### find — returns the first matching element

```js
const nums = [1, 2, 3, 4, 5];
const found = nums.find(n => n > 3);
console.log(found); // 4 — returns first match only
```

```js
// Find a user by ID
const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Carol" }
];
const user = users.find(u => u.id === 2);
console.log(user); // { id: 2, name: "Bob" }

// Find the first even number
const nums2 = [1, 3, 4, 7, 8];
console.log(nums2.find(n => n % 2 === 0)); // 4

// Returns undefined if nothing matches
console.log([1, 3, 5].find(n => n > 10)); // undefined
```

---

## 5. More Array Methods

### concat — merge arrays without mutating originals

```js
const a = [1, 2, 3];
const b = [4, 5, 6];
const combined = a.concat(b);
console.log(combined); // [1, 2, 3, 4, 5, 6]
console.log(a);        // [1, 2, 3] — unchanged
```

```js
// Merge multiple arrays
const c = [7, 8, 9];
console.log(a.concat(b, c)); // [1, 2, 3, 4, 5, 6, 7, 8, 9]

// Concat single values too
console.log([1, 2].concat(3, 4)); // [1, 2, 3, 4]

// Alternative: spread operator (preferred modern syntax)
const merged = [...a, ...b, ...c];
console.log(merged); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

### slice — extract a portion (non-mutating)

```js
const arr = [1, 2, 3, 4, 5];
const portion = arr.slice(1, 4);
console.log(portion); // [2, 3, 4]
console.log(arr);     // [1, 2, 3, 4, 5] — unchanged
```

```js
// Slice from a start index to end
console.log(arr.slice(2));  // [3, 4, 5]

// Negative index counts from the end
console.log(arr.slice(-2)); // [4, 5]
console.log(arr.slice(-3, -1)); // [3, 4]

// Clone an array
const copy = arr.slice();
console.log(copy); // [1, 2, 3, 4, 5]

// Get last N elements
const last2 = arr.slice(-2);
console.log(last2); // [4, 5]
```

### splice — remove or insert in place (mutating)

```js
const arr = [1, 2, 3, 4, 5];
const removed = arr.splice(1, 2);
console.log(removed); // [2, 3]
console.log(arr);     // [1, 4, 5]
```

```js
// Insert without removing (deleteCount = 0)
const arr2 = [1, 2, 5];
arr2.splice(2, 0, 3, 4);
console.log(arr2); // [1, 2, 3, 4, 5]

// Replace elements
const arr3 = [1, 2, 3, 4, 5];
arr3.splice(1, 2, 20, 30);
console.log(arr3); // [1, 20, 30, 4, 5]

// Remove one element by index
const arr4 = ["a", "b", "c", "d"];
arr4.splice(2, 1);
console.log(arr4); // ["a", "b", "d"]

// Remove from end using negative index
const arr5 = [1, 2, 3, 4, 5];
arr5.splice(-2, 1);
console.log(arr5); // [1, 2, 3, 5]
```

### fill — fill with a value

```js
const arr = [1, 2, 3, 4, 5];
arr.fill(0, 2, 4);
console.log(arr); // [1, 2, 0, 0, 5]
```

```js
// Fill entire array
console.log([1, 2, 3, 4].fill(9)); // [9, 9, 9, 9]

// Fill from index onwards
console.log([1, 2, 3, 4, 5].fill(0, 3)); // [1, 2, 3, 0, 0]

// Negative index
console.log([1, 2, 3, 4, 5].fill(7, -2)); // [1, 2, 3, 7, 7]

// Initialize array of N zeros
const zeros = new Array(5).fill(0);
console.log(zeros); // [0, 0, 0, 0, 0]

// ✅ Safe 2D grid (each row is independent)
const grid = new Array(3).fill(null).map(() => new Array(3).fill(0));
console.log(grid); // [[0,0,0],[0,0,0],[0,0,0]]

// ❌ Dangerous — all rows share the same reference
const bad = new Array(3).fill([]);
bad[0].push(1);
console.log(bad); // [[1],[1],[1]] — all rows mutated!
```

### findIndex — index of first matching element

```js
const arr = [10, 20, 30, 40];
const idx = arr.findIndex(n => n > 25);
console.log(idx); // 2 — index of 30
```

```js
// Find index of an object by property
const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Carol" }
];
const idx2 = users.findIndex(u => u.id === 2);
console.log(idx2); // 1

// Returns -1 if nothing matches
console.log([1, 2, 3].findIndex(n => n > 10)); // -1

// Use it to update an item in place
const items = [{ id: 1, val: "a" }, { id: 2, val: "b" }];
const i = items.findIndex(item => item.id === 2);
if (i !== -1) items[i].val = "updated";
console.log(items[1].val); // "updated"
```

### flat — flatten nested arrays

```js
const nested = [1, [2, 3], [4, [5, 6]]];
console.log(nested.flat());    // [1, 2, 3, 4, [5, 6]]  — depth 1
console.log(nested.flat(2));   // [1, 2, 3, 4, 5, 6]    — depth 2
console.log(nested.flat(Infinity)); // [1, 2, 3, 4, 5, 6] — all depths
```

```js
// Flatten and map in one step with flatMap
const sentences = ["Hello world", "Foo bar"];
const words = sentences.flatMap(s => s.split(" "));
console.log(words); // ["Hello", "world", "Foo", "bar"]

// Remove empty slots
const arr = [1, , 2, , 3];
console.log(arr.flat()); // [1, 2, 3]

// Deeply nested
const deep = [1, [2, [3, [4, [5]]]]];
console.log(deep.flat(Infinity)); // [1, 2, 3, 4, 5]
```

### reverse — reverse in place (mutating)

```js
const arr = [1, 2, 3, 4, 5];
arr.reverse();
console.log(arr); // [5, 4, 3, 2, 1]
```

```js
// Reverse a copy (non-mutating)
const original = [1, 2, 3];
const reversed = [...original].reverse();
console.log(original); // [1, 2, 3] — unchanged
console.log(reversed); // [3, 2, 1]

// Reverse a string using array methods
const str = "hello";
const rev = str.split("").reverse().join("");
console.log(rev); // "olleh"

// Reverse array of objects
const steps = [{ step: 1 }, { step: 2 }, { step: 3 }];
steps.reverse();
console.log(steps.map(s => s.step)); // [3, 2, 1]
```

### sort — sort in place (mutating)

```js
const arr = [10, 1, 5, 3, 8];
arr.sort((a, b) => a - b);
console.log(arr); // [1, 3, 5, 8, 10]  — ascending

arr.sort((a, b) => b - a);
console.log(arr); // [10, 8, 5, 3, 1]  — descending
```

```js
// Sort strings alphabetically
const words = ["banana", "apple", "cherry"];
words.sort();
console.log(words); // ["apple", "banana", "cherry"]

// Sort objects by property
const users = [
  { name: "Carol", age: 32 },
  { name: "Alice", age: 25 },
  { name: "Bob", age: 28 }
];
users.sort((a, b) => a.age - b.age);
console.log(users.map(u => u.name)); // ["Alice", "Bob", "Carol"]

// Sort strings by length
const strs = ["fig", "apple", "kiwi", "banana"];
strs.sort((a, b) => a.length - b.length);
console.log(strs); // ["fig", "kiwi", "apple", "banana"]
```

> Without a compare function, `sort()` compares as strings: `[10, 1, 5]` would sort as `[1, 10, 5]`. Always pass `(a, b) => a - b` for numbers.

---

## 6. Spread and Rest with Arrays

### Spread — expand an array into values

```js
const a = [1, 2, 3];
const b = [4, 5, 6];
const combined = [...a, ...b];
console.log(combined); // [1, 2, 3, 4, 5, 6]
```

```js
// Copy an array (shallow)
const original = [1, 2, 3];
const copy = [...original];
copy.push(4);
console.log(original); // [1, 2, 3] — unchanged
console.log(copy);     // [1, 2, 3, 4]

// Insert in the middle
const arr = [1, 2, 5, 6];
const inserted = [...arr.slice(0, 2), 3, 4, ...arr.slice(2)];
console.log(inserted); // [1, 2, 3, 4, 5, 6]

// Spread into function arguments
const nums = [3, 1, 4, 1, 5, 9];
console.log(Math.max(...nums)); // 9
console.log(Math.min(...nums)); // 1
```

### Rest — collect remaining values into an array

```js
function sum(...nums) {
  return nums.reduce((acc, n) => acc + n, 0);
}
console.log(sum(1, 2, 3, 4, 5)); // 15
```

```js
// Destructure head and tail
const [first, second, ...rest] = [10, 20, 30, 40, 50];
console.log(first);  // 10
console.log(second); // 20
console.log(rest);   // [30, 40, 50]

// Skip elements and collect rest
const [, , ...tail] = [1, 2, 3, 4, 5];
console.log(tail); // [3, 4, 5]
```

---

## 7. DSA Interview Questions

---

### Q1: Find the Second Largest Number in an Array

**Approach 1 — Using built-in methods (simpler)**

```js
function secondLargest(arr) {
  const unique = [...new Set(arr)];
  unique.sort((a, b) => b - a);
  if (unique.length < 2) return -1;
  return unique[1];
}

console.log(secondLargest([10, 5, 10, 3, 8])); // 8
console.log(secondLargest([5]));                // -1
```

Time complexity: O(n log n) — due to sort.
Space complexity: O(n) — new Set and new array created.

**Approach 2 — Optimised single pass O(n)**

```js
function secondLargest(arr) {
  let largest = -Infinity;
  let second = -Infinity;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > largest) {
      second = largest;
      largest = arr[i];
    } else if (arr[i] > second && arr[i] < largest) {
      second = arr[i];
    }
  }

  return second === -Infinity ? -1 : second;
}

console.log(secondLargest([10, 5, 10, 3, 8])); // 8
console.log(secondLargest([10, 10, 10]));       // -1
```

Time complexity: O(n) — single loop through the array.
Space complexity: O(1) — no extra array created.

**How it works:**

| Step | Element | largest | second |
|---|---|---|---|
| Start | — | -Infinity | -Infinity |
| i=0 | 10 | 10 | -Infinity |
| i=1 | 5 | 10 | 5 |
| i=2 | 10 | 10 | 5 |
| i=3 | 3 | 10 | 5 |
| i=4 | 8 | 10 | 8 |

---

### Q2: Rotate Array by K

Given `arr = [1, 2, 3, 4, 5, 6, 7]` and `k = 3`, rotate right to get `[5, 6, 7, 1, 2, 3, 4]`.

**Approach 1 — Using built-in methods**

```js
function rotateArray(arr, k) {
  k = k % arr.length;
  return [...arr.slice(-k), ...arr.slice(0, arr.length - k)];
}

console.log(rotateArray([1, 2, 3, 4, 5, 6, 7], 3)); // [5, 6, 7, 1, 2, 3, 4]
```

Time complexity: O(n)
Space complexity: O(n) — new array created.

**Approach 2 — Three reversals, no extra array**

```js
function reverse(arr, start, end) {
  while (start < end) {
    let temp = arr[start];
    arr[start] = arr[end];
    arr[end] = temp;
    start++;
    end--;
  }
}

function rotateArray(arr, k) {
  k = k % arr.length;
  reverse(arr, 0, arr.length - 1);
  reverse(arr, 0, k - 1);
  reverse(arr, k, arr.length - 1);
  return arr;
}

console.log(rotateArray([1, 2, 3, 4, 5, 6, 7], 3)); // [5, 6, 7, 1, 2, 3, 4]
```

Time complexity: O(n) — three passes through the array.
Space complexity: O(1) — array is modified in place.

**How the three reversals work:**

| Step | Array |
|---|---|
| Original | `[1, 2, 3, 4, 5, 6, 7]` |
| Reverse all | `[7, 6, 5, 4, 3, 2, 1]` |
| Reverse first k=3 | `[5, 6, 7, 4, 3, 2, 1]` |
| Reverse rest | `[5, 6, 7, 1, 2, 3, 4]` |

---

### Q3: Remove Duplicates from a Sorted Array

Given `arr = [1, 1, 2, 2, 3, 4, 4]`, return the count of unique elements.

**Approach 1 — Using built-in methods**

```js
function removeDuplicates(arr) {
  const unique = [...new Set(arr)];
  return unique.length;
}

console.log(removeDuplicates([1, 1, 2, 2, 3, 4, 4])); // 4
```

Time complexity: O(n)
Space complexity: O(n) — new Set and array created.

**Approach 2 — Two-pointer (in-place, optimal)**

```js
function removeDuplicates(arr) {
  if (arr.length === 0) return 0;

  let left = 0;

  for (let right = 1; right < arr.length; right++) {
    if (arr[right] !== arr[left]) {
      left++;
      arr[left] = arr[right];
    }
  }

  return left + 1;
}

console.log(removeDuplicates([1, 1, 2, 2, 3, 4, 4])); // 4
```

Time complexity: O(n) — single pass with two pointers.
Space complexity: O(1) — no new array created.

**Dry run on `[1, 1, 2, 2, 3]`:**

| right | arr[right] | arr[left] | Action | left |
|---|---|---|---|---|
| 1 | 1 | 1 | Duplicate — skip | 0 |
| 2 | 2 | 1 | Unique — write, move left | 1 |
| 3 | 2 | 2 | Duplicate — skip | 1 |
| 4 | 3 | 2 | Unique — write, move left | 2 |

Result: `left + 1 = 3` unique elements.

---

### Q4: Two Sum (Bonus)

Given `arr = [2, 7, 11, 15]` and `target = 9`, return indices of two numbers that add up to target.

**Approach 1 — Brute force**

```js
function twoSum(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] + arr[j] === target) return [i, j];
    }
  }
  return [];
}

console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]
```

Time complexity: O(n²)
Space complexity: O(1)

**Approach 2 — HashMap (optimal)**

```js
function twoSum(arr, target) {
  const map = {};
  for (let i = 0; i < arr.length; i++) {
    const complement = target - arr[i];
    if (map[complement] !== undefined) return [map[complement], i];
    map[arr[i]] = i;
  }
  return [];
}

console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]
console.log(twoSum([3, 2, 4], 6));      // [1, 2]
```

Time complexity: O(n) — single pass.
Space complexity: O(n) — HashMap stores seen values.

---

## 8. Complexity Summary

| Problem | Approach | Time | Space |
|---|---|---|---|
| Second largest | Sort + Set | O(n log n) | O(n) |
| Second largest | Single pass | O(n) | O(1) |
| Rotate array | slice + spread | O(n) | O(n) |
| Rotate array | Three reversals | O(n) | O(1) |
| Remove duplicates | Set | O(n) | O(n) |
| Remove duplicates | Two-pointer | O(n) | O(1) |
| Two sum | Brute force | O(n²) | O(1) |
| Two sum | HashMap | O(n) | O(n) |

---

## 9. Best Practices

- **Prefer non-mutating methods** (`map`, `filter`, `slice`) when you need to keep the original array
- **Use `sort` with a compare function** for numbers — default sort treats elements as strings
- **Use `flat(Infinity)`** to fully flatten deeply nested arrays
- **Two-pointer technique** is your go-to for sorted array problems — O(n) time, O(1) space
- **`k % arr.length`** before rotating — handles cases where k is larger than the array length
- **Always check edge cases** — empty arrays, single elements, all duplicates
- **Use `[...arr]` or `arr.slice()`** to clone before mutating methods like `sort` and `reverse`
- **Prefer `for...of`** over `forEach` when you need to use `break` or `return` early
- **Use `flatMap`** instead of `map().flat()` for a cleaner one-step operation