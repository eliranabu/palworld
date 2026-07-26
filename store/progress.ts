import { create } from "zustand";
import { persist } from "zustand/middleware";

type ProgressState = {
  visited: Record<string, boolean>;
  bookmarks: Record<string, boolean>;
  notes: Record<string, string>;
  toggleVisited: (id: string) => void;
  toggleBookmark: (id: string) => void;
  setNote: (id: string, text: string) => void;
  resetAll: () => void;
  importState: (data: { visited?: Record<string, boolean>; bookmarks?: Record<string, boolean>; notes?: Record<string, string> }) => void;
};

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      visited: {},
      bookmarks: {},
      notes: {},
      toggleVisited: (id) =>
        set((state) => ({ visited: { ...state.visited, [id]: !state.visited[id] } })),
      toggleBookmark: (id) =>
        set((state) => ({ bookmarks: { ...state.bookmarks, [id]: !state.bookmarks[id] } })),
      setNote: (id, text) => set((state) => ({ notes: { ...state.notes, [id]: text } })),
      resetAll: () => set({ visited: {}, bookmarks: {}, notes: {} }),
      importState: (data) =>
        set({
          visited: data.visited ?? {},
          bookmarks: data.bookmarks ?? {},
          notes: data.notes ?? {},
        }),
    }),
    {
      name: "palworld-hunter:progress",
      version: 1,
    },
  ),
);
