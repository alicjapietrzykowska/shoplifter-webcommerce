import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MenuItem } from '@interfaces/menuItemsDto';
import { ProductsService } from '@services/products.service';
import { filter, Subscription, take } from 'rxjs';
import { MenuService } from './menu.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit, OnDestroy {
  isDropmenuVisible = false;
  activeMenuItem: MenuItem | undefined;
  menus: MenuItem[] = [];

  private routeObservable: Subscription | undefined;

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.resetMenu();
    }
  }

  constructor(
    private eRef: ElementRef,
    private productsService: ProductsService,
    private menuService: MenuService,
    private router: Router
  ) {}

  resetMenu() {
    this.menus.forEach((menu) => (menu.isActive = false));
    this.isDropmenuVisible = false;
  }

  generateMenuItems(categories: string[]) {
    const menuItemsFromAPI = this.menuService.generateMenuItems(categories);
    const staticMenuItems = [
      {
        title: 'Sale/Offers',
        id: menuItemsFromAPI.length,
        isActive: false,
        hasDropmenu: false,
      },
    ];

    this.menus = [...menuItemsFromAPI, ...staticMenuItems];
  }

  getProductCategories() {
    this.productsService
      .getAllCategories()
      .pipe(take(1))
      .subscribe((res: string[]) => {
        this.generateMenuItems(res);
      });
  }

  getActiveMenuItem() {
    return this.menus.find((menu) => menu.isActive);
  }

  manageMenuItem(menuItem: MenuItem) {
    if (!menuItem.hasDropmenu) {
      this.resetMenu();
      menuItem.isActive = true;
      //TODO: add redirect to url connected to the menu item
      return;
    }
    if (menuItem.isActive && this.isDropmenuVisible) {
      this.resetMenu();
    } else {
      this.isDropmenuVisible = true;
      this.menus.forEach((menu) => (menu.isActive = false));
      menuItem.isActive = true;
    }
    this.activeMenuItem = this.getActiveMenuItem();
  }

  closeDropdownOnRedirect() {
    this.routeObservable = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.resetMenu();
      });
  }

  ngOnInit() {
    this.getProductCategories();
    this.closeDropdownOnRedirect();
  }

  ngOnDestroy() {
    if (this.routeObservable) this.routeObservable.unsubscribe();
  }
}
