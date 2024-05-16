import * as React from 'react';
import EmptySquare from './components/EmptySquare';
import Numbers from './components/Numbers';

const canMoveTile = (tilePosition, emptyTilePosition) => {
  // Corner Cases
  // 0'th element can move right or down
  // 3'rd element can move left or down
  // 12'th element can move right or up
  // 15'th element can move left or up
  // Edge Cases
  // 1's and 2'nd move right, left or down
  // 4'th and 8'th move right, up or down
  // 7'th and 11'th move left, up or down
  // 13'th and 14'th move left, right or up
  // Center
  // 5'th, 6ht, 9'th and 10'th can move left. right, up or down
  const allowedMoveCoordinates = [
    { 0: [1, 4] },
    { 1: [0, 2, 5] },
    { 2: [1, 3, 6] },
    { 3: [2, 7] },
    { 4: [5, 0, 8] },
    { 5: [4, 6, 1, 9] },
    { 6: [5, 7, 2, 10] },
    { 7: [3, 11, 6] },
    { 8: [4, 12, 9] },
    { 9: [8, 10, 5, 13] },
    { 10: [9, 11, 6, 14] },
    { 11: [10, 7, 15] },
    { 12: [13, 8] },
    { 13: [12, 14, 9] },
    { 14: [13, 15, 10] },
    { 15: [14, 11] },
  ];
  let allowedPositions = allowedMoveCoordinates[tilePosition];
  console.log('pos', tilePosition, emptyTilePosition);
  console.log('allow', allowedPositions);
  if (
    allowedPositions[Object.keys(allowedPositions)[0]].includes(
      emptyTilePosition,
    )
  ) {
    return true;
  }
  return false;
};

const switchPositions = (
  number,
  oldPosition,
  newPosition,
  tiles,
  setTiles,
  positions,
  setPositions,
) => {
  let tilesAfterSwitch = [];
  let positionsInProgress = [...positions];
  for (let i = 0; i < 16; i++) {
    if (i === newPosition) {
      tilesAfterSwitch.push(<Numbers number={number} tilePosition={i} />);
    } else if (i === oldPosition) {
      //switching tiles when numbers are shuffled
      positionsInProgress[newPosition] = {
        number: number,
        position: newPosition,
      };
      positionsInProgress[oldPosition] = {
        number: 'empty',
        position: oldPosition,
      };
      tilesAfterSwitch.push(
        <EmptySquare
          number="empty"
          tilePosition={i}
          tiles={tilesAfterSwitch}
          setTiles={setTiles}
          positions={positionsInProgress}
          setPositions={setPositions}
        />,
      );
    } else {
      tilesAfterSwitch.push(
        <Numbers number={tiles[i].props.number} tilePosition={i} />,
      );
    }
  }
  setTiles(tilesAfterSwitch);
  setPositions(positionsInProgress);
};

export { switchPositions, canMoveTile };
