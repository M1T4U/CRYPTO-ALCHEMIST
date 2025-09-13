import React from 'react';
import type { Chapter, Theme } from '../types';

interface ContentViewProps {
  chapter: Chapter;
  theme: Theme;
}

export const ContentView: React.FC<ContentViewProps> = ({ chapter, theme }) => {
  return (
    <div className={`h-full prose ${theme === 'dark' ? 'prose-invert' : ''} lg:prose-xl max-w-none`}>
      {chapter.content}
    </div>
  );
};