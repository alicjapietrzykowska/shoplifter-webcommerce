import { Injectable } from '@angular/core';
import { MenuItem } from '@interfaces/menuItemsDto';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor() {}

  generateMenuItems(categories: string[]): MenuItem[] {
    return categories.map((category, index) => {
      return {
        title: category,
        id: index,
        isActive: false,
        hasDropmenu: true,
      };
    });
  }
}
