export interface MenuItem {
  title: string;
  id: number;
  isActive: boolean;
  hasDropmenu: boolean;
  directUrl?: string;
}
