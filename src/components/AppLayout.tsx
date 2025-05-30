import React from 'react';
import GameBoard from './GameBoard';

const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <GameBoard />
    </div>
  );
};

export default AppLayout;