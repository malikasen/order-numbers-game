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
    <div className="draggable" id={number} key={number} ref={drag}>
      <p
        className="tile-number"
        style={{
          fontSize: isDragging ? 40 : 30,
        }}
      >
        {number}
      </p>
    </div>
  );
}
