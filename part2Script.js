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

      antinodeField[y][x] = '#';
    }
  }
}

console.log(antinodeField.map(r => r.join('')));

for (let y = 0; y < antennaField.length; y++) {
  for (let x = 0; x < antennaField[0].length; x++) {
    if (antennaField[y][x] !== '.') {
      const matchingAntennas = antennas.filter(a => {
        return a.frequency === antennaField[y][x] && x !== a.coordinate[0] && y !== a.coordinate[1];
      });

      matchingAntennas.forEach(matchingAntenna => {
        const difference = [matchingAntenna.coordinate[0] - x, matchingAntenna.coordinate[1] - y];
        let xChecker = matchingAntenna.coordinate[0];
        let yChecker = matchingAntenna.coordinate[1];

        while (xChecker >= 0 && xChecker <= antennaField[0].length) {
          if (antinodeField[yChecker] && antinodeField[yChecker][xChecker]) {
            antinodeField[yChecker][xChecker] = '#';
          }
          xChecker += difference[0];
          yChecker += difference[1];
        }

        xChecker = matchingAntenna.coordinate[0];
        yChecker = matchingAntenna.coordinate[1];

        while (xChecker >= 0 && xChecker <= antennaField[0].length) {
          if (antinodeField[yChecker] && antinodeField[yChecker][xChecker]) {
            antinodeField[yChecker][xChecker] = '#';
          }
          xChecker -= difference[0];
          yChecker -= difference[1];
        }
      });
    }
  }
}

console.log(antinodeField.map(i => i.join('')));

console.log('d', antinodeField.flatMap(r => r).filter(c => c === '#').length);
