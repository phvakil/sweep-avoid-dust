import React from 'react';

interface Position {
  x: number;
  y: number;
}

interface CustomGameSpritesProps {
  player: Position;
  baby: Position;
  dustPiles: Position[];
  mainPile: Position | null;
  dustpan: Position | null;
  cellSize: number;
  direction: string;
  customImages: { [key: string]: string };
}

const CustomGameSprites: React.FC<CustomGameSpritesProps> = ({
  player,
  baby,
  dustPiles,
  mainPile,
  dustpan,
  cellSize,
  direction,
  customImages
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

  const renderSprite = (type: string, position: Position, additionalClasses = '', size = cellSize - 4) => {
    const imageUrl = customImages[type];
    
    if (imageUrl) {
      return (
        <div
          className={`absolute z-20 ${additionalClasses}`}
          style={{
            left: position.x * cellSize + 2,
            top: position.y * cellSize + 2,
            width: size,
            height: size
          }}
        >
          <img
            src={imageUrl}
            alt={type}
            className="w-full h-full object-contain rounded-lg shadow-lg"
            style={{ imageRendering: 'pixelated' }}
          />
          {type === 'dustpan' && (
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-white bg-green-500 px-2 py-1 rounded shadow">
              🎯 GOAL
            </div>
          )}
        </div>
      );
    }
    
    return null;
  };

  return (
    <>
      {/* Player with custom image */}
      {renderSprite('player', player, `transform transition-all duration-150 ${getPlayerRotation()}`)}
      
      {/* Baby with custom image */}
      {renderSprite('baby', baby, 'transform transition-all duration-200 animate-bounce')}
      
      {/* Dust piles with custom images */}
      {dustPiles.map((dust, i) => (
        <div key={i}>
          {renderSprite('dust', dust, 'animate-pulse', cellSize - 8)}
        </div>
      ))}
      
      {/* Main dust pile */}
      {mainPile && renderSprite('dust', mainPile, 'animate-pulse', cellSize)}
      
      {/* Dustpan with custom image */}
      {dustpan && renderSprite('dustpan', dustpan, 'animate-pulse', cellSize)}
    </>
  );
};

export default CustomGameSprites;