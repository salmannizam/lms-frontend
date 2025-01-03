// src/components/DroppableArea.tsx
import React from 'react';
import { useDrop } from 'react-dnd';
import DraggableItem from './DraggableItem'; // Import the draggable item

interface DroppableAreaProps {
  id: string;
  items: string[];
}

const DroppableArea: React.FC<DroppableAreaProps> = ({ id, items }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'ITEM', // Accept only draggable items of type 'ITEM'
    drop: (item: { id: string }) => console.log('Dropped:', item.id),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop} // Attach the drop reference here
      style={{
        minHeight: '200px',
        width: '100%',
        backgroundColor: isOver ? '#e0e0e0' : '#f4f4f4',
        padding: '16px',
        border: '2px dashed #ccc',
      }}
    >
      <h3>Drop Items Here</h3>
      {items.map((item, index) => (
        <DraggableItem key={index} id={item} text={item} />
      ))}
    </div>
  );
};

export default DroppableArea;
