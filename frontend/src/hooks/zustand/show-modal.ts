import { create } from "zustand";

type State = {
  showModal: boolean;
  title: string;
  body: React.ReactNode;
};

type Action = {
  setShowModal: (showModal: State["showModal"]) => void;
  setTitle: (title: State["title"]) => void;
  setBody: (body: State["body"]) => void;
};

export const useShowModal = create<State & Action>((set) => ({
  showModal: false,
  title: "",
  body: "",
  onConfirm: () => {},
  setShowModal: (showModal: boolean) => set(() => ({ showModal })),
  setTitle: (title: string) => set(() => ({ title })),
  setBody: (body: React.ReactNode) => set(() => ({ body })),
}));
