
import type { ReactNode } from 'react';

export type Theme = 'light' | 'dark';

export interface Chapter {
  id: string;
  title: string;
  content: ReactNode;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Pro';
}

export interface Module {
    id: string;
    title: string;
    level: string;
    chapters: Chapter[];
}

export interface Message {
  id:string;
  text: string;
  sender: 'user' | 'ai';
}
