# JavaScript: Functions
### Declaration · Expression · Scope · Hoisting · Arrow Functions · IIFE

---

## Quick Reference Cheatsheet

| Concept | Key Behaviour |
|---|---|
| **Function Declaration** | Hoisted completely — can be called before it appears in code |
| **Function Expression** | Not hoisted — must be defined before calling |
| **Arrow Function** | No own `this`, no `arguments` object, implicit return |
| **IIFE** | Runs immediately, creates its own scope |
| **First-class function** | Functions can be assigned, passed, and returned like any value |
| **Parameters** | Names listed in the function definition |
| **Arguments** | Actual values passed when the function is called |
| **Rest `...`** | Collects remaining arguments into an array |
| **Spread `...`** | Expands an array into individual values |

---

## Glossary

| Term | Definition |
|---|---|
| **Hoisting** | JS moves declarations to the top of their scope before execution |
| **Scope** | The region of code where a variable or function is accessible |
| **IIFE** | Immediately Invoked Function Expression — runs the moment it is defined |
| **First-class function** | A function treated as a value: storable, passable, returnable |
| **Implicit return** | Arrow functions with no `{}` return the expression automatically |
| **Closure** | A function that remembers variables from its outer scope |

---

## 1. Function Declaration vs Function Expression

### Function Declaration

Defined using the `function` keyword as a statement. **Fully hoisted** — you can call it before the line it appears on.

```js
function greet(name) {
  return "Hello, " + name;
}

console.log(greet("Alice"));
```

Output: `"Hello, Alice"`

### Function Expression

A function assigned to a variable. **Not hoisted** — the variable exists but holds `undefined` until the assignment runs.

```js
const greet = function(name) {
  return "Hello, " + name;
};

console.log(greet("Alice"));
```

Output: `"Hello, Alice"`

### Key Difference — calling before definition

Calling a declaration before it appears:

```js
console.log(add(2, 3));

function add(a, b) {
  return a + b;
}
```

Output: `5` — works because declarations are fully hoisted.

Calling an expression before it appears:

```js
console.log(add(2, 3));

var add = function(a, b) {
  return a + b;
};
```

❌ Throws: `TypeError: add is not a function` — `add` is hoisted as `undefined`, not as a function.

---

## 2. Hoisting

Functions declared with `function` are hoisted **completely** — both the name and the body.
Variables declared with `var` are hoisted as `undefined`.
`let` and `const` are hoisted but stay in the TDZ until their declaration.

```js
sayHello();

function sayHello() {
  console.log("Hello!");
}
```

Output: `"Hello!"` — the entire function is available from the start.

```js
console.log(x);

var x = 10;
```

Output: `undefined` — only the declaration is hoisted, not the value.

---

## 3. First-Class Functions

In JavaScript, functions are **first-class citizens** — they can be treated exactly like any other value.

Assign a function to a variable:

```js
const square = function(n) {
  return n * n;
};

console.log(square(4));
```

Output: `16`

Pass a function as an argument:

```js
function applyTwice(fn, value) {
  return fn(fn(value));
}

const double = n => n * 2;

console.log(applyTwice(double, 3));
```

Output: `12` — `double(double(3))` → `double(6)` → `12`

Return a function from a function:

```js
function multiplier(factor) {
  return function(number) {
    return number * factor;
  };
}

const triple = multiplier(3);

console.log(triple(5));
```

Output: `15`

---

## 4. IIFE — Immediately Invoked Function Expression

An IIFE is a function that **runs immediately** when defined. It creates its own scope, so variables inside don't leak to the outer scope.

Basic IIFE:

```js
(function() {
  console.log("I ran immediately!");
})();
```

Output: `"I ran immediately!"`

IIFE with parameters:

```js
(function(name) {
  console.log("Hello, " + name);
})("Alice");
```

Output: `"Hello, Alice"`

IIFE scope isolation:

```js
var x = "global";

(function() {
  var x = "local";
  console.log(x);
})();

console.log(x);
```

Inside IIFE: `"local"`
Outside IIFE: `"global"` — the outer `x` is untouched.

---

## 5. Function Scope

Variables declared inside a function are **local** to that function. They cannot be accessed from outside.

```js
function example() {
  var local = "I'm inside";
  console.log(local);
}

example();
console.log(local);
```

Inside function: `"I'm inside"`
Outside function: ❌ `ReferenceError: local is not defined`

Global variables are accessible everywhere:

```js
var global = "I'm global";

function example() {
  console.log(global);
}

example();
console.log(global);
```

Both log: `"I'm global"`

`let` and `const` inside a block are block-scoped, not just function-scoped:

```js
function example() {
  if (true) {
    let blockScoped = "only in block";
    var funcScoped = "whole function";
  }
  console.log(funcScoped);
  console.log(blockScoped);
}
```

`funcScoped` logs: `"whole function"`
`blockScoped` throws: ❌ `ReferenceError`

---

## 6. Parameters vs Arguments

**Parameters** are the names listed in the function definition.
**Arguments** are the actual values passed when calling the function.

```js
function add(a, b) {
  return a + b;
}

console.log(add(10, 20));
```

`a` and `b` are parameters. `10` and `20` are arguments. Output: `30`

Extra arguments are ignored by default:

```js
function add(a, b) {
  return a + b;
}

console.log(add(10, 20, 99));
```

Output: `30` — the third argument is ignored.

Missing arguments default to `undefined`:

```js
function greet(name) {
  console.log("Hello, " + name);
}

greet();
```

Output: `"Hello, undefined"`

Default parameters (ES6):

```js
function greet(name = "stranger") {
  console.log("Hello, " + name);
}

greet();
greet("Alice");
```

First call: `"Hello, stranger"`
Second call: `"Hello, Alice"`

---

## 7. Rest and Spread Operators

Both use `...` but work in opposite directions.

### Rest — collects arguments into an array

Used in the **function definition**. Must be the **last parameter**.

```js
function sum(...numbers) {
  return numbers.reduce((acc, n) => acc + n, 0);
}

console.log(sum(1, 2, 3, 4, 5));
```

Output: `15`

Mixing regular and rest parameters:

```js
function introduce(first, ...rest) {
  console.log("First:", first);
  console.log("Rest:", rest);
}

introduce("Alice", "Bob", "Charlie");
```

First: `"Alice"`
Rest: `["Bob", "Charlie"]`

❌ Rest must always be last:

```js
function bad(...rest, last) {}
```

Throws: `SyntaxError: Rest parameter must be last formal parameter`

### Spread — expands an array into individual values

Used in the **function call**.

```js
function add(a, b, c) {
  return a + b + c;
}

const nums = [1, 2, 3];

console.log(add(...nums));
```

Output: `6`

Spread to combine arrays:

```js
const a = [1, 2, 3];
const b = [4, 5, 6];
const combined = [...a, ...b];

console.log(combined);
```

Output: `[1, 2, 3, 4, 5, 6]`

---

## 8. Arrow Functions

Introduced in ES6. Shorter syntax and different behaviour from regular functions.

Regular function:

```js
const add = function(a, b) {
  return a + b;
};
```

Arrow function:

```js
const add = (a, b) => a + b;
```

Both produce the same result. Arrow functions use **implicit return** when there are no curly braces.

Single parameter — parentheses optional:

```js
const square = n => n * n;

console.log(square(5));
```

Output: `25`

Multi-line arrow function — needs `return` and `{}`:

```js
const add = (a, b) => {
  const result = a + b;
  return result;
};
```

### Arrow functions vs Regular functions

| | Regular Function | Arrow Function |
|---|---|---|
| **`this`** | Own `this` (depends on how called) | Inherits `this` from surrounding scope |
| **`arguments`** | Has `arguments` object | No `arguments` object |
| **Implicit return** | ❌ No | ✅ Yes (without `{}`) |
| **As constructor** | ✅ Can use `new` | ❌ Cannot use `new` |

`arguments` object in a regular function:

```js
function showArgs() {
  console.log(arguments);
}

showArgs(1, 2, 3);
```

Output: `Arguments [1, 2, 3]`

Arrow functions have no `arguments` object:

```js
const showArgs = () => {
  console.log(arguments);
};

showArgs(1, 2, 3);
```

❌ Throws: `ReferenceError: arguments is not defined`

Use rest instead:

```js
const showArgs = (...args) => {
  console.log(args);
};

showArgs(1, 2, 3);
```

Output: `[1, 2, 3]`

---

## 9. Interview Questions

### Q1: What is the difference between function declaration and function expression?

A declaration is hoisted completely and can be called before it appears in code. An expression is assigned to a variable — only the variable is hoisted (as `undefined`), not the function itself, so calling it early throws a `TypeError`.

### Q2: How do first-class functions work in JavaScript?

Functions are values. They can be stored in variables, passed as arguments to other functions, and returned from functions. This makes patterns like callbacks, closures, and higher-order functions possible.

### Q3: What is the difference between `let`, `var`, and `const` in function scope?

`var` is function-scoped — it ignores block boundaries inside a function. `let` and `const` are block-scoped — they are confined to the `{}` block where they are declared, even inside a function.

### Q4: What is an IIFE and why use it?

An IIFE is a function that runs the moment it is defined. It's used to create a private scope so that variables inside don't pollute the outer or global scope. Common in older code before ES6 modules.

### Q5: What is the difference between rest and spread?

Same `...` syntax, opposite purposes. Rest collects multiple values into an array (in a function definition). Spread expands an array into individual values (in a function call or array literal).

### Q6: Why can't arrow functions be used as constructors?

Arrow functions don't have their own `this` binding — they inherit `this` from the enclosing scope. Constructors need their own `this` to build a new object, so `new` with an arrow function throws a `TypeError`.