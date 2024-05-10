import * as React from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import { switchPositions, canMoveTile } from '../utils';

export default function EmptySquare({
  tilePosition,
  setShuffledTiles,
  setIsTilesShuffled,
}) {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: ItemTypes.NUMBER,
    drop: (item) => {
      const newShuffledTiles = switchPositions(
        item.number,
        item.tilePosition,
        tilePosition,
        setIsTilesShuffled,
        setShuffledTiles,
      );
      setIsTilesShuffled(true);
      setShuffledTiles(newShuffledTiles);
    },
    canDrop: (item) => {
      console.log("item", item);
      const canMove = canMoveTile(item.tilePosition, tilePosition);
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
