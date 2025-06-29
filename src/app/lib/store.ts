// Simple store for sharing data between pages
import { create } from 'zustand';
import { Issue } from './types';

interface CaseStore {
  selectedCase: Issue | null;
  setSelectedCase: (issue: Issue) => void;
}

export const useCaseStore = create<CaseStore>((set) => ({
  selectedCase: null,
  setSelectedCase: (issue) => set({ selectedCase: issue }),
}));
