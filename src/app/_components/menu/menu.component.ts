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
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit, OnDestroy {
  isDropmenuVisible = false;
  activeMenuItem: MenuItem | undefined;
  menus: MenuItem[] = [];

  private routeObservable$: Subscription | undefined;

  @HostListener('document:mouseover', ['$event'])
  moveOutside(event: Event) {
    //prevent from hiding menu when confirm-dialog open
    if (document.querySelector('app-confirm-dialog')) {
      return;
    }
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.resetMenu();
    }
  }

  constructor(
    private eRef: ElementRef,
    private productsService: ProductsService,
    private menuService: MenuService,
    private router: Router,
    private translate: TranslateService
  ) {}

  resetMenu() {
    this.menus.forEach((menu) => (menu.isActive = false));
    this.isDropmenuVisible = false;
  }

  generateMenuItems(categories: string[]) {
    const menuItemsFromAPI = this.menuService.generateMenuItems(categories);
    const staticMenuItems = [
      {
        title: this.translate.instant('general.saleOffers'),
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
      return;
    }

    this.isDropmenuVisible = true;
    this.menus.forEach((menu) => (menu.isActive = false));
    menuItem.isActive = true;
    this.activeMenuItem = this.getActiveMenuItem();
  }

  goToCategory(menuItem: MenuItem) {
    this.router.navigate([`product-list`], {
      queryParams: { category: menuItem.title },
    });
  }

  closeDropdownOnRedirect() {
    this.routeObservable$ = this.router.events
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
    if (this.routeObservable$) this.routeObservable$.unsubscribe();
  }
}
