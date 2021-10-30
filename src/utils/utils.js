export function shuffle(array) {
  for (let k = 0; k < array.length; k++) {
    let i = array[k].length;
    if (i === 0) return undefined;
    else {
      while (--i) {
        let j = Math.floor(Math.random() * (i + 1));
        let tempi = array[k][i];
        let tempj = array[k][j];
        array[k][i] = tempj;
        array[k][j] = tempi;
      }
    }
  }
  return array;
}

export function generateMap(grid) {
  let count = 0;
  const rows = grid ? 6 : 4;
  let tempGameMap = [];

  for (let i = 0; i < rows; i++) {
    tempGameMap.push([]);
    for (let j = 0; j < rows; j++) {
      tempGameMap[i][j] = ++count;
      count = count < (rows * rows) / 2 ? count : 0;
    }
  }

  return shuffle(tempGameMap);
}
