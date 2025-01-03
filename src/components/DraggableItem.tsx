// src/components/DraggableItem.tsx
import React from 'react';
import { useDrag } from 'react-dnd';

interface DraggableItemProps {
  id: string;
  text: string;
}

const DraggableItem: React.FC<DraggableItemProps> = ({ id, text }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'ITEM', // Type of draggable item
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag} // Attach the drag reference here
      style={{
        opacity: isDragging ? 0.5 : 1,
        padding: '8px',
        margin: '4px',
        border: '1px solid #ccc',
        cursor: 'move',
      }}
    >
      {text}
    </div>
  );
};

export default DraggableItem;
