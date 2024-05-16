import * as React from 'react';
import { useState } from 'react';

import './styles.scss';
import Numbers from './components/Numbers';
import EmptySquare from './components/EmptySquare';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  const [tiles, setTiles] = useState([]);
  const [positions, setPositions] = useState([]);
  const orderTiles = () => {
    const initialPositions = Array.from({ length: 15 }, (_, index) => ({
      number: index + 1,
      position: index,
    }));
    initialPositions.push({ number: 'empty', position: 15 });

    let tilesInProgress = [];
    for (let i = 0; i < 15; i++) {
      tilesInProgress.push(
        <Numbers number={initialPositions[i].number} tilePosition={i} />,
      );
    }
    tilesInProgress.push(
      <EmptySquare
        number="empty"
        tilePosition={initialPositions.length - 1}
        tiles={tilesInProgress}
        setTiles={setTiles}
        positions={initialPositions}
        setPositions={setPositions}
      />,
    );
    console.log('order', initialPositions);
    setTiles(tilesInProgress);
    setPositions(initialPositions);
  };

  const shuffleTiles = () => {
    let positionsInProgress = [];
    const numbersArray = Array.from({ length: 15 }, (_, index) => index + 1);
    for (let i = numbersArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbersArray[i], numbersArray[j]] = [numbersArray[j], numbersArray[i]];
    }

    let tilesInProgress = [];
    for (let i = 0; i < numbersArray.length; i++) {
      positionsInProgress.push({ number: numbersArray[i], position: i });
      tilesInProgress.push(
        <Numbers number={numbersArray[i]} tilePosition={i} />,
      );
    }
    positionsInProgress.push({
      number: 'empty',
      position: numbersArray.length,
    });
    tilesInProgress.push(
      <EmptySquare
        number="empty"
        tilePosition={numbersArray.length}
        tiles={tilesInProgress}
        setTiles={setTiles}
        positions={positionsInProgress}
        setPositions={setPositions}
      />,
    );
    console.log('shuffle', positionsInProgress);
    setTiles(tilesInProgress);
    setPositions(positionsInProgress);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <button className="shuffle-button" onClick={orderTiles}>
        <p>order numbers</p>
      </button>
      <button className="shuffle-button" onClick={shuffleTiles}>
        <p>shuffle</p>
      </button>
      <div className="drag-list">{tiles}</div>
    </DndProvider>
  );
}

export default App;
