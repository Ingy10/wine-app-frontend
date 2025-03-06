import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { Wine } from '../interfaces/Wine.interface';

@Injectable({
  providedIn: 'root',
})
export class WineDataService {
  private destroy$ = new Subject<void>();
  private winesSubject = new BehaviorSubject<Wine[]>([]);
  public wines$ = this.winesSubject.asObservable();

  constructor(private _apiService: ApiService) {}

  loadWines(): void {
    this._apiService
      .getAllWines()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.winesSubject.next(response);
          console.log('[WINE DATA] Wines loaded successfully:', response);
        },
        error: (error) => {
          console.error('[WINE DATA] Error loading wines', error);
        },
      });
  }

  deleteWine(id: number) {
    this._apiService
      .deleteWine(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          console.log('[WINE DATA] Successfully deleted wine with id:', id);
        },
        error: (error) => {
          console.error('[WINE DATA] Error deleting wine with id:', id);
        },
      });
  }

  addWine(wine: Wine) {
    return this._apiService.PostWines(wine);
  }

  updateWine(id: number, wine: Wine) {
    return this._apiService.PutWines(id, wine);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
