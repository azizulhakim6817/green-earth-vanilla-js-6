### Netlify Live Link :

https://incredible-banoffee-4d3d36.netlify.app/

### GitHub Private Repository:

https://github.com/azizulhakim6817/green-earth-vanilla-js-6

# JavaScript ES6 Concepts

## 1) Difference between `var`, `let`, and `const`

- **var** → Function-scoped, can reassign & redeclare, hoisted.
- **let** → Block-scoped, can reassign, cannot redeclare, hoisted but uninitialized.
- **const** → Block-scoped, cannot reassign or redeclare, hoisted but uninitialized.

**Example:**

```js
var a = 1; a = 2; var a = 3;
let b = 1; b = 2;
// let b = 3; ❌
const c = 1;
// c = 2 ❌

## 2) Difference between map(), forEach(), and filter()

forEach() → Loops over an array, executes a function for each element, does not return a new array.

map() → Loops over an array, executes a function for each element, returns a new array with transformed values.

filter() → Loops over an array, returns a new array with elements that satisfy a condition.

Example:
const numbers = [1, 2, 3, 4];

// forEach
numbers.forEach(n => console.log(n)); // 1 2 3 4

// map
const doubled = numbers.map(n => n * 2); // [2, 4, 6, 8]

// filter
const even = numbers.filter(n => n % 2 === 0); // [2, 4]


3) Arrow Functions in ES6
Arrow functions provide a shorter syntax for writing functions.

// Traditional function
function add(a, b) {
  return a + b;
}

// Arrow function
const add = (a, b) => a + b;


4) Destructuring Assignment in ES6
Destructuring allows extracting values from arrays or objects into variables concisely.

Array example:
const numbers = [1, 2, 3];
const [a, b] = numbers; // a = 1, b = 2
Object example:

const person = { name: "Alice", age: 25 };
const { name, age } = person; // name = "Alice", age = 25

// Default value
const { city = "Unknown" } = person;
Key points:

Extract multiple values at once

Shorter, readable code


5) Template Literals in ES6
Template literals are strings enclosed in backticks (``) that allow embedded expressions and multi-line strings.

const name = "Alice";
const age = 25;

const message = `My name is ${name} and I am ${age} years old.`;
console.log(message); // My name is Alice and I am 25 years old.
Differences from string concatenation:

// Traditional concatenation
const message = "My name is " + name + " and I am " + age + " years old.";

// Template literals: cleaner, easier to read, supports multi-line
const text = `Line 1 Line 2 Line 3`;


# b12a6-green-earth-azizul68178
```
