// import input from './input.js';

const input =
  '............\n' +
  '........0...\n' +
  '.....0......\n' +
  '.......0....\n' +
  '....0.......\n' +
  '......A.....\n' +
  '............\n' +
  '............\n' +
  '........A...\n' +
  '.........A..\n' +
  '............\n' +
  '............';

const antennaField = input.split('\n');

const antennas = [];

const antinodeField = antennaField.map(row => {
  return Array(row.length).fill('.');
});

for (let y = 0; y < antennaField.length; y++) {
  for (let x = 0; x < antennaField[0].length; x++) {
    if (antennaField[y][x] !== '.') {
      antennas.push({
        coordinate: [x, y],
        frequency: antennaField[y][x],
      });
    }
  }
}

for (let y = 0; y < antennaField.length; y++) {
  for (let x = 0; x < antennaField[0].length; x++) {
    if (antennaField[y][x] !== '.') {
      const matchingAntennas = antennas.filter(a => {
        return a.frequency === antennaField[y][x] && x !== a.coordinate[0] && y !== a.coordinate[1];
      });

      matchingAntennas.forEach(matchingAntenna => {
        const difference = [matchingAntenna.coordinate[0] - x, matchingAntenna.coordinate[1] - y];
        console.log(x, y, matchingAntenna.coordinate[0], matchingAntenna.coordinate[1], difference);
        if (antennaField[y - difference[1]] && antennaField[y - difference[1]][x - difference[0]]) {
          antinodeField[y - difference[1]][x - difference[0]] = '#'
        }
      });
    }
  }
}

console.log(antinodeField.flatMap(r => r).filter(c => c === '#').length);