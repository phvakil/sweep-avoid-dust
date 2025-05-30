import React, { useRef, useCallback, useState } from 'react';

interface TouchControlsProps {
  onMove: (dx: number, dy: number) => void;
  children: React.ReactNode;
}

const TouchControls: React.FC<TouchControlsProps> = ({ onMove, children }) => {
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const [currentDirection, setCurrentDirection] = useState<{ dx: number; dy: number } | null>(null);
  const [isMoving, setIsMoving] = useState(false);
  const minSwipeDistance = 30;

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;
    
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);
    
    if (Math.max(absX, absY) < minSwipeDistance) return;
    
    let newDirection;
    if (absX > absY) {
      newDirection = { dx: deltaX > 0 ? 1 : -1, dy: 0 };
    } else {
      newDirection = { dx: 0, dy: deltaY > 0 ? 1 : -1 };
    }
    
    // Only change direction if it's different from current
    if (!currentDirection || 
        currentDirection.dx !== newDirection.dx || 
        currentDirection.dy !== newDirection.dy) {
      setCurrentDirection(newDirection);
      setIsMoving(true);
    }
    
    touchStartRef.current = null;
  }, [currentDirection]);

  // Continuous movement in current direction
  React.useEffect(() => {
    if (!isMoving || !currentDirection) return;
    
    const interval = setInterval(() => {
      onMove(currentDirection.dx, currentDirection.dy);
    }, 200);
    
    return () => clearInterval(interval);
  }, [isMoving, currentDirection, onMove]);

  // Stop movement when touching again
  const handleTouchStartStop = useCallback((e: React.TouchEvent) => {
    if (isMoving) {
      setIsMoving(false);
      e.preventDefault();
      return;
    }
    handleTouchStart(e);
  }, [isMoving, handleTouchStart]);

  return (
    <div
      onTouchStart={handleTouchStartStop}
      onTouchEnd={handleTouchEnd}
      className="touch-none select-none relative"
    >
      {children}
      {isMoving && (
        <div className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded text-xs z-30">
          Moving {currentDirection?.dx === 1 ? '→' : currentDirection?.dx === -1 ? '←' : currentDirection?.dy === 1 ? '↓' : '↑'}
          <br />Tap to stop
        </div>
      )}
    </div>
  );
};

export default TouchControls;