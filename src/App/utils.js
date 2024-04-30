const recordOrders = (shuffledTiles, setTilePositions) => {
  if (shuffledTiles.length < 1) {
    console.log('return');
    return null;
  }
  let tilePositions = [];
  for (let i = 0; i < 16; i++) {
    let tilePosition = {
      id: null,
      order: null,
    };
    if (shuffledTiles[i].props === undefined) {
      tilePosition.id = 'empty';
    } else {
      tilePosition.id = shuffledTiles[i].props.number;
    }
    tilePosition.order = i;
    tilePositions.push(tilePosition);
  }
  setTilePositions(tilePositions);
  console.log(tilePositions);
};

export default recordOrders;