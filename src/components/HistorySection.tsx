import React from 'react';
import { Clock, Trash2 } from 'lucide-react';
import { AvatarData } from './AvatarGenerator';

interface HistorySectionProps {
  history: AvatarData[];
  onHistoryItemClick: (avatar: AvatarData) => void;
}

const HistorySection: React.FC<HistorySectionProps> = ({ 
  history, 
  onHistoryItemClick 
}) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 flex items-center">
          <Clock className="h-5 w-5 mr-2 text-purple-500 dark:text-purple-400" />
          History
        </h2>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {history.map((item) => (
          <div 
            key={item.id}
            className="relative group cursor-pointer"
            onClick={() => onHistoryItemClick(item)}
          >
            <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 p-1 transition-all duration-200 hover:from-purple-200 hover:to-indigo-200 dark:hover:from-purple-800/40 dark:hover:to-indigo-800/40">
              <img
                src={item.imageUrl}
                alt={item.prompt}
                className="w-full aspect-square object-cover rounded-xl"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex flex-col justify-end p-3">
                <p className="text-white text-xs line-clamp-2 mb-1">{item.prompt}</p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 text-xs">{formatDate(item.createdAt)}</span>
                  <button 
                    className="p-1.5 rounded-full bg-white/20 text-white hover:bg-red-500/80 transition-colors duration-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Delete functionality would go here
                    }}
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
            <div className="absolute -top-1 -right-1">
              <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-gray-200 dark:bg-gray-700 text-xs font-medium text-gray-800 dark:text-gray-200 border-2 border-white dark:border-gray-800">
                {item.style.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      {history.length === 0 && (
        <div className="py-8 text-center">
          <p className="text-gray-500 dark:text-gray-400">No avatars generated yet</p>
        </div>
      )}
    </div>
  );
};

export default HistorySection;