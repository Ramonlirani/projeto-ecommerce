export interface MenuItem {
  id?: string;
  idFather?: string;
  name: string;
  target: string;
  modelName: string;
  webUrl: string;
  webUrlBase: string;

  current: boolean;
  icon?: string;
  order: number;
  active: boolean;
}
