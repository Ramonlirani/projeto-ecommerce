import { create } from "zustand";

type State = {
  resetFileInformation: () => void;
};

type Action = {
  setResetFileInformation: (
    resetFileInformation: State["resetFileInformation"]
  ) => void;
};

export const useResetFileInformation = create<State & Action>((set) => ({
  resetFileInformation: () => {},
  setResetFileInformation: (value: () => void) =>
    set(() => ({ resetFileInformation: value })),
}));
