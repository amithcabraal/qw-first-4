import React from 'react';
import { Event } from '../types/Event';
import { Check, X } from 'lucide-react';

interface EventCardProps {
  event: Event;
  onClick: () => void;
  isSelected?: boolean;
  isCorrect: boolean | null;
  showDate?: boolean;
}

export function EventCard({ event, onClick, isSelected, isCorrect, showDate }: EventCardProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onClick();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <button
      onClick={handleClick}
      className={`bg-white rounded-xl shadow-2xl overflow-hidden transition-transform w-full relative
        ${!isSelected && !showDate ? 'hover:transform hover:scale-105' : ''}`}
      disabled={showDate}
    >
      <div className="relative h-64">
        <img
          src={event.eventImage || 'https://via.placeholder.com/400x300?text=Image+Not+Available'}
          alt={event.eventDescription}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Available';
          }}
        />
        {isSelected && (
          <div className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-40`}>
            <div className={`rounded-full p-4 ${isCorrect ? 'bg-green-500' : 'bg-red-500'}`}>
              {isCorrect ? (
                <Check className="w-12 h-12 text-white" />
              ) : (
                <X className="w-12 h-12 text-white" />
              )}
            </div>
          </div>
        )}
      </div>
      <div className="p-6">
        <p className="text-lg text-gray-800 font-medium">{event.eventDescription}</p>
        {showDate && (
          <p className="text-lg text-purple-600 font-bold mt-2">
            {formatDate(event.date)}
          </p>
        )}
      </div>
    </button>
  );
}