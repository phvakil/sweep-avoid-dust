import React from 'react';

interface Position {
  x: number;
  y: number;
}

interface KitchenItemsProps {
  items: Array<{ type: string; position: Position }>;
  cellSize: number;
}

const KitchenItems: React.FC<KitchenItemsProps> = ({ items, cellSize }) => {
  const renderItem = (item: { type: string; position: Position }, index: number) => {
    const baseStyle = {
      left: item.position.x * cellSize,
      top: item.position.y * cellSize,
      width: cellSize * 2,
      height: cellSize * 2,
    };

    switch (item.type) {
      case 'island':
        return (
          <div
            key={index}
            className="absolute bg-gradient-to-br from-pink-300 via-pink-400 to-pink-500 rounded-3xl shadow-xl border-4 border-pink-600 z-10"
            style={baseStyle}
          >
            {/* Bright cartoon island top */}
            <div className="absolute inset-2 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-2xl border-2 border-yellow-400 shadow-inner" />
            
            {/* Fun decorative pattern */}
            <div className="absolute top-3 left-4 w-3 h-1 bg-orange-400 rounded-full" />
            <div className="absolute top-5 left-3 w-4 h-1 bg-red-400 rounded-full" />
            <div className="absolute bottom-4 right-3 w-2 h-1 bg-purple-400 rounded-full" />
            
            {/* Colorful handles */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-lg border border-blue-600" />
            
            {/* Fun decorative elements */}
            <div className="absolute top-1 right-1 w-3 h-3 bg-lime-300 rounded-full border-2 border-lime-500" />
            <div className="absolute top-2 right-2 w-1 h-1 bg-white rounded-full" />
            
            {/* Kitchen utensil decorations */}
            <div className="absolute top-4 left-2 w-1 h-3 bg-amber-600 rounded" />
            <div className="absolute top-3 left-2 w-2 h-1 bg-amber-400 rounded-full" />
          </div>
        );
      case 'fridge':
        return (
          <div
            key={index}
            className="absolute bg-gradient-to-br from-cyan-300 via-cyan-400 to-cyan-500 rounded-2xl shadow-xl border-4 border-cyan-600 z-10"
            style={baseStyle}
          >
            {/* Bright cartoon fridge door */}
            <div className="absolute inset-2 bg-gradient-to-b from-white to-cyan-50 rounded-xl border-2 border-cyan-300 shadow-inner" />
            
            {/* Colorful door handle */}
            <div className="absolute top-6 right-1 w-2 h-8 bg-gradient-to-b from-orange-400 to-red-500 rounded-full shadow-lg border-2 border-red-600" />
            
            {/* Fun freezer section */}
            <div className="absolute top-2 left-2 right-2 h-4 bg-gradient-to-b from-blue-100 to-blue-200 rounded-lg border-2 border-blue-400" />
            <div className="absolute top-3 left-3 right-3 h-1 bg-blue-300 rounded" />
            
            {/* Cartoon details - food items */}
            <div className="absolute bottom-6 left-3 w-2 h-2 bg-red-400 rounded border border-red-600" />
            <div className="absolute bottom-6 left-6 w-2 h-1 bg-green-400 rounded border border-green-600" />
            <div className="absolute bottom-4 left-3 w-3 h-1 bg-yellow-400 rounded border border-yellow-600" />
            
            {/* Fun status lights */}
            <div className="absolute bottom-3 left-3 w-1 h-1 bg-lime-400 rounded-full animate-pulse" />
            <div className="absolute bottom-3 left-5 w-1 h-1 bg-blue-400 rounded-full animate-pulse" />
            
            {/* Ice dispenser */}
            <div className="absolute top-8 left-1 w-3 h-4 bg-gradient-to-b from-purple-300 to-purple-500 rounded-lg border-2 border-purple-600" />
            <div className="absolute top-9 left-1.5 w-2 h-1 bg-white rounded opacity-80" />
          </div>
        );
      case 'stool':
        return (
          <div
            key={index}
            className="absolute z-10"
            style={{ ...baseStyle, width: cellSize, height: cellSize }}
          >
            {/* Bright cartoon bar stool seat */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-300 to-emerald-500 rounded-2xl shadow-xl border-3 border-emerald-700">
              <div className="absolute inset-1 bg-gradient-to-br from-emerald-100 to-emerald-300 rounded-xl" />
              
              {/* Fun cushion pattern */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-1 bg-emerald-600 rounded-full" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-3 bg-emerald-600 rounded-full" />
              
              {/* Bright highlight */}
              <div className="absolute top-1 left-1 w-2 h-2 bg-white rounded-full opacity-80" />
              <div className="absolute top-1.5 left-1.5 w-1 h-1 bg-emerald-200 rounded-full" />
            </div>
            
            {/* Colorful cartoon legs */}
            <div className="absolute bottom-0 left-1/4 w-1 h-3 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full shadow border border-orange-600" />
            <div className="absolute bottom-0 right-1/4 w-1 h-3 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full shadow border border-orange-600" />
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-2 bg-gradient-to-b from-red-400 to-red-600 rounded-full border border-red-700" />
            
            {/* Fun base */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {items.map((item, index) => renderItem(item, index))}
    </>
  );
};

export default KitchenItems;