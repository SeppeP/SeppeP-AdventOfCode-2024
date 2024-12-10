import input from './input.js'

const rows = input.split('\n');

const currentPosition = {
  x: rows.find(row => row.includes('^')).split('').findIndex(char => char === '^'),
  y: rows.findIndex(row => row.includes('^')),
};

let direction = 'up';

let isAtEdge = false;

function getCharByCoord(x, y) {
  return rows[y] && rows[y][x];
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
            const newUpRow = rows[currentPosition.y - 1].split('');
            newUpRow[currentPosition.x] = 'X';
            rows[currentPosition.y - 1] = newUpRow.join('');
            currentPosition.y--;
            break;
          case 'right':
            const newRightRow = rows[currentPosition.y].split('');
            newRightRow[currentPosition.x + 1] = 'X';
            rows[currentPosition.y] = newRightRow.join('');
            currentPosition.x++;
            break;
          case 'down':
            const newDownRow = rows[currentPosition.y + 1].split('');
            newDownRow[currentPosition.x] = 'X';
            rows[currentPosition.y + 1] = newDownRow.join('');
            currentPosition.y++;
            break;
          case 'left':
            const newLeftRow = rows[currentPosition.y].split('');
            newLeftRow[currentPosition.x - 1] = 'X';
            rows[currentPosition.y] = newLeftRow.join('');
            currentPosition.x--;
            break;
        }
    }
  }
}


while (!isAtEdge) {
  takeStep();
}

const counts = rows.map(r => {
  return r.replaceAll('.', '').replaceAll('#', '').length
})

console.log(counts.reduce((a, b) => a + b));