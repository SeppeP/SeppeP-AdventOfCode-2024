import input from './input.js';

const diskMap = input;

const diskMapAsIds = diskMap.split('').flatMap((num, index) => {
  if (index % 2 !== 0) {
    return new Array(Number(num)).fill('.');
  } else {
    return new Array(Number(num)).fill(index / 2);
  }
});

const orderedIds = [...diskMapAsIds];

let stopWhile = false;
let loopCount = 0;
let forceStop = 0;

while (!stopWhile) {
  const lastChar = orderedIds[orderedIds.length - 1 - loopCount];
  let dotIndex = orderedIds.findIndex(c => c === '.');

  if (lastChar !== '.' && lastChar) {
    orderedIds[dotIndex] = lastChar;
    orderedIds[orderedIds.length - 1 - loopCount] = '.'
  }

  dotIndex = orderedIds.findIndex(c => c === '.');
  stopWhile = orderedIds.slice(dotIndex).every(c => c === '.');

  loopCount++
  forceStop++
}


const orderedIdsMultipliedByIndex = orderedIds.filter(id => id !== '.').map((id, index) => {
  return id * index
});

console.log(orderedIdsMultipliedByIndex.reduce((a, b) => a + b))







