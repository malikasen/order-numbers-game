import * as React from "react";

import './styles.scss';

function App() {
  let tiles = []
  for (let i = 0; i < 15; i++) {
    tiles.push(
      <div className="drag-item" draggable="true" key={i}>
        <p className="tile-number">{i+1}</p>
      </div>
    )
  }
  tiles.push(
    <div className="drag-item" draggable="true" id="empty" key="empty"></div>
  )
  return (
    <div className="App">
      <header className="App-header">
      <div className="left-half">
      <button className="button">
          <p>
            play
          </p>
        </button>
        <div class='drag-list'>
          {tiles}
        </div>
      </div>
      </header>
    </div>
  );
}

export default App;
