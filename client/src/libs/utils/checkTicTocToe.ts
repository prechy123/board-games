function checkTicTocToe(tiles: string[][]) {
  const correct = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const flatTiles = tiles.flat();
  for (let i = 0; i < correct.length; i++) {
    const [x, y, z] = correct[i];
    if (
      flatTiles[x] !== "-" &&
      flatTiles[x] === flatTiles[y] &&
      flatTiles[y] === flatTiles[z]
    ) {
      return flatTiles[x];
    }
  }

  const allFilled = flatTiles.every((tile) => tile !== "-");

  if (allFilled) {
    return "draw";
  }
  return "";
}

export default checkTicTocToe;
