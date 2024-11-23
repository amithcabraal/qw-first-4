import React from 'react';

interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">Which Came First?</h1>
        <p className="text-gray-600 mb-4">
          Test your knowledge of historical events! Choose which event happened first and see how many you can get right before time runs out.
        </p>
        <p className="text-gray-600 mb-8">
          Events are selected within a 5-year range to make the game challenging!
        </p>
        <button
          onClick={onStart}
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-3 px-8 rounded-full hover:opacity-90 transition-opacity"
        >
          Start Game
        </button>
      </div>
    </div>
  );
}