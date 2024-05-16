import React, { useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import { switchPositions, canMoveTile } from '../utils';

export default function EmptySquare({
  tilePosition,
  tiles,
  setTiles,
  positions,
  setPositions,
}) {
  const drop = useCallback(() => {
    return {
      accept: ItemTypes.NUMBER,
      drop: (item) => {
        switchPositions(
          tiles[item.tilePosition].props.number,
          item.tilePosition,
          tilePosition,
          tiles,
          setTiles,
          positions,
          setPositions,
        );
      },
      canDrop: (item) => {
        const canMove = canMoveTile(item.tilePosition, tilePosition);
        console.log('canMove', canMove);
        return canMove;
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    };
  }, [tilePosition, tiles, positions, setTiles, setPositions]);

  const [{ isOver }, dropRef] = useDrop(drop());

  return (
    <div
      className="droppable"
      id="empty"
      key="empty"
      ref={dropRef}
      style={{ backgroundColor: isOver ? 'rgb(168, 118, 65)' : 'transparent' }}
    />
  );
}
