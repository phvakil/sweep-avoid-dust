import React from 'react';

interface KitchenBackgroundProps {
  boardSize: number;
  cellSize: number;
}

const KitchenBackground: React.FC<KitchenBackgroundProps> = ({ boardSize, cellSize }) => {
  return (
    <div className="absolute inset-0 z-0">
      {/* Bright modern kitchen floor with vibrant checkered pattern */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(45deg, #fef3c7 25%, transparent 25%),
            linear-gradient(-45deg, #fef3c7 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, #fed7aa 75%),
            linear-gradient(-45deg, transparent 75%, #fed7aa 75%)
          `,
          backgroundSize: `${cellSize}px ${cellSize}px`,
          backgroundPosition: `0 0, 0 ${cellSize/2}px, ${cellSize/2}px -${cellSize/2}px, -${cellSize/2}px 0px`,
          backgroundColor: '#fef7ed'
        }}
      />
      
      {/* Bright colorful kitchen counters */}
      <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-emerald-400 via-emerald-500 to-emerald-600 shadow-lg border-b-4 border-emerald-700">
        <div className="absolute top-2 left-4 right-4 h-3 bg-gradient-to-r from-white via-emerald-50 to-white rounded-lg opacity-90 shadow-inner" />
        <div className="absolute bottom-1 left-2 right-2 h-1 bg-emerald-800 rounded" />
        {/* Colorful cabinet handles */}
        <div className="absolute top-4 left-8 w-4 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full shadow-lg" />
        <div className="absolute top-4 right-8 w-4 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full shadow-lg" />
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-blue-400 via-blue-500 to-blue-600 shadow-lg border-t-4 border-blue-700">
        <div className="absolute bottom-2 left-4 right-4 h-3 bg-gradient-to-r from-white via-blue-50 to-white rounded-lg opacity-90 shadow-inner" />
        <div className="absolute top-1 left-2 right-2 h-1 bg-blue-800 rounded" />
        <div className="absolute bottom-4 left-8 w-4 h-1 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full shadow-lg" />
        <div className="absolute bottom-4 right-8 w-4 h-1 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full shadow-lg" />
      </div>
      
      <div className="absolute top-0 bottom-0 left-0 w-12 bg-gradient-to-r from-red-400 via-red-500 to-red-600 shadow-lg border-r-4 border-red-700">
        <div className="absolute left-2 top-4 bottom-4 w-3 bg-gradient-to-b from-white via-red-50 to-white rounded-lg opacity-90 shadow-inner" />
        <div className="absolute right-1 top-2 bottom-2 w-1 bg-red-800 rounded" />
        <div className="absolute left-4 top-8 w-1 h-4 bg-gradient-to-b from-cyan-400 to-teal-400 rounded-full shadow-lg" />
        <div className="absolute left-4 bottom-8 w-1 h-4 bg-gradient-to-b from-cyan-400 to-teal-400 rounded-full shadow-lg" />
      </div>
      
      <div className="absolute top-0 bottom-0 right-0 w-12 bg-gradient-to-l from-purple-400 via-purple-500 to-purple-600 shadow-lg border-l-4 border-purple-700">
        <div className="absolute right-2 top-4 bottom-4 w-3 bg-gradient-to-b from-white via-purple-50 to-white rounded-lg opacity-90 shadow-inner" />
        <div className="absolute left-1 top-2 bottom-2 w-1 bg-purple-800 rounded" />
        <div className="absolute right-4 top-8 w-1 h-4 bg-gradient-to-b from-lime-400 to-green-400 rounded-full shadow-lg" />
        <div className="absolute right-4 bottom-8 w-1 h-4 bg-gradient-to-b from-lime-400 to-green-400 rounded-full shadow-lg" />
      </div>
      
      {/* Bright rounded corner pieces */}
      <div className="absolute top-0 left-0 w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-br-3xl border-4 border-orange-600 shadow-lg">
        <div className="absolute top-3 left-3 w-3 h-3 bg-gradient-to-br from-white to-orange-100 rounded-lg opacity-80" />
        <div className="absolute top-1 left-1 w-1 h-1 bg-white rounded-full" />
      </div>
      <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-cyan-400 to-blue-500 rounded-bl-3xl border-4 border-cyan-600 shadow-lg">
        <div className="absolute top-3 right-3 w-3 h-3 bg-gradient-to-bl from-white to-cyan-100 rounded-lg opacity-80" />
        <div className="absolute top-1 right-1 w-1 h-1 bg-white rounded-full" />
      </div>
      <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-tr from-lime-400 to-green-500 rounded-tr-3xl border-4 border-lime-600 shadow-lg">
        <div className="absolute bottom-3 left-3 w-3 h-3 bg-gradient-to-tr from-white to-lime-100 rounded-lg opacity-80" />
        <div className="absolute bottom-1 left-1 w-1 h-1 bg-white rounded-full" />
      </div>
      <div className="absolute bottom-0 right-0 w-12 h-12 bg-gradient-to-tl from-pink-400 to-purple-500 rounded-tl-3xl border-4 border-pink-600 shadow-lg">
        <div className="absolute bottom-3 right-3 w-3 h-3 bg-gradient-to-tl from-white to-pink-100 rounded-lg opacity-80" />
        <div className="absolute bottom-1 right-1 w-1 h-1 bg-white rounded-full" />
      </div>
      
      {/* Bright kitchen lighting effects */}
      <div className="absolute top-2 left-1/4 w-8 h-1 bg-gradient-to-r from-transparent via-yellow-300 to-transparent opacity-80 rounded-full" />
      <div className="absolute top-2 right-1/4 w-8 h-1 bg-gradient-to-r from-transparent via-yellow-300 to-transparent opacity-80 rounded-full" />
      <div className="absolute bottom-2 left-1/3 w-6 h-1 bg-gradient-to-r from-transparent via-amber-300 to-transparent opacity-70 rounded-full" />
      <div className="absolute bottom-2 right-1/3 w-6 h-1 bg-gradient-to-r from-transparent via-amber-300 to-transparent opacity-70 rounded-full" />
    </div>
  );
};

export default KitchenBackground;