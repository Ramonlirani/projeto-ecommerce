import { create } from "zustand";

type Permission = {
  [index: string]: { action: string; allowed: boolean; modelName: string }[];
};

type State = {
  permissions?: Permission;
};

type Action = {
  setPermissions: (showing: State["permissions"]) => void;
  userHasPermission: (action: string, modelName: string) => boolean;
};

export const usePermission = create<State & Action>((set) => ({
  permissions: undefined,
  setPermissions: (permissions?: Permission) => set(() => ({ permissions })),
  userHasPermission: (action: string, modelName: string) => {
    const permissions = usePermission.getState().permissions as Permission;

    if (!permissions || !modelName) return false;

    return permissions[modelName].some((item) => item.action === action);
  },
}));
