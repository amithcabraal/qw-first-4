import React from 'react';
import { Trophy, Timer } from 'lucide-react';

interface GameHeaderProps {
  score: number;
  timeLeft: number;
  highScore: number;
}

export function GameHeader({ score, timeLeft, highScore }: GameHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-8 text-white">
      <div className="flex items-center gap-2">
        <Trophy className="w-6 h-6" />
        <span className="text-xl">Score: {score}</span>
      </div>
      <div className="flex items-center gap-2">
        <Timer className="w-6 h-6" />
        <span className="text-xl">{timeLeft}s</span>
      </div>
      <div className="flex items-center gap-2">
        <Trophy className="w-6 h-6" />
        <span className="text-xl">Best: {highScore}</span>
      </div>
    </div>
  );
}