import { create } from "zustand";

type State = {
  showing: boolean;
  message: string;
  onConfirm: () => void;
};

type Action = {
  setShowing: (showing: State["showing"]) => void;
  setMessage: (message: State["message"]) => void;
  setOnConfirm: (onConfirm: State["onConfirm"]) => void;
};

export const useShowConfirmation = create<State & Action>((set) => ({
  showing: false,
  message: "",
  onConfirm: () => {},
  setShowing: (showing: boolean) => set(() => ({ showing })),
  setMessage: (message: string) => set(() => ({ message })),
  setOnConfirm: (onConfirm: () => void) => set(() => ({ onConfirm })),
}));
