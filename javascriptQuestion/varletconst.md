# JavaScript: `var`, `let`, and `const`
### Hoisting · Scoping · Shadowing · Initialization

---

## Quick Reference Cheatsheet

| Feature | `var` | `let` | `const` |
|---|---|---|---|
| **Scope** | Function / Global | Block | Block |
| **Hoisting** | ✅ Hoisted + initialized as `undefined` | ⚠️ Hoisted, but in TDZ | ⚠️ Hoisted, but in TDZ |
| **TDZ** | ❌ No | ✅ Yes | ✅ Yes |
| **Before declaration** | Returns `undefined` | `ReferenceError` | `ReferenceError` |
| **Redeclaration** | ✅ Allowed | ❌ Syntax error | ❌ Syntax error |
| **Reassignment** | ✅ Allowed | ✅ Allowed | ❌ Not allowed |
| **Block shadowing** | ❌ No — overwrites outer | ✅ Yes | ✅ Yes |
| **Must init at declaration** | ❌ No | ❌ No | ✅ Yes |

---

## Glossary

| Term | Definition |
|---|---|
| **Global scope** | Variables defined outside any function or block |
| **Function scope** | Variables accessible only within the declaring function |
| **Block scope** | Variables accessible only within a `{ ... }` block |
| **Hoisting** | JS moves declarations to the top of their scope at compile time |
| **TDZ** | *Temporal Dead Zone* — the period before a `let`/`const` is declared where accessing it throws an error |
| **Shadowing** | An inner-scope variable with the same name as an outer one, which takes precedence inside that scope |

---

## 1. Hoisting & Initialization

### `var` — Hoisted and initialized as `undefined`

```js
function foo() {
  console.log(a); // undefined (not an error!)
  var a = 10;
  console.log(a); // 10
}
```

> `var` declarations are moved to the top of their function scope and set to `undefined` immediately. The *assignment* stays in place.

---

### `let` — Hoisted but in TDZ until declaration

```js
function bar() {
  console.log(b); // ❌ ReferenceError: Cannot access 'b' before initialization
  let b = 20;
}
```

---

### `const` — Hoisted but in TDZ, must assign at declaration

```js
function baz() {
  console.log(c); // ❌ ReferenceError: Cannot access 'c' before initialization
  const c = 30;
}

const x = 5;  // ✅ Must assign immediately
const y;      // ❌ SyntaxError: Missing initializer
```

---

## 2. Scope

### `var` is function-scoped

```js
function example() {
  if (true) {
    var x = "inside if";
  }
  console.log(x); // "inside if" — leaks out of the block!
}
```

### `let` and `const` are block-scoped

```js
function example() {
  if (true) {
    let y = "inside if";
    const z = "also inside";
  }
  console.log(y); // ❌ ReferenceError
  console.log(z); // ❌ ReferenceError
}
```

---

## 3. Shadowing

### `let` / `const` — block-level shadowing ✅

The inner variable is completely separate from the outer one.

```js
let x = "outer";

{
  let x = "inner"; // shadows outer x — new variable
  console.log(x);  // "inner"
}

console.log(x);    // "outer" — unchanged
```

---

### `var` — NO block shadowing ⚠️

`var` inside a block refers to the *same* variable in the outer scope. It overwrites, not shadows.

```js
var y = "outer";

{
  var y = "inner"; // same variable — overwrites!
  console.log(y);  // "inner"
}

console.log(y);    // "inner" — outer was overwritten
```

---

## 4. Redeclaration

```js
// var — redeclaration allowed
var w = 1;
var w = 2;    // ✅ No error
console.log(w); // 2

// let — redeclaration NOT allowed in same scope
let a = 1;
let a = 2;    // ❌ SyntaxError

// const — redeclaration NOT allowed in same scope
const b = 1;
const b = 2;  // ❌ SyntaxError
```

> Redeclaration *is* allowed across different scopes (see Shadowing above).

---

## 5. Common Pitfalls

### The classic loop bug with `var`

```js
// ❌ var — all callbacks share the same `i`
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
// Logs: 3, 3, 3

// ✅ let — each iteration gets its own `i`
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
// Logs: 0, 1, 2
```

---

## 6. Best Practices

- **Use `const` by default** — signals the binding won't be reassigned
- **Use `let`** when you need to reassign (loop counters, accumulators)
- **Avoid `var`** — function scoping and silent `undefined` hoisting cause subtle bugs
- **Watch for shadowing** — same-name variables in nested scopes can confuse readers
- **Declare variables at the top of their scope** — makes hoisting behavior explicit

---

## 7. Interview Quick-Hits

**Q: What's the TDZ?**
The period between entering a block and the `let`/`const` declaration being evaluated. Accessing the variable in this window throws a `ReferenceError`.

**Q: Is `let` hoisted?**
Yes — but unlike `var`, it's not initialized. It sits in the TDZ until its declaration line is reached.

**Q: Why use `const` if you can still mutate objects/arrays?**
`const` prevents *reassignment* of the binding (you can't do `const arr = []; arr = []`), but the object/array it points to can still be mutated. It signals intent: "this variable won't point somewhere else."

**Q: What does `var` inside a block do?**
It modifies the variable in the enclosing *function* scope (or global scope), not a new block-scoped variable. This is why `var` in loops can produce unexpected results.