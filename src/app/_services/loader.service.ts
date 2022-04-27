import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private _loader: BehaviorSubject<boolean>;

  constructor() {
    this._loader = new BehaviorSubject<boolean>(true);
  }

  get isLoading(): boolean {
    return this._loader.value;
  }

  set isLoading(nextState: boolean) {
    this._loader.next(nextState);
  }

  get loader$(): Observable<boolean> {
    return this._loader.asObservable();
  }
}
