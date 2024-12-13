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
    orderedIds[orderedIds.length - 1 - loopCount] = '.';
  }

  dotIndex = orderedIds.findIndex(c => c === '.');
  stopWhile = orderedIds.slice(dotIndex).every(c => c === '.');

  loopCount++;
  forceStop++;
}


const orderedIdsMultipliedByIndex = orderedIds.filter(id => id !== '.').map((id, index) => {
  return id * index;
});

console.log('part 1 answer: ', orderedIdsMultipliedByIndex.reduce((a, b) => a + b));

let diskMapPacked = diskMapAsIds.reduce((a, b, index) => {
  if (index === 0) {
    a.push({
      id: b,
      length: 1,
    });
  } else {
    const prevPackId = a[a.length - 1].id;
    if (prevPackId === b) {
      a[a.length - 1].length++;
    } else {
      a.push({
        id: b,
        length: 1,
      });
    }
  }
  return a;
}, []);

for (let i = diskMapPacked.length - 1; i >= 0; i--) {
  const itemToMove = diskMapPacked[i];

  const dotIndex = diskMapPacked.findIndex(p => p.id === '.' && p.length >= itemToMove.length);
  const dot = diskMapPacked.find(p => p.id === '.' && p.length >= itemToMove.length);

  if (dotIndex > 0 && dotIndex < i) {
    diskMapPacked[i] = {
      id: '.',
      length: diskMapPacked[i].length,
    };
    diskMapPacked[dotIndex] = [
      itemToMove,
      {
        id: '.',
        length: dot.length - diskMapPacked[i].length,
      },
    ];
  }

  diskMapPacked = diskMapPacked.flatMap(c => c).filter(i => i.length !== 0);
}

const orderedDiskMapPacked = diskMapPacked.reduce((a, b) => {
  a.push(new Array(b.length).fill(b.id));
  return a;
}, []).flatMap(c => c);

console.log(orderedDiskMapPacked);


const orderedDiskMapPackedMultipliedByIndex = orderedDiskMapPacked.map((id, index) => {
  if (id === '.') return;
  return id * index;
});

console.log('part 2 answer: ', orderedDiskMapPackedMultipliedByIndex.filter(Boolean).reduce((a, b) => a + b));
// 6692236469213 too high
