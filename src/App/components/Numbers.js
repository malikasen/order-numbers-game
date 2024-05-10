import * as React from 'react';
import { ItemTypes } from './ItemTypes';
import { useDrag } from 'react-dnd';

export default function Numbers({ number, tilePosition }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.NUMBER,
    item: { number, tilePosition },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div className="draggable" id={number} key={number} ref={drag} style={{
      backgroundColor: isDragging ? 'rgb(236, 214, 189)' : 'rgb(168, 118, 65)',
    }}>
      <p
        className="tile-number"
      >
        {number}
      </p>
    </div>
  );
}
