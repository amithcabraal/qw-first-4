import React, { useState, useCallback, useEffect } from 'react';
import { Event } from './types/Event';
import { events } from './data/events';
import { StartScreen } from './components/StartScreen';
import { GameHeader } from './components/GameHeader';
import { GameOver } from './components/GameOver';
import { EventCard } from './components/EventCard';
import { RotateCcw } from 'lucide-react';

function App() {
  const [event1, setEvent1] = useState<Event | null>(null);
  const [event2, setEvent2] = useState<Event | null>(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const getEventsWithinTimeRange = useCallback((baseEvent: Event, maxYearDiff: number = 5): Event[] => {
    if (!baseEvent?.date) return [];
    
    const baseDate = new Date(baseEvent.date);
    
    return events.filter(event => {
      if (!event?.date || event === baseEvent) return false;
      const eventDate = new Date(event.date);
      const diffInMonths = Math.abs(
        (eventDate.getFullYear() - baseDate.getFullYear()) * 12 +
        (eventDate.getMonth() - baseDate.getMonth())
      );
      return diffInMonths <= maxYearDiff * 12 && event.eventImage;
    });
  }, []);

  const getRandomEvent = useCallback((): Event => {
    const validEvents = events.filter(event => event.date && event.eventImage);
    return validEvents[Math.floor(Math.random() * validEvents.length)];
  }, []);

  const setupNewRound = useCallback(() => {
    setSelectedEvent(null);
    setIsCorrect(null);
    
    const firstEvent = getRandomEvent();
    const nearbyEvents = getEventsWithinTimeRange(firstEvent);
    
    if (nearbyEvents.length > 0) {
      const secondEvent = nearbyEvents[Math.floor(Math.random() * nearbyEvents.length)];
      setEvent1(firstEvent);
      setEvent2(secondEvent);
    } else {
      setupNewRound(); // Try again if no nearby events found
    }
  }, [getRandomEvent, getEventsWithinTimeRange]);

  const handleChoice = useCallback((chosenEvent: Event, otherEvent: Event) => {
    if (!chosenEvent?.date || !otherEvent?.date || gameOver || selectedEvent) return;

    const chosenDate = new Date(chosenEvent.date);
    const otherDate = new Date(otherEvent.date);
    
    setSelectedEvent(chosenEvent);
    const correct = chosenDate < otherDate;
    setIsCorrect(correct);

    if (correct) {
      setTimeout(() => {
        setScore(prev => prev + 1);
        setupNewRound();
      }, 2000);
    } else {
      setTimeout(() => {
        setGameOver(true);
        if (score > highScore) {
          setHighScore(score);
        }
      }, 2000);
    }
  }, [gameOver, score, highScore, setupNewRound, selectedEvent]);

  const startGame = useCallback(() => {
    setScore(0);
    setGameOver(false);
    setTimeLeft(60);
    setGameStarted(true);
    setupNewRound();
  }, [setupNewRound]);

  useEffect(() => {
    if (gameStarted && !gameOver && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameOver(true);
            if (score > highScore) {
              setHighScore(score);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [gameStarted, gameOver, timeLeft, score, highScore]);

  if (!gameStarted) {
    return <StartScreen onStart={startGame} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 p-4">
      <div className="max-w-6xl mx-auto">
        <GameHeader score={score} timeLeft={timeLeft} highScore={highScore} />

        {gameOver ? (
          <GameOver score={score} highScore={highScore} onRestart={startGame} />
        ) : (
          <>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {event1 && event2 && (
                <>
                  <EventCard
                    event={event1}
                    onClick={() => handleChoice(event1, event2)}
                    isSelected={selectedEvent === event1}
                    isCorrect={selectedEvent === event1 ? isCorrect : null}
                    showDate={!!selectedEvent}
                  />
                  <EventCard
                    event={event2}
                    onClick={() => handleChoice(event2, event1)}
                    isSelected={selectedEvent === event2}
                    isCorrect={selectedEvent === event2 ? isCorrect : null}
                    showDate={!!selectedEvent}
                  />
                </>
              )}
            </div>
            {selectedEvent && (
              <div className="flex justify-center">
                <button
                  onClick={setupNewRound}
                  className="bg-white text-purple-600 font-bold py-3 px-8 rounded-full hover:bg-opacity-90 transition-opacity flex items-center gap-2"
                >
                  <RotateCcw className="w-5 h-5" />
                  Next Round
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;