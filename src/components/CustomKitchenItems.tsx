import React from 'react';

interface Position {
  x: number;
  y: number;
}

interface CustomKitchenItemsProps {
  items: Array<{ type: string; position: Position }>;
  cellSize: number;
  customImages: { [key: string]: string };
}

const CustomKitchenItems: React.FC<CustomKitchenItemsProps> = ({ items, cellSize, customImages }) => {
  const renderItem = (item: { type: string; position: Position }, index: number) => {
    const baseStyle = {
      left: item.position.x * cellSize,
      top: item.position.y * cellSize,
      width: item.type === 'stool' ? cellSize : cellSize * 2,
      height: item.type === 'stool' ? cellSize : cellSize * 2,
    };

    const imageUrl = customImages[item.type];
    
    if (imageUrl) {
      return (
        <div
          key={index}
          className="absolute z-10"
          style={baseStyle}
        >
          <img
            src={imageUrl}
            alt={item.type}
            className="w-full h-full object-contain rounded-lg shadow-xl"
            style={{ imageRendering: 'pixelated' }}
          />
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-gray-700 bg-white px-2 py-1 rounded shadow opacity-75">
            {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
          </div>
        </div>
      );
    }
    
    return null;
  };

  return (
    <>
      {items.map((item, index) => renderItem(item, index))}
    </>
  );
};

export default CustomKitchenItems;