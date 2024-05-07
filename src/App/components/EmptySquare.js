import * as React from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import { switchPositions, canMoveTile } from '../utils';

export default function EmptySquare({ tilePositions, setShuffledTiles, setIsTilesShuffled }) {
  const emptyTilePosition = tilePositions.find(
    (tilePosition) => tilePosition.id === 'empty',
  )?.order;
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: ItemTypes.NUMBER,
    drop: (item) => {
      const newShuffledTiles = switchPositions(
        item.number,
        item.position,
        emptyTilePosition,
        setIsTilesShuffled,
        setShuffledTiles
      );
      setIsTilesShuffled(true);
      setShuffledTiles(newShuffledTiles);
    },
    canDrop: (item) => {
      const canMove = canMoveTile(item.position, emptyTilePosition);
      console.log("can move", canMove);
      return canMove;
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }));

  return (
    <div
      className="droppable"
      id="empty"
      key="empty"
      ref={drop}
      style={{ backgroundColor: isOver ? 'red' : 'transparent' }}
    />
  );
}
