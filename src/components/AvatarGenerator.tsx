import React, { useState } from 'react';
import PromptInput from './PromptInput';
import StyleOptions from './StyleOptions';
import PreviewSection from './PreviewSection';
import HistorySection from './HistorySection';

export type AvatarStyle = 'realistic' | 'anime' | 'pixel' | 'comic' | 'watercolor';

export interface AvatarData {
  id: string;
  prompt: string;
  imageUrl: string;
  style: AvatarStyle;
  createdAt: Date;
}

const AvatarGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<AvatarStyle>('realistic');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentAvatar, setCurrentAvatar] = useState<AvatarData | null>(null);
  const [history, setHistory] = useState<AvatarData[]>([]);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);

    const fullPrompt = `${selectedStyle} style ${prompt}`;
    const encodedPrompt = encodeURIComponent(fullPrompt);
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}`;

    const newAvatar: AvatarData = {
      id: Date.now().toString(),
      prompt,
      imageUrl,
      style: selectedStyle,
      createdAt: new Date()
    };

    setTimeout(() => {
      setCurrentAvatar(newAvatar);
      setHistory(prev => [newAvatar, ...prev.slice(0, 9)]); // Keep last 10 items
      setIsGenerating(false);
    }, 500); // simulate slight delay (optional)
  };
  
  const handleStyleChange = (style: AvatarStyle) => {
    setSelectedStyle(style);
  };
  
  const handlePromptChange = (newPrompt: string) => {
    setPrompt(newPrompt);
  };
  
  const handleHistoryItemClick = (avatar: AvatarData) => {
    setPrompt(avatar.prompt);
    setSelectedStyle(avatar.style);
    setCurrentAvatar(avatar);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex flex-col gap-6">
          <PromptInput 
            prompt={prompt} 
            onPromptChange={handlePromptChange} 
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
          />
          <StyleOptions 
            selectedStyle={selectedStyle} 
            onStyleChange={handleStyleChange} 
          />
        </div>
        <PreviewSection 
          avatar={currentAvatar} 
          isGenerating={isGenerating} 
        />
      </div>
      
      {history.length > 0 && (
        <HistorySection 
          history={history} 
          onHistoryItemClick={handleHistoryItemClick}
        />
      )}
    </div>
  );
};

export default AvatarGenerator;

