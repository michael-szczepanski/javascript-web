const add = require('./src/add.js')
const multiply = require('./src/multiply.js')

const algebra = (a, b) => {
  return multiply(add(a, a), b);
}

console.log('Hello from the developer console!');
console.log(new Date());
console.log(algebra(2, 4));
console.log(algebra(3, 5));