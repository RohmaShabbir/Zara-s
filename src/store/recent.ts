import { create } from "zustand";
import { persist } from "zustand/middleware";

type RecentState = { ids: string[]; push: (id: string) => void };

export const useRecent = create<RecentState>()(
  persist(
    (set) => ({
      ids: [],
      push: (id) => set((s) => ({ ids: [id, ...s.ids.filter((x) => x !== id)].slice(0, 8) })),
    }),
    { name: "recent" }
  )
);