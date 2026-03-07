# JavaScript: `map`, `filter`, and `reduce`
### Array Methods · Polyfills · Interview Questions

---

## Quick Reference Cheatsheet

| Feature | `map` | `filter` | `reduce` |
|---|---|---|---|
| **Purpose** | Transform each element | Keep elements that pass a test | Accumulate into a single value |
| **Returns** | New array (same length) | New array (same or shorter) | Single value (any type) |
| **Original array** | Unchanged | Unchanged | Unchanged |
| **Callback args** | `(element, index, array)` | `(element, index, array)` | `(accumulator, element, index, array)` |
| **Extra param** | — | — | `initialValue` |
| **Chainable** | ✅ Yes | ✅ Yes | ✅ Yes (returns value) |

---

## Glossary

| Term | Definition |
|---|---|
| **Callback** | A function passed as an argument to another function |
| **Accumulator** | The running total/result carried through each `reduce` iteration |
| **Initial value** | Optional second argument to `reduce` — the starting value of the accumulator |
| **Polyfill** | A manual reimplementation of a built-in method, used to understand internals or support older environments |
| **Chaining** | Calling multiple array methods in sequence: `arr.filter(...).map(...)` |

---

## Sample Data Used in Examples

```js
const students = [
  { name: "Alice",   marks: 75 },
  { name: "Bob",     marks: 45 },
  { name: "Charlie", marks: 90 },
  { name: "Diana",   marks: 55 },
  { name: "Eve",     marks: 82 },
];
```

---

## 1. `map` — Transform Every Element

Returns a **new array** of the same length, with each element transformed by the callback.

Double each number:

```js
const nums = [1, 2, 3, 4];
const doubled = nums.map(n => n * 2);

console.log(doubled);
```

Output: `[2, 4, 6, 8]`

Return all student names in uppercase:

```js
const upperNames = students.map(s => s.name.toUpperCase());

console.log(upperNames);
```

Output: `["ALICE", "BOB", "CHARLIE", "DIANA", "EVE"]`

### `map` Polyfill

```js
Array.prototype.myMap = function(callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    result.push(callback(this[i], i, this));
  }
  return result;
};
```

Usage:

```js
const names = students.myMap(s => s.name.toUpperCase());

console.log(names);
```

Output: `["ALICE", "BOB", "CHARLIE", "DIANA", "EVE"]`

---

## 2. `filter` — Keep Elements That Pass a Test

Returns a **new array** containing only elements for which the callback returns `true`.

Keep only even numbers:

```js
const nums = [1, 2, 3, 4, 5, 6];
const evens = nums.filter(n => n % 2 === 0);

console.log(evens);
```

Output: `[2, 4, 6]`

Return students who scored more than 60:

```js
const topStudents = students.filter(s => s.marks > 60);

console.log(topStudents);
```

Output:

```
[
  { name: "Alice",   marks: 75 },
  { name: "Charlie", marks: 90 },
  { name: "Eve",     marks: 82 }
]
```

### `filter` Polyfill

```js
Array.prototype.myFilter = function(callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      result.push(this[i]);
    }
  }
  return result;
};
```

Usage:

```js
const topStudents = students.myFilter(s => s.marks > 60);
```

---

## 3. `reduce` — Accumulate Into a Single Value

Iterates through the array, accumulating a result using the callback. Returns **one value**.

Sum all numbers:

```js
const nums = [1, 2, 3, 4, 5];
const sum = nums.reduce((acc, n) => acc + n, 0);

console.log(sum);
```

Output: `15`

Calculate total marks of all students:

```js
const totalMarks = students.reduce((acc, s) => acc + s.marks, 0);

console.log(totalMarks);
```

Output: `347`

### `reduce` Polyfill

```js
Array.prototype.myReduce = function(callback, initialValue) {
  let acc = initialValue;
  let startIndex = 0;

  if (acc === undefined) {
    acc = this[0];
    startIndex = 1;
  }

  for (let i = startIndex; i < this.length; i++) {
    acc = callback(acc, this[i], i, this);
  }
  return acc;
};
```

If no `initialValue` is provided, the first element becomes the accumulator and iteration starts from index 1.

Usage:

```js
const total = students.myReduce((acc, s) => acc + s.marks, 0);

console.log(total);
```

Output: `347`

---

## 4. `map` vs `forEach`

A very common interview question. The key differences:

| | `map` | `forEach` |
|---|---|---|
| **Returns** | New array | `undefined` |
| **Use when** | You need the transformed result | You just need side effects (logging, DOM updates) |
| **Chainable** | ✅ Yes | ❌ No |

forEach returns nothing:

```js
const nums = [1, 2, 3];
const result = nums.forEach(n => n * 2);

console.log(result);
```

Output: `undefined`

map returns a new array:

```js
const doubled = nums.map(n => n * 2);

console.log(doubled);
```

Output: `[2, 4, 6]`

Chaining works with map, not forEach:

```js
const output = nums
  .map(n => n * 2)
  .filter(n => n > 3);

console.log(output);
```

Output: `[4, 6]`

> **Rule of thumb:** If you need the result — use `map`. If you're just iterating for effects — use `forEach`.

---

## 5. Interview Questions

### Q1: Return names of all students in uppercase

```js
const upperNames = students.map(s => s.name.toUpperCase());

console.log(upperNames);
```

Output: `["ALICE", "BOB", "CHARLIE", "DIANA", "EVE"]`

---

### Q2: Return details of students who scored more than 60

```js
const passed = students.filter(s => s.marks > 60);

console.log(passed);
```

Output:

```
[
  { name: "Alice",   marks: 75 },
  { name: "Charlie", marks: 90 },
  { name: "Eve",     marks: 82 }
]
```

---

### Q3: Total marks — add 20 to those below 60, then sum everyone above 60

This combines all three methods in a chain:

1. `map` — add 20 marks to students with < 60
2. `filter` — keep only students now above 60
3. `reduce` — sum their marks

```js
const totalAdjusted = students
  .map(s => s.marks < 60 ? { ...s, marks: s.marks + 20 } : s)
  .filter(s => s.marks > 60)
  .reduce((acc, s) => acc + s.marks, 0);

console.log(totalAdjusted);
```

Output: `387`

**Step-by-step breakdown:**

| Step | Result |
|---|---|
| After `map` | `[75, 65, 90, 75, 82]` — Bob: 45→65, Diana: 55→75 |
| After `filter` | `[75, 65, 90, 75, 82]` — all now pass > 60 |
| After `reduce` | `387` |

---

## 6. Chaining `map`, `filter`, `reduce` Together

```js
const result = students
  .filter(s => s.marks > 60)
  .map(s => s.name.toUpperCase())
  .reduce((acc, name) => acc + name + " | ", "");

console.log(result);
```

Output: `"ALICE | CHARLIE | EVE | "`

What each step does:
- `.filter` — keeps only students with marks > 60
- `.map` — converts their names to uppercase
- `.reduce` — joins them into a single string

---

## 7. Best Practices

- **Use `map`** when transforming — it's explicit that you want a new array back
- **Use `filter`** when selecting — cleaner than a `forEach` with push logic
- **Use `reduce`** for aggregations — sums, groupings, flattening
- **Avoid mutating** inside callbacks — keep functions pure for predictability
- **Always pass an `initialValue` to `reduce`** — skipping it can cause bugs on empty arrays
- **Chain thoughtfully** — `filter` before `map` to avoid transforming elements you'll discard