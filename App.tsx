
import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { ContentView } from './components/ContentView';
import { Chatbot } from './components/Chatbot';
import { modules } from './constants/chapters';
import type { Chapter, Theme } from './types';

const READ_CHAPTERS_KEY = 'cryptoTraderReadChapters';

export default function App() {
  const [selectedChapter, setSelectedChapter] = useState<Chapter>(modules[0].chapters[0]);
  const [theme, setTheme] = useState<Theme>('dark');
  const [readChapters, setReadChapters] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem(READ_CHAPTERS_KEY);
      // Initialize with the first chapter marked as read by default
      const initialSet = new Set([modules[0].chapters[0].id]);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
            parsed.forEach(id => initialSet.add(id));
        }
      }
      return initialSet;
    } catch (error) {
      console.error("Failed to load read chapters from localStorage", error);
      return new Set([modules[0].chapters[0].id]);
    }
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    try {
      localStorage.setItem(READ_CHAPTERS_KEY, JSON.stringify(Array.from(readChapters)));
    } catch (error) {
      console.error("Failed to save read chapters to localStorage", error);
    }
  }, [readChapters]);

  const handleSelectChapter = (chapter: Chapter) => {
    setSelectedChapter(chapter);
    setReadChapters(prev => new Set(prev).add(chapter.id));
  };

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const findModuleIdForChapter = (chapterId: string): string | undefined => {
    for (const module of modules) {
      if (module.chapters.some(c => c.id === chapterId)) {
        return module.id;
      }
    }
    return undefined;
  };

  // If the selected chapter is the initial welcome chapter, don't pass a module ID
  // so the chatbot shows the default welcome FAQs.
  const currentModuleId = selectedChapter.id === 'm1-intro' 
    ? undefined 
    : findModuleIdForChapter(selectedChapter.id);

  return (
    <div className="h-screen bg-primary text-text-primary font-sans flex flex-col md:flex-row overflow-hidden">
      <div 
        className="w-full md:w-1/4 xl:w-1/5 bg-secondary border-r border-border-color flex-shrink-0"
      >
        <Sidebar 
          modules={modules} 
          selectedChapter={selectedChapter}
          onSelectChapter={handleSelectChapter} 
          theme={theme}
          toggleTheme={toggleTheme}
          readChapters={readChapters}
        />
      </div>

      <main className="w-full md:w-3/4 xl:w-4/5 flex-grow">
        <div className="flex flex-col xl:flex-row h-full">
          <div className="w-full xl:w-2/3 flex-grow min-h-0 overflow-y-auto p-6 md:p-10">
            <ContentView chapter={selectedChapter} theme={theme} />
          </div>
          <div className="w-full xl:w-1/3 h-2/5 xl:h-full bg-secondary/50 border-l border-border-color flex flex-col flex-shrink-0">
            <Chatbot key={currentModuleId || 'default'} theme={theme} moduleId={currentModuleId} />
          </div>
        </div>
      </main>
    </div>
  );
}