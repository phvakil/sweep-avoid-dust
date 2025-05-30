import React, { useCallback } from 'react';

interface Position {
  x: number;
  y: number;
}

interface GameState {
  player: Position;
  dustPiles: Position[];
  mainPile: Position | null;
  baby: Position;
  dustpan: Position | null;
  level: number;
  gameStatus: 'playing' | 'won' | 'gameOver';
  score: number;
  kitchenItems: Array<{ type: string; position: Position }>;
  direction: string;
}

const BOARD_SIZE = 20;

interface GameBoardLogicProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  isValidPosition: (x: number, y: number) => boolean;
}

const useGameLogic = ({ gameState, setGameState, isValidPosition }: GameBoardLogicProps) => {
  const movePlayer = useCallback((dx: number, dy: number) => {
    if (gameState.gameStatus !== 'playing') return;
    
    setGameState(prev => {
      const newX = prev.player.x + dx;
      const newY = prev.player.y + dy;
      
      if (!isValidPosition(newX, newY)) return prev;
      
      let newDirection = prev.direction;
      if (dx > 0) newDirection = 'right';
      else if (dx < 0) newDirection = 'left';
      else if (dy > 0) newDirection = 'down';
      else if (dy < 0) newDirection = 'up';
      
      const newPlayer = { x: newX, y: newY };
      
      if (newX === prev.baby.x && newY === prev.baby.y) {
        return { ...prev, gameStatus: 'gameOver' };
      }
      
      const collectedDust = prev.dustPiles.find(dust => 
        dust.x === newX && dust.y === newY
      );
      const remainingDust = prev.dustPiles.filter(dust => 
        !(dust.x === newX && dust.y === newY)
      );
      
      let newMainPile = prev.mainPile;
      let newScore = prev.score;
      if (collectedDust) {
        newMainPile = newPlayer;
        newScore += 10;
      } else if (prev.mainPile) {
        const pileNewX = prev.mainPile.x + dx;
        const pileNewY = prev.mainPile.y + dy;
        if (isValidPosition(pileNewX, pileNewY) && 
            !(pileNewX === prev.baby.x && pileNewY === prev.baby.y)) {
          newMainPile = { x: pileNewX, y: pileNewY };
        }
      }
      
      let newDustpan = prev.dustpan;
      if (remainingDust.length === 0 && !prev.dustpan) {
        do {
          newDustpan = {
            x: Math.floor(Math.random() * BOARD_SIZE),
            y: Math.floor(Math.random() * BOARD_SIZE)
          };
        } while (!isValidPosition(newDustpan.x, newDustpan.y) ||
                 (newDustpan.x === newX && newDustpan.y === newY) || 
                 (newDustpan.x === prev.baby.x && newDustpan.y === prev.baby.y));
      }
      
      let newStatus = prev.gameStatus;
      if (newDustpan && newX === newDustpan.x && newY === newDustpan.y && newMainPile) {
        newStatus = 'won';
        newScore += 100 * prev.level;
      }
      
      return {
        ...prev,
        player: newPlayer,
        dustPiles: remainingDust,
        mainPile: newMainPile,
        dustpan: newDustpan,
        gameStatus: newStatus,
        score: newScore,
        direction: newDirection
      };
    });
  }, [gameState.gameStatus, isValidPosition, setGameState]);

  const handleBabyMove = useCallback((newPosition: Position) => {
    setGameState(prev => {
      let newMainPile = prev.mainPile;
      if (prev.mainPile && newPosition.x === prev.mainPile.x && newPosition.y === prev.mainPile.y) {
        newMainPile = null;
      }
      
      if (newPosition.x === prev.player.x && newPosition.y === prev.player.y) {
        return { ...prev, gameStatus: 'gameOver' };
      }
      
      return {
        ...prev,
        baby: newPosition,
        mainPile: newMainPile
      };
    });
  }, [setGameState]);

  return { movePlayer, handleBabyMove };
};

export default useGameLogic;