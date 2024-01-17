import * as React from "react";

import './styles.scss';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <div class="left-half">
        <div class='drag-list'>
          <div className="drag-item" draggable="true"><p className="tile-number">1</p>
            </div>
          <div className="drag-item" draggable="true"><p className="tile-number">2</p>
            </div>
          <div className="drag-item" draggable="true"><p className="tile-number">3</p>
            </div>
          <div className="drag-item" draggable="true"><p className="tile-number">4</p>
            </div>
          <div className="drag-item" draggable="true"><p className="tile-number">5</p>
            </div>
          <div className="drag-item" draggable="true"><p className="tile-number">6</p>
            </div>
          <div className="drag-item" draggable="true"><p className="tile-number">7</p>
            </div>
          <div className="drag-item" draggable="true"><p className="tile-number">8</p>
            </div>
          <div className="drag-item" draggable="true"><p className="tile-number">9</p>
            </div>
          <div className="drag-item" draggable="true"><p className="tile-number">10</p>
            </div>
          <div className="drag-item" draggable="true"><p className="tile-number">11</p>
            </div>
          <div className="drag-item" draggable="true"><p className="tile-number">12</p>
            </div>
          <div className="drag-item" draggable="true"><p className="tile-number">13</p>
            </div>
          <div className="drag-item" draggable="true"><p className="tile-number">14</p>
            </div>
            <div className="drag-item" draggable="true">
            <p className="tile-number">15</p>
            </div>
          <div className="drag-item"><p className="tile-number">E</p></div>
        </div>
      </div>
      </header>
    </div>
  );
}

export default App;
