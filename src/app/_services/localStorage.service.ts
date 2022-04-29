import { Injectable } from '@angular/core';
import { environment } from '@env';
@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  add<T>(key: string, item: T) {
    localStorage.setItem(
      `${environment.storagePrefix}-${key}`,
      JSON.stringify(item)
    );
  }

  get(key: string) {
    const item = localStorage.getItem(`${environment.storagePrefix}-${key}`);
    if (item) return JSON.parse(item);
  }

  remove(key: string) {
    localStorage.removeItem(`${environment.storagePrefix}-${key}`);
  }
}
