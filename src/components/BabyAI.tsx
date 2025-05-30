import { useEffect, useCallback } from 'react';

interface Position {
  x: number;
  y: number;
}

interface BabyAIProps {
  baby: Position;
  player: Position;
  mainPile: Position | null;
  onBabyMove: (newPosition: Position) => void;
  boardSize: number;
  kitchenItems?: Array<{ type: string; position: Position }>;
}

const BabyAI: React.FC<BabyAIProps> = ({ 
  baby, 
  player, 
  mainPile, 
  onBabyMove, 
  boardSize,
  kitchenItems = []
}) => {
  const isValidPosition = useCallback((x: number, y: number) => {
    if (x < 0 || x >= boardSize || y < 0 || y >= boardSize) return false;
    
    return !kitchenItems.some(item => 
      x >= item.position.x && x < item.position.x + 2 &&
      y >= item.position.y && y < item.position.y + 2
    );
  }, [boardSize, kitchenItems]);

  const moveBaby = useCallback(() => {
    const target = mainPile || player;
    const dx = target.x - baby.x;
    const dy = target.y - baby.y;
    
    let moveX = 0;
    let moveY = 0;
    
    // Increased baby intelligence and movement probability
    if (Math.random() < 0.85) { // Increased from 0.7
      if (Math.abs(dx) > Math.abs(dy)) {
        moveX = dx > 0 ? 1 : -1;
      } else {
        moveY = dy > 0 ? 1 : -1;
      }
    } else {
      const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
      const randomDir = directions[Math.floor(Math.random() * directions.length)];
      moveX = randomDir[0];
      moveY = randomDir[1];
    }
    
    const newX = baby.x + moveX;
    const newY = baby.y + moveY;
    
    if (isValidPosition(newX, newY)) {
      onBabyMove({ x: newX, y: newY });
    }
  }, [baby, player, mainPile, onBabyMove, isValidPosition]);

  useEffect(() => {
    // Reduced interval time to make baby move more frequently
    const interval = setInterval(moveBaby, 500); // Reduced from 800ms
    return () => clearInterval(interval);
  }, [moveBaby]);

  return null;
};

export default BabyAI;