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

let forceStopCount = 0

while (orderedIds.includes('.')) {
  console.log(orderedIds);
  const lastChar = orderedIds.pop();
  if (lastChar !== '.') {
    const dotIndex = orderedIds.findIndex(c => c === '.')
    orderedIds[dotIndex] = lastChar;
  }
  forceStopCount++
}

const orderedIdsMultipliedByIndex = orderedIds.map((id, index) => {
  return id * index
});

console.log(orderedIdsMultipliedByIndex.reduce((a, b) => a + b))







