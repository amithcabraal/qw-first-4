import React from 'react';
import { RotateCcw } from 'lucide-react';

interface GameOverProps {
  score: number;
  highScore: number;
  onRestart: () => void;
}

export function GameOver({ score, highScore, onRestart }: GameOverProps) {
  return (
    <div className="bg-white rounded-xl shadow-2xl p-8 text-center">
      <h2 className="text-3xl font-bold mb-4">Game Over!</h2>
      <p className="text-xl mb-4">Final Score: {score}</p>
      {score === highScore && score > 0 && (
        <p className="text-green-600 font-bold mb-4">New High Score! 🎉</p>
      )}
      <button
        onClick={onRestart}
        className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-3 px-8 rounded-full hover:opacity-90 transition-opacity flex items-center gap-2 mx-auto"
      >
        <RotateCcw className="w-5 h-5" />
        Play Again
      </button>
    </div>
  );
}