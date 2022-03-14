import { Component, ElementRef, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  isDropmenuVisible = false;
  //@ts-ignore
  activeMenuItem;

  menus = [
    {
      title: 'Brands',
      id: 'brands',
      isActive: false,
      hasDropmenu: true,
    },
    {
      title: 'Bikes',
      id: 'bikes',
      isActive: false,
      hasDropmenu: true,
    },
    {
      title: 'Boards',
      id: 'boards',
      isActive: false,
      hasDropmenu: true,
    },
    {
      title: 'Rollerblades',
      id: 'rollerblades',
      isActive: false,
      hasDropmenu: true,
    },
    {
      title: 'Shoes',
      id: 'shoes',
      isActive: false,
      hasDropmenu: true,
    },
    {
      title: 'Sale/Offers',
      id: 'sale',
      isActive: false,
      hasDropmenu: false,
    },
  ];

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isDropmenuVisible = false;
    }
  }

  constructor(private eRef: ElementRef) {}

  getActiveMenuItem() {
    return this.menus.find((menu) => menu.isActive);
  }

  //@ts-ignore
  manageMenuItem(menuItem) {
    if (!menuItem.hasDropmenu) {
      this.isDropmenuVisible = false;
      menuItem.isActive = true;
      //TODO: add redirect to url connected to the menu item
      return;
    }
    if (menuItem.isActive && this.isDropmenuVisible) {
      this.isDropmenuVisible = false;
      menuItem.isActive = false;
    } else {
      this.isDropmenuVisible = true;
      this.menus.forEach((menu) => (menu.isActive = false));
      menuItem.isActive = true;
    }
    this.activeMenuItem = this.getActiveMenuItem();
  }

  ngOnInit() {}
}
