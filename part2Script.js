import input from './input.js';

const rows = input.split('\n');
let rowsCopy = [...rows];

const startingPosition = {
  x: rowsCopy.find(row => row.includes('^')).split('').findIndex(char => char === '^'),
  y: rowsCopy.findIndex(row => row.includes('^')),
};

const currentPosition = Object.assign({}, startingPosition);

let direction = 'up';

let isAtEdge = false;

function getCharByCoord(x, y) {
  return rowsCopy[y] && rowsCopy[y][x];
}

function changeDirection() {
  switch (direction) {
    case 'up':
      direction = 'right';
      break;
    case 'right':
      direction = 'down';
      break;
    case 'down':
      direction = 'left';
      break;
    case 'left':
      direction = 'up';
      break;
  }
}

function takeStep() {
  let newChar;

  switch (direction) {
    case 'up':
      newChar = getCharByCoord(currentPosition.x, currentPosition.y - 1);
      break;
    case 'right':
      newChar = getCharByCoord(currentPosition.x + 1, currentPosition.y);
      break;
    case 'down':
      newChar = getCharByCoord(currentPosition.x, currentPosition.y + 1);
      break;
    case 'left':
      newChar = getCharByCoord(currentPosition.x - 1, currentPosition.y);
      break;
  }

  if (!newChar) {
    isAtEdge = true;
  } else {
    switch (newChar) {
      case '#':
        changeDirection();
        break;
      case '.':
      case '^':
      case 'X':
        switch (direction) {
          case 'up':
            const newUpRow = rowsCopy[currentPosition.y - 1].split('');
            newUpRow[currentPosition.x] = 'X';
            rowsCopy[currentPosition.y - 1] = newUpRow.join('');
            currentPosition.y--;
            break;
          case 'right':
            const newRightRow = rowsCopy[currentPosition.y].split('');
            newRightRow[currentPosition.x + 1] = 'X';
            rowsCopy[currentPosition.y] = newRightRow.join('');
            currentPosition.x++;
            break;
          case 'down':
            const newDownRow = rowsCopy[currentPosition.y + 1].split('');
            newDownRow[currentPosition.x] = 'X';
            rowsCopy[currentPosition.y + 1] = newDownRow.join('');
            currentPosition.y++;
            break;
          case 'left':
            const newLeftRow = rowsCopy[currentPosition.y].split('');
            newLeftRow[currentPosition.x - 1] = 'X';
            rowsCopy[currentPosition.y] = newLeftRow.join('');
            currentPosition.x--;
            break;
        }
    }
  }
}

let loopCounts = 0;

for (let y = 0; y < rowsCopy.length; y++) {
  for (let x = 0; x < rowsCopy[0].length; x++) {
    isAtEdge = false;
    const newRow = rowsCopy[y].split('');
    newRow[x] = '#';
    rowsCopy[y] = newRow.join('');

    const history = [];
    let foundALoop = false;

    while (!isAtEdge && !foundALoop) {
      takeStep();

      const match = history.find(h => h.xPos === currentPosition.x && h.yPos === currentPosition.y && h.direction === direction);
      if (match && !isAtEdge) {
        loopCounts++;
        foundALoop = true;
      } else {
        history.push({
          xPos: currentPosition.x,
          yPos: currentPosition.y,
          direction,
        });
      }
    }

    rowsCopy = [...rows];
    direction = 'up';
    currentPosition.x = startingPosition.x;
    currentPosition.y = startingPosition.y;
    isAtEdge = false;
    foundALoop = false;
  }
}

console.log(loopCounts);