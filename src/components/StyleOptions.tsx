import React from 'react';
import { AvatarStyle } from './AvatarGenerator';

interface StyleOptionsProps {
  selectedStyle: AvatarStyle;
  onStyleChange: (style: AvatarStyle) => void;
}

const styles: { id: AvatarStyle; name: string; description: string }[] = [
  {
    id: 'realistic',
    name: 'Realistic',
    description: 'Photorealistic portraits with lifelike details',
  },
  {
    id: 'anime',
    name: 'Anime',
    description: 'Japanese animation style with vibrant colors',
  },
  {
    id: 'pixel',
    name: 'Pixel Art',
    description: 'Retro game-inspired pixelated style',
  },
  {
    id: 'comic',
    name: 'Comic',
    description: 'Bold lines and vivid colors like comic book art',
  },
  {
    id: 'watercolor',
    name: 'Watercolor',
    description: 'Soft, artistic style with watercolor effects',
  },
];

const StyleOptions: React.FC<StyleOptionsProps> = ({ selectedStyle, onStyleChange }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Choose Style</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
        {styles.map((style) => (
          <button
            key={style.id}
            onClick={() => onStyleChange(style.id)}
            className={`relative flex flex-col items-center p-4 rounded-2xl border-2 transition-all duration-200 hover:scale-105 group ${
              selectedStyle === style.id
                ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30'
                : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700 bg-gray-50 dark:bg-gray-900/50'
            }`}
          >
            <div className="w-12 h-12 mb-2 rounded-full bg-gradient-to-br from-purple-400 to-indigo-600 flex items-center justify-center">
              <span className="text-white text-lg font-bold">{style.name.charAt(0)}</span>
            </div>
            <span className="font-medium text-gray-900 dark:text-gray-100">{style.name}</span>
            <div className="opacity-0 group-hover:opacity-100 absolute -top-1 left-0 right-0 transition-opacity duration-200">
              <div className="bg-gray-900 dark:bg-gray-800 text-white text-xs rounded-lg py-1 px-2 text-center shadow-lg">
                {style.description}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default StyleOptions;