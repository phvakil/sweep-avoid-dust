import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import BabyAI from './BabyAI';
import TouchControls from './TouchControls';
import KitchenItems from './KitchenItems';
import GameSprites from './GameSprites';
import KitchenBackground from './KitchenBackground';

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
const CELL_SIZE = 20;

const GameBoard: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    player: { x: 1, y: 1 },
    dustPiles: [],
    mainPile: null,
    baby: { x: 18, y: 18 },
    dustpan: null,
    level: 1,
    gameStatus: 'playing',
    score: 0,
    kitchenItems: [],
    direction: 'down'
  });

  const generateKitchenLayout = useCallback((level: number) => {
    const items: Array<{ type: string; position: Position }> = [];
    const itemCount = Math.min(2 + Math.floor(level / 2), 6);
    const itemTypes = ['island', 'fridge', 'stool'];
    
    for (let i = 0; i < itemCount; i++) {
      let x, y;
      do {
        x = Math.floor(Math.random() * (BOARD_SIZE - 4)) + 2;
        y = Math.floor(Math.random() * (BOARD_SIZE - 4)) + 2;
      } while (
        (x <= 2 && y <= 2) || 
        (x >= BOARD_SIZE - 3 && y >= BOARD_SIZE - 3) ||
        items.some(item => 
          Math.abs(item.position.x - x) < 3 && Math.abs(item.position.y - y) < 3
        )
      );
      
      items.push({
        type: itemTypes[Math.floor(Math.random() * itemTypes.length)],
        position: { x, y }
      });
    }
    return items;
  }, []);

  const generateDustPiles = useCallback((level: number, kitchenItems: Array<{ type: string; position: Position }>) => {
    const piles: Position[] = [];
    const count = Math.min(5 + level * 2, 20);
    
    for (let i = 0; i < count; i++) {
      let x, y;
      do {
        x = Math.floor(Math.random() * (BOARD_SIZE - 2)) + 1;
        y = Math.floor(Math.random() * (BOARD_SIZE - 2)) + 1;
      } while (
        (x === 1 && y === 1) || 
        (x === 18 && y === 18) ||
        kitchenItems.some(item => 
          x >= item.position.x && x < item.position.x + 2 &&
          y >= item.position.y && y < item.position.y + 2
        )
      );
      piles.push({ x, y });
    }
    return piles;
  }, []);

  const initializeGame = useCallback(() => {
    const newKitchenItems = generateKitchenLayout(gameState.level);
    setGameState(prev => ({
      ...prev,
      player: { x: 1, y: 1 },
      dustPiles: generateDustPiles(prev.level, newKitchenItems),
      mainPile: null,
      baby: { x: 18, y: 18 },
      dustpan: null,
      gameStatus: 'playing',
      kitchenItems: newKitchenItems,
      direction: 'down'
    }));
  }, [generateDustPiles, generateKitchenLayout, gameState.level]);

  useEffect(() => {
    initializeGame();
  }, []);

  const isValidPosition = useCallback((x: number, y: number) => {
    if (x < 0 || x >= BOARD_SIZE || y < 0 || y >= BOARD_SIZE) return false;
    
    return !gameState.kitchenItems.some(item => 
      x >= item.position.x && x < item.position.x + 2 &&
      y >= item.position.y && y < item.position.y + 2
    );
  }, [gameState.kitchenItems]);

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
  }, [gameState.gameStatus, isValidPosition]);

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
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      e.preventDefault();
      switch (e.key) {
        case 'ArrowUp': movePlayer(0, -1); break;
        case 'ArrowDown': movePlayer(0, 1); break;
        case 'ArrowLeft': movePlayer(-1, 0); break;
        case 'ArrowRight': movePlayer(1, 0); break;
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [movePlayer]);

  const nextLevel = () => {
    setGameState(prev => ({ ...prev, level: prev.level + 1 }));
    setTimeout(initializeGame, 100);
  };

  const resetGame = () => {
    setGameState(prev => ({ ...prev, level: 1, score: 0 }));
    setTimeout(initializeGame, 100);
  };

  return (
    <div className="flex flex-col items-center p-4 bg-gradient-to-br from-orange-100 via-yellow-100 to-amber-100 min-h-screen">
      <BabyAI 
        baby={gameState.baby}
        player={gameState.player}
        mainPile={gameState.mainPile}
        onBabyMove={handleBabyMove}
        boardSize={BOARD_SIZE}
        kitchenItems={gameState.kitchenItems}
      />
      
      <div className="mb-4 text-center">
        <h1 className="text-4xl font-bold text-orange-800 mb-2 drop-shadow-lg">🧹 Kitchen Sweep 🧹</h1>
        <div className="flex gap-6 text-lg">
          <p className="text-orange-600 font-semibold">Level: {gameState.level}</p>
          <p className="text-blue-600 font-semibold">Score: {gameState.score}</p>
          <p className="text-gray-600">Dust: {gameState.dustPiles.length}</p>
        </div>
      </div>
      
      <TouchControls onMove={movePlayer}>
        <div 
          className="relative border-4 border-orange-800 bg-gradient-to-br from-yellow-50 to-orange-50 shadow-2xl rounded-lg overflow-hidden"
          style={{ 
            width: BOARD_SIZE * CELL_SIZE, 
            height: BOARD_SIZE * CELL_SIZE 
          }}
        >
          <KitchenBackground boardSize={BOARD_SIZE} cellSize={CELL_SIZE} />
          <KitchenItems items={gameState.kitchenItems} cellSize={CELL_SIZE} />
          <GameSprites 
            player={gameState.player}
            baby={gameState.baby}
            dustPiles={gameState.dustPiles}
            mainPile={gameState.mainPile}
            dustpan={gameState.dustpan}
            cellSize={CELL_SIZE}
            direction={gameState.direction}
          />
        </div>
      </TouchControls>
      
      {gameState.gameStatus === 'won' && (
        <div className="mt-4 text-center bg-green-100 p-6 rounded-lg border-2 border-green-500 shadow-lg">
          <p className="text-3xl font-bold text-green-700 mb-2">🎉 Level Complete! 🎉</p>
          <p className="text-lg text-green-600 mb-3">+{100 * gameState.level} bonus points!</p>
          <Button onClick={nextLevel} className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-2">
            Next Level →
          </Button>
        </div>
      )}
      
      {gameState.gameStatus === 'gameOver' && (
        <div className="mt-4 text-center bg-red-100 p-6 rounded-lg border-2 border-red-500 shadow-lg">
          <p className="text-3xl font-bold text-red-700 mb-2">💥 Game Over! 💥</p>
          <p className="text-lg text-red-600 mb-3">The baby caught you!</p>
          <p className="text-md text-gray-600 mb-3">Final Score: {gameState.score}</p>
          <Button onClick={resetGame} className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2">
            Try Again
          </Button>
        </div>
      )}
      
      <div className="mt-4 text-center text-sm text-gray-600 bg-white/50 p-3 rounded-lg">
        <p className="font-semibold mb-1">🎮 Controls: Swipe to change direction, tap to stop</p>
        <p>🎯 Goal: Collect all dust → Get the dustpan → Avoid the baby!</p>
      </div>
    </div>
  );
};

export default GameBoard;