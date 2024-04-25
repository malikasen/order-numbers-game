import * as React from 'react';
import { useState, useCallback, useEffect } from 'react';

import './styles.scss';
import Numbers from './components/Numbers';

function App() {
  const [tiles, setTiles] = useState([]);
  const [shuffledTiles, setShuffledTiles] = useState([]);
  const [isTilesShuffled, setIsTilesShuffled] = useState(false);
  const orderTiles = useCallback(
    (async) => {
      const order = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
      let tilesInProgress = [...tiles];
      if (tiles.length === 0) {
        for (let i = 0; i < order.length; i++) {
          tilesInProgress.push(
            <div className="draggable" draggable="true" key={i}>
              <Numbers number={order[i]}/>
            </div>,
          );
        }
        tilesInProgress.push(
          <div className="draggable" draggable="true" id="empty" key="empty" />,
        );
        setTiles(tilesInProgress);
      } else {
        setIsTilesShuffled(false);
      }
    },
    [tiles],
  );

  const shuffleTiles = useCallback(() => {
    let currentIndex = tiles.length,
      randomIndex;
    let tilesInProgress = [...tiles];
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [tilesInProgress[currentIndex], tilesInProgress[randomIndex]] = [
        tilesInProgress[randomIndex],
        tilesInProgress[currentIndex],
      ];
    }
    console.log('shuffled tiles', tilesInProgress);
    setShuffledTiles(tilesInProgress);
    setIsTilesShuffled(true);
  }, [tiles]);

  useEffect(() => {
    
  }, []);

  const canMoveTile = (tileCoordinate, emptyTileCoordinate) => {
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
      { 3: [2, 7] },
      { 12: [13, 8] },
      { 15: [14, 11]},
      { 1: [0, 2, 5] },
      { 2: [1, 3, 6] },
      { 4: [5, 0, 8] },
      { 8: [4, 12, 9] },
      { 7: [3, 11, 6] },
      { 11: [10, 7, 15] },
      { 13: [12, 14, 9] },
      { 14: [13, 15, 10] },
      { 5: [4, 6, 1, 9] },
      { 6: [5, 7, 2, 10] },
      { 9: [8, 10, 5, 13] },
      { 10: [9, 11, 6, 14] },
    ];
    let possibleEmptyCoordinates = allowedMoveCoordinates[tileCoordinate];
    if (possibleEmptyCoordinates.includes(emptyTileCoordinate)) {
      return true;
    }
    return false;
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="left-half">
          <button className="shuffle-button" onClick={orderTiles}>
            <p>order numbers</p>
          </button>
          <button className="shuffle-button" onClick={shuffleTiles}>
            <p>shuffle</p>
          </button>
          {tiles.length === 0 && !isTilesShuffled ? null : (
            <div className="drag-list">
              {isTilesShuffled ? shuffledTiles : tiles}
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
