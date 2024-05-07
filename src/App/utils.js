import * as React from 'react';
import EmptySquare from './components/EmptySquare';
import Numbers from './components/Numbers';

const recordOrders = (shuffledTiles, setTilePositions) => {
  if (shuffledTiles.length < 1) {
    return null;
  }
  let tilePositions = [];
  for (let i = 0; i < 16; i++) {
    if (shuffledTiles[i].props === undefined) {
      tilePositions.push({ id: 'empty', order: i });
    } else {
      tilePositions.push({ id: shuffledTiles[i].props.number, order: i });
    }
  }
  setTilePositions(tilePositions);
};

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
    { 15: [14, 11] }
  ];
  let allowedPositions = allowedMoveCoordinates[tilePosition];
  if (allowedPositions[Object.keys(allowedPositions)[0]].includes(emptyTilePosition)) {
    return true;
  }
  return false;
};

const switchPositions = (
  number,
  oldPosition,
  newPosition,
  setIsTilesShuffled,
  setShuffledTiles
) => {
  let shuffledTilesAfterSwitch = [];
  let tilePositionsInProgress = [];
  for (let i = 0; i < 16; i++) {
    if (i === newPosition) {
      tilePositionsInProgress.push({ id: number, order: i });
      shuffledTilesAfterSwitch.push(<Numbers number={number} tilePositions={tilePositionsInProgress}/>);
    } else if (i === oldPosition) {
      tilePositionsInProgress.push({ id: 'empty', order: i });
      shuffledTilesAfterSwitch.push(<EmptySquare tilePositions={tilePositionsInProgress} setIsTilesShuffled={setIsTilesShuffled} setShuffledTiles={setShuffledTiles}/>);
    } else {
      tilePositionsInProgress.push({ id: i+1, order: i });
      shuffledTilesAfterSwitch.push(<Numbers number={i+1} tilePositions={tilePositionsInProgress}/>);
    }
  }
  return shuffledTilesAfterSwitch;
};

export { recordOrders, switchPositions, canMoveTile };
