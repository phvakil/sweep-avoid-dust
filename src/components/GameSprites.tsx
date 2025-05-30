import React from 'react';

interface Position {
  x: number;
  y: number;
}

interface GameSpritesProps {
  player: Position;
  baby: Position;
  dustPiles: Position[];
  mainPile: Position | null;
  dustpan: Position | null;
  cellSize: number;
  direction: string;
}

const GameSprites: React.FC<GameSpritesProps> = ({
  player,
  baby,
  dustPiles,
  mainPile,
  dustpan,
  cellSize,
  direction
}) => {
  const getPlayerRotation = () => {
    switch(direction) {
      case 'up': return 'rotate-0';
      case 'down': return 'rotate-180';
      case 'left': return '-rotate-90';
      case 'right': return 'rotate-90';
      default: return 'rotate-0';
    }
  };

  return (
    <>
      {/* Modern Cartoon Chef Character */}
      <div
        className={`absolute transform transition-all duration-150 z-20 ${getPlayerRotation()}`}
        style={{
          left: player.x * cellSize + 2,
          top: player.y * cellSize + 2,
          width: cellSize - 4,
          height: cellSize - 4
        }}
      >
        <div className="w-full h-full relative">
          {/* Bright chef hat */}
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-5 h-4 bg-gradient-to-t from-white to-gray-50 rounded-t-full border-2 border-blue-300 shadow-lg" />
          <div className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-4 h-2 bg-blue-100 rounded border border-blue-400" />
          
          {/* Cartoon head */}
          <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-br from-peach-200 to-orange-300 rounded-full border-2 border-orange-400 shadow-md" />
          
          {/* Big cartoon eyes */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 -translate-x-1 w-1 h-1 bg-white rounded-full border border-black" />
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 translate-x-1 w-1 h-1 bg-white rounded-full border border-black" />
          <div className="absolute top-2.5 left-1/2 transform -translate-x-1/2 -translate-x-1 w-0.5 h-0.5 bg-black rounded-full" />
          <div className="absolute top-2.5 left-1/2 transform -translate-x-1/2 translate-x-1 w-0.5 h-0.5 bg-black rounded-full" />
          
          {/* Happy smile */}
          <div className="absolute top-3.5 left-1/2 transform -translate-x-1/2 w-2 h-1 bg-red-400 rounded-full border border-red-600" />
          
          {/* Bright chef uniform */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-4 h-5 bg-gradient-to-b from-cyan-200 to-cyan-400 rounded border-2 border-cyan-600" />
          <div className="absolute top-5 left-1/2 transform -translate-x-1/2 w-3 h-1 bg-cyan-600 rounded" />
          
          {/* Cartoon arms holding broom */}
          <div className="absolute top-5 left-1/2 transform -translate-x-1/2 -translate-x-2 w-2 h-3 bg-gradient-to-b from-peach-200 to-orange-300 rounded-full border border-orange-400" />
          <div className="absolute top-5 left-1/2 transform -translate-x-1/2 translate-x-2 w-2 h-3 bg-gradient-to-b from-peach-200 to-orange-300 rounded-full border border-orange-400" />
          
          {/* Colorful broom handle */}
          <div className="absolute top-3 left-1/2 transform -translate-x-1/2 translate-y-6 w-1 h-8 bg-gradient-to-b from-amber-600 to-amber-800 rounded-full border border-amber-900" />
          
          {/* Bright broom bristles */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-5 h-3 bg-gradient-to-b from-yellow-300 to-orange-400 rounded-b-lg border-2 border-orange-600" />
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-2 bg-yellow-200 rounded opacity-80" />
        </div>
      </div>

      {/* Adorable Cartoon Baby */}
      <div
        className="absolute transform transition-all duration-200 z-20 animate-bounce"
        style={{
          left: baby.x * cellSize + 2,
          top: baby.y * cellSize + 2,
          width: cellSize - 4,
          height: cellSize - 4
        }}
      >
        <div className="w-full h-full relative">
          {/* Large cartoon baby head */}
          <div className="w-5 h-5 bg-gradient-to-br from-pink-100 to-pink-200 rounded-full mx-auto border-3 border-pink-400 relative shadow-lg">
            {/* Huge adorable eyes */}
            <div className="absolute top-1 left-0.5 w-1.5 h-1.5 bg-white rounded-full border-2 border-blue-400 shadow" />
            <div className="absolute top-1 right-0.5 w-1.5 h-1.5 bg-white rounded-full border-2 border-blue-400 shadow" />
            <div className="absolute top-1.5 left-1 w-1 h-1 bg-black rounded-full" />
            <div className="absolute top-1.5 right-1 w-1 h-1 bg-black rounded-full" />
            
            {/* Sparkles in eyes */}
            <div className="absolute top-1.5 left-1.5 w-0.5 h-0.5 bg-white rounded-full" />
            <div className="absolute top-1.5 right-1.5 w-0.5 h-0.5 bg-white rounded-full" />
            
            {/* Happy baby mouth */}
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-1 bg-red-400 rounded-full border border-red-600" />
            
            {/* Rosy cartoon cheeks */}
            <div className="absolute top-2.5 left-0 w-1 h-1 bg-pink-400 rounded-full opacity-80" />
            <div className="absolute top-2.5 right-0 w-1 h-1 bg-pink-400 rounded-full opacity-80" />
            
            {/* Cute hair tuft */}
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gradient-to-t from-amber-300 to-yellow-400 rounded-full border border-yellow-600" />
          </div>
          
          {/* Bright baby onesie */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-3 bg-gradient-to-b from-lime-200 to-lime-400 rounded-lg border-2 border-lime-600" />
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-1 bg-lime-600 rounded" />
          
          {/* Chubby little arms */}
          <div className="absolute top-4 left-0 w-2 h-2 bg-gradient-to-br from-pink-200 to-pink-300 rounded-full border border-pink-400" />
          <div className="absolute top-4 right-0 w-2 h-2 bg-gradient-to-br from-pink-200 to-pink-300 rounded-full border border-pink-400" />
        </div>
      </div>

      {/* Colorful dust piles */}
      {dustPiles.map((dust, i) => (
        <div
          key={i}
          className="absolute z-10"
          style={{
            left: dust.x * cellSize + 4,
            top: dust.y * cellSize + 4,
            width: cellSize - 8,
            height: cellSize - 8
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-500 rounded-full shadow-lg border-2 border-gray-600 animate-pulse" />
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-1 bg-gray-200 rounded-full opacity-70" />
          <div className="absolute bottom-0 left-1/4 w-1 h-1 bg-gray-400 rounded-full opacity-60" />
        </div>
      ))}

      {/* Large main dust pile */}
      {mainPile && (
        <div
          className="absolute z-15"
          style={{
            left: mainPile.x * cellSize,
            top: mainPile.y * cellSize,
            width: cellSize,
            height: cellSize
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-700 rounded-full shadow-2xl border-3 border-gray-800 animate-pulse" />
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-3 h-2 bg-gray-200 rounded-full opacity-80" />
          <div className="absolute bottom-2 left-1/3 w-2 h-2 bg-gray-300 rounded-full opacity-60" />
          <div className="absolute bottom-2 right-1/3 w-2 h-2 bg-gray-300 rounded-full opacity-60" />
        </div>
      )}

      {/* Bright cartoon dustpan */}
      {dustpan && (
        <div
          className="absolute z-15 animate-pulse"
          style={{
            left: dustpan.x * cellSize,
            top: dustpan.y * cellSize,
            width: cellSize,
            height: cellSize
          }}
        >
          <div className="w-full h-full relative">
            {/* Bright dustpan body */}
            <div className="absolute bottom-1 left-1 right-1 h-4/5 bg-gradient-to-t from-blue-500 to-blue-300 rounded-t-2xl border-3 border-blue-700 shadow-xl" />
            <div className="absolute bottom-3 left-2 right-2 h-2 bg-blue-100 rounded-lg opacity-90" />
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-blue-800 rounded-b-lg" />
            
            {/* Colorful handle */}
            <div className="absolute top-1 right-1 w-2 h-4 bg-gradient-to-b from-red-400 to-red-600 rounded-full border-2 border-red-800" />
            <div className="absolute top-1 right-0.5 w-1 h-2 bg-yellow-400 rounded-full border border-yellow-600" />
            
            {/* Clear goal indicator */}
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 text-lg font-bold text-white bg-green-500 px-2 py-1 rounded-lg shadow-lg border-2 border-green-700">🎯 GOAL</div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-1 bg-green-400 rounded opacity-80 animate-ping" />
            
            {/* Sparkle effects */}
            <div className="absolute top-2 left-2 w-1 h-1 bg-yellow-300 rounded-full animate-ping" />
            <div className="absolute bottom-3 right-3 w-1 h-1 bg-cyan-300 rounded-full animate-ping" />
          </div>
        </div>
      )}
    </>
  );
};

export default GameSprites;