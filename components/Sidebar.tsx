import React, { useState, useEffect } from 'react';
import type { Chapter, Module, Theme } from '../types';
import { BookOpenIcon, ChevronDownIcon, MoonIcon, SunIcon, CheckIcon } from '../constants/icons';

interface SidebarProps {
  modules: Module[];
  selectedChapter: Chapter;
  onSelectChapter: (chapter: Chapter) => void;
  theme: Theme;
  toggleTheme: () => void;
  readChapters: Set<string>;
}

export const Sidebar: React.FC<SidebarProps> = ({ modules, selectedChapter, onSelectChapter, theme, toggleTheme, readChapters }) => {
  const findModuleId = (chapterId: string): string | null => {
    for (const module of modules) {
      if (module.chapters.some(c => c.id === chapterId)) {
        return module.id;
      }
    }
    return null;
  }
  
  const [expandedModules, setExpandedModules] = useState<Set<string>>(() => 
    new Set([findModuleId(selectedChapter.id) ?? modules[0]?.id].filter(Boolean) as string[])
  );

  useEffect(() => {
    const currentModuleId = findModuleId(selectedChapter.id);
    if (currentModuleId && !expandedModules.has(currentModuleId)) {
        setExpandedModules(prev => new Set(prev).add(currentModuleId));
    }
  }, [selectedChapter, modules, expandedModules]);

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => {
      const newSet = new Set(prev);
      if (newSet.has(moduleId)) {
        newSet.delete(moduleId);
      } else {
        newSet.add(moduleId);
      }
      return newSet;
    });
  };
  
  return (
    <div className="h-full p-4 md:p-6 flex flex-col">
      <div className="flex items-center space-x-3 mb-8 px-2">
        <div className="p-2 bg-brand-blue/20 rounded-lg text-brand-blue">
          <BookOpenIcon />
        </div>
        <h1 className="text-xl font-bold text-text-primary">Crypto Handbook</h1>
      </div>
      <nav className="flex-grow space-y-2 overflow-y-auto pr-2">
        {modules.map((module) => {
          const completedChapters = module.chapters.filter(c => readChapters.has(c.id)).length;
          const totalChapters = module.chapters.length;
          const progress = totalChapters > 0 ? (completedChapters / totalChapters) * 100 : 0;

          return (
          <div key={module.id} className="space-y-2">
            <div>
                <button
                onClick={() => toggleModule(module.id)}
                className="w-full text-left px-2 py-2 rounded-lg flex justify-between items-center text-text-secondary hover:bg-tertiary/60"
                >
                <div className="flex flex-col text-left">
                    <span className="text-sm font-semibold text-text-muted tracking-wider uppercase">{module.title}</span>
                    <span className="text-xs text-text-muted">{module.level}</span>
                </div>
                <span className={`transition-transform duration-300 ${expandedModules.has(module.id) ? 'rotate-180' : ''}`}>
                    <ChevronDownIcon />
                </span>
                </button>
                <div className="mt-2 mx-2 h-1 bg-tertiary rounded-full overflow-hidden">
                    <div 
                    className="h-1 bg-gradient-to-r from-brand-blue to-brand-purple rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>
            {expandedModules.has(module.id) && (
              <div className="pt-1 space-y-1 border-l-2 border-tertiary">
                {module.chapters.map((chapter) => (
                  <button
                    key={chapter.id}
                    onClick={() => onSelectChapter(chapter)}
                    className={`w-full text-left pl-6 pr-4 py-3 transition-all duration-200 relative flex items-center justify-between ${
                      selectedChapter.id === chapter.id
                        ? 'text-text-primary font-semibold'
                        : readChapters.has(chapter.id) 
                            ? 'text-text-muted hover:bg-tertiary/50 hover:text-text-secondary' 
                            : 'text-text-secondary hover:bg-tertiary/50 hover:text-text-primary'
                    }`}
                  >
                    <span>{chapter.title}</span>
                    {readChapters.has(chapter.id) && ! (selectedChapter.id === chapter.id) && (
                        <span className="text-green-500/70">
                            <CheckIcon />
                        </span>
                    )}
                     {selectedChapter.id === chapter.id && (
                        <span className="text-green-500">
                            <CheckIcon />
                        </span>
                    )}
                    {selectedChapter.id === chapter.id && (
                       <div className="absolute left-[-2px] top-0 h-full w-1 bg-gradient-to-b from-brand-blue to-brand-purple rounded-r-full"></div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        )})}
      </nav>
      <div className="mt-auto pt-4 border-t border-border-color">
          <div className="flex justify-between items-center px-2">
              <p className="text-xs text-text-muted">&copy; {new Date().getFullYear()} zvcN3xtgen</p>
              <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full text-text-secondary hover:bg-tertiary focus:outline-none focus:ring-2 focus:ring-brand-purple"
                  aria-label="Toggle theme"
              >
                  {theme === 'light' ? <MoonIcon /> : <SunIcon />}
              </button>
          </div>
      </div>
    </div>
  );
};