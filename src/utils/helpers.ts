/**
 * Helper functions for the Avatar Generator app
 */

/**
 * Formats a date to a human-readable string
 */
export function formatDate(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return 'just now';
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
  }
  
  return date.toLocaleDateString();
}

/**
 * Truncates a string to a specified length and adds ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
}

/**
 * Creates a downloadable link for an image URL
 */
export async function downloadImage(imageUrl: string, fileName: string = 'avatar.png'): Promise<void> {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error downloading image:', error);
  }
}

/**
 * Generates a random placeholder prompt
 */
export function getRandomPromptPlaceholder(): string {
  const placeholders = [
    "A professional headshot with a friendly smile and blue background",
    "An anime character with purple hair and cat ears",
    "A fantasy warrior with golden armor and a majestic cape",
    "A cyberpunk portrait with neon lights and futuristic vibes",
    "A watercolor portrait of someone with glasses and curly hair"
  ];
  
  return placeholders[Math.floor(Math.random() * placeholders.length)];
}