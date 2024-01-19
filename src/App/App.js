import * as React from "react";
import { useState, useCallback } from "react";

import './styles.scss';

function App() {
  const [tiles, setTiles] = useState([]);
  const [shuffledTiles, setShuffledTiles] =useState([]);
  const orderTiles = useCallback((async) => {
    const order = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    let tilesInProgress = [...tiles];
    if (tiles.length === 0) {
      for (let i = 0; i < order.length; i++) {
        tilesInProgress.push(
          <div className="drag-item" draggable="true" key={i}>
            <p className="tile-number">{order[i]}</p>
          </div>
        )
      }
      tilesInProgress.push(
        <div className="drag-item" draggable="true" id="empty" key="empty"></div>
      )
      setTiles(tilesInProgress);
    }
  }, [tiles]);

  
  const shuffleTiles = useCallback(() => {
    let currentIndex = tiles.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [tiles[currentIndex], tiles[randomIndex]] = [
        tiles[randomIndex], tiles[currentIndex]];
    }
    setShuffledTiles(tiles);
  }, [tiles]);

  return (
    <div className="App">
      <header className="App-header">
      <div className="left-half">
        <button className="shuffle-button" onClick={orderTiles}>
          <p>
            order numbers
          </p>
        </button>
        <button className="shuffle-button" onClick={shuffleTiles}>
          <p>
            shuffle
          </p>
        </button>
        {tiles.length === 0 ? null : 
          (<div className='drag-list'>
              {tiles}
            </div>
          )
        }
      </div>
      </header>
    </div>
  );
}

export default App;
