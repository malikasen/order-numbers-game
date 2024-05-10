import * as React from 'react';
import { useState, useEffect } from 'react';

import './styles.scss';
import Numbers from './components/Numbers';
import EmptySquare from './components/EmptySquare';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { recordPositions } from './utils';

function App() {
  const [tiles, setTiles] = useState([]);
  const [shuffledTiles, setShuffledTiles] = useState([]);
  const [isTilesShuffled, setIsTilesShuffled] = useState(false);
  const [tilePositions, setTilePositions] = useState([]);
  const orderTiles = () => {
    let tilesInProgress = [...tiles];
    let tilePositionsInProgress = JSON.parse(JSON.stringify(tilePositions));
    if (tiles.length === 0) {
      for (let i = 0; i < 15; i++) {
        tilePositionsInProgress.push({ id: i + 1, order: i });
        tilesInProgress.push(
          <Numbers number={i + 1} tilePosition={i} />,
        );
      }
      tilesInProgress.push(
        <EmptySquare
          tilePosition={15}
          setIsTilesShuffled={setIsTilesShuffled}
          setShuffledTiles={setShuffledTiles}
        />,
      );
      tilePositionsInProgress.push({ id: 'empty', order: 15 });
      setTilePositions(tilePositionsInProgress);
      setTiles(tilesInProgress);
    } else {
      setIsTilesShuffled(false);
    }
  };

  const shuffleTiles = () => {
    let currentIndex = tiles.length,
      randomIndex;
    let tilesInProgress = [...tiles];
    // While there are remaining elements to shuffle.
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
    console.log("tiles in progress", tilesInProgress)
    setShuffledTiles(tilesInProgress);
    setIsTilesShuffled(true);
  };

  useEffect(() => {
    if (isTilesShuffled) {
      recordPositions(shuffledTiles, setTilePositions);
      console.log("positions recorded");
    }
  }, [isTilesShuffled, shuffledTiles, setTilePositions]);

  return (
    <DndProvider backend={HTML5Backend}>
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
    </DndProvider>
  );
}

export default App;
