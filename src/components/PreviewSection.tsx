import React from 'react';
import { Download, Share2, RotateCw } from 'lucide-react';
import { AvatarData } from './AvatarGenerator';

interface PreviewSectionProps {
  avatar: AvatarData | null;
  isGenerating: boolean;
}

const PreviewSection: React.FC<PreviewSectionProps> = ({ avatar, isGenerating }) => {
  const handleDownload = () => {
    // In a real app, this would download the actual image
    window.open(avatar?.imageUrl, '_blank');
  };

  const handleShare = () => {
    // In a real app, this would open a share dialog
    navigator.clipboard.writeText(avatar?.imageUrl || '');
    alert('Image URL copied to clipboard!');
  };

  const handleRegenerate = () => {
    // In a real app, this would trigger a new generation with the same prompt
    console.log('Regenerate with prompt:', avatar?.prompt);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80 h-full flex flex-col">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Preview</h2>
      
      <div className="flex-grow flex flex-col items-center justify-center">
        {isGenerating ? (
          <div className="w-full aspect-square max-w-md rounded-2xl bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center p-8">
            <div className="animate-spin h-16 w-16 mb-4">
              <div className="h-full w-full rounded-full border-4 border-purple-200 dark:border-purple-900 border-t-purple-600 dark:border-t-purple-400"></div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-center">
              Generating your custom avatar...
            </p>
            <p className="text-gray-500 dark:text-gray-500 text-sm text-center mt-2">
              This may take a few seconds
            </p>
          </div>
        ) : avatar ? (
          <div className="relative group w-full">
            <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 p-1">
              <img 
                src={avatar.imageUrl} 
                alt={avatar.prompt}
                className="w-full aspect-square object-cover rounded-xl"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-end p-4">
                <div className="w-full flex justify-center gap-2">
                  <button
                    onClick={handleDownload}
                    className="p-3 rounded-full bg-white/90 text-gray-800 hover:bg-white transition-colors duration-200"
                    title="Download avatar"
                  >
                    <Download className="h-5 w-5" />
                  </button>
                  <button
                    onClick={handleShare}
                    className="p-3 rounded-full bg-white/90 text-gray-800 hover:bg-white transition-colors duration-200"
                    title="Share avatar"
                  >
                    <Share2 className="h-5 w-5" />
                  </button>
                  <button
                    onClick={handleRegenerate}
                    className="p-3 rounded-full bg-white/90 text-gray-800 hover:bg-white transition-colors duration-200"
                    title="Regenerate with same prompt"
                  >
                    <RotateCw className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
            
            {avatar.prompt && (
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Prompt</h3>
                <p className="text-gray-800 dark:text-gray-200">{avatar.prompt}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="w-full aspect-square max-w-md rounded-2xl bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 dark:border-gray-700">
            <div className="w-16 h-16 mb-4 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-center">
              Your avatar will appear here
            </p>
            <p className="text-gray-500 dark:text-gray-500 text-sm text-center mt-2">
              Enter a prompt and click generate
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewSection;