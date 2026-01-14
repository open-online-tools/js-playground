// Default example code using use-m
export const DEFAULT_CODE = `// JS Playground - using use-m for dynamic imports
// See: https://github.com/link-foundation/use-m

const { use } = await import('https://esm.sh/use-m');

// Load lodash-es with version pinning for security
const _ = await use('lodash-es@4.17.21');

console.log('Lodash loaded successfully!');

// Math operations
console.log('_.add(1, 2) =', _.add(1, 2));
console.log('_.multiply(3, 4) =', _.multiply(3, 4));

// Array manipulation examples
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log('Original array:', numbers);
console.log('Chunk into pairs:', _.chunk(numbers, 2));
console.log('First 3 elements:', _.take(numbers, 3));
console.log('Sum:', _.sum(numbers));

// Collection operations
const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 35 }
];
console.log('Users:', users);
console.log('Names only:', _.map(users, 'name'));
console.log('Find Bob:', _.find(users, { name: 'Bob' }));
`;
