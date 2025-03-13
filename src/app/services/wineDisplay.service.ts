import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WineDisplayService {
  wineStyleHeaderColorSelect(color: string): string {
    switch (color) {
      case 'White':
        return '#eeeee2';
      case 'Red':
        return '#600000';
      case 'Rose':
        return '#c08a96';
      case 'Orange':
        return '#b87333';
      default:
        return '';
    }
  }
}
