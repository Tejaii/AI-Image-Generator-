import React from 'react';
import { Sparkles } from 'lucide-react';

interface PromptInputProps {
  prompt: string;
  onPromptChange: (prompt: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

const SUGGESTION_CHIPS = [
  'Professional headshot',
  'Anime character',
  'Fantasy warrior',
  'Cyberpunk rebel',
  'Superhero portrait',
  'Space explorer'
];

const PromptInput: React.FC<PromptInputProps> = ({ 
  prompt, 
  onPromptChange, 
  onGenerate,
  isGenerating
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate();
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Create Your Avatar</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="prompt" className="block text-sm font-medium text-gray-600 dark:text-gray-300">
            Describe your avatar
          </label>
          
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => onPromptChange(e.target.value)}
            placeholder="A professional headshot of a female CEO with blonde hair and blue eyes wearing a business suit..."
            className="w-full p-4 rounded-2xl border border-purple-200 dark:border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-300 dark:focus:ring-purple-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 min-h-24 transition-all duration-200"
          />
        </div>
        
        <div className="space-y-2">
          <p className="text-xs text-gray-500 dark:text-gray-400">Try these suggestions:</p>
          <div className="flex flex-wrap gap-2">
            {SUGGESTION_CHIPS.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => onPromptChange(suggestion)}
                className="px-3 py-1.5 rounded-full text-sm bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900/40 dark:text-purple-300 dark:hover:bg-purple-800/60 transition-colors duration-200"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
        
        <button
          type="submit"
          disabled={isGenerating || !prompt.trim()}
          className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-medium flex items-center justify-center gap-2 hover:from-purple-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300"
        >
          {isGenerating ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="h-5 w-5" />
              Generate Avatar
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default PromptInput;