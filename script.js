import {list1, list2} from './input.js';

const sampleList1 = [3, 4, 2, 1, 3, 3]
const sampleList2 = [4, 3, 5, 3, 9, 3]

/*
* Day 1
*/

list1.sort((a, b) => a - b);
list2.sort((a, b) => a - b);

const lengths = list1.map((num, i) => Math.abs(num - list2[i]));

console.log('part 1 answer', lengths.reduce((acc, curr) => acc + curr, 0));

const similarityScores = list1.map((num) => {
  const multiplier = list2.filter(num2 => num2 === num).length;
  return  num * multiplier;
});

console.log('part 2 answer', similarityScores.reduce((acc, curr) => acc + curr, 0));