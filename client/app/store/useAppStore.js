import { create } from "zustand";

// You can use this store to manage global UI state or generated meta tags across routes
export const useAppStore = create((set) => ({
  // Example State: Theme Management
  themePreference: "light",
  setThemePreference: (theme) => set({ themePreference: theme }),

  // Example State: Active Generator
  activeGeneratorId: null,
  setActiveGeneratorId: (id) => set({ activeGeneratorId: id }),

  // Example State: Global generated code buffer (if you want to implement cross-page memory)
  generatedCodeHistory: [],
  addToHistory: (code) =>
    set((state) => ({
      generatedCodeHistory: [code, ...state.generatedCodeHistory].slice(0, 5), // Keep last 5
    })),
}));
