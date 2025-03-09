import { Injectable } from '@angular/core';
import { StaticService } from './statics.service';
import { Wine } from '../interfaces/Wine.interface';
import {
  FormGroup,
  FormArray,
  FormControl,
  AbstractControl,
} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  filteredCharacteristics: string[] = [];

  constructor(private _staticService: StaticService) {}

  // Method to select states to be shown given a wine
  updateStatesProvinces(country: String): Array<String> {
    switch (country) {
      case 'USA':
        return this._staticService.statesUSA;
      case 'Canada':
        return this._staticService.provincesCanada;
      case 'Argentina':
        return this._staticService.provincesArgentina;
      case 'Italy':
        return this._staticService.provincesItaly;
      case 'France':
        return this._staticService.provincesFrance;
      case 'Portugal':
        return this._staticService.provincesPortugal;
      case 'Spain':
        return this._staticService.provincesSpain;
      default:
        return [];
    }
  }

  // Checks if wine data has changed since last save, given a wine
  hasWineChanged(wine: Wine, original: Wine): boolean {
    if (!wine?.id || !original) {
      return true;
    }

    return (
      wine.wineName !== original.wineName ||
      wine.winery !== original.winery ||
      wine.vintage !== original.vintage ||
      wine.wineStyle !== original.wineStyle ||
      wine.varietal !== original.varietal ||
      wine.region !== original.region ||
      wine.subRegion !== original.subRegion ||
      wine.country !== original.country ||
      wine.provinceState !== original.provinceState ||
      wine.price !== original.price ||
      wine.body !== original.body ||
      wine.sugar !== original.sugar ||
      wine.alcoholContent !== original.alcoholContent ||
      wine.acidity !== original.acidity ||
      wine.tannins !== original.tannins ||
      wine.tastingNotes !== original.tastingNotes ||
      wine.characteristics !== original.characteristics ||
      wine.servingTemp !== original.servingTemp ||
      wine.foodPairings !== original.foodPairings
    );
  }

  // Method to mark form fields as touched
  markFormGroupTouched(formGroup: FormGroup | FormArray) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();

      // If the control is a FormGroup or FormArray, recursively mark its children
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.markFormGroupTouched(control);
      }
    });
  }

  // Checks to see if all required fields for a given wine are valid
  isWineFormGroupInvalid(wineGroup: AbstractControl): boolean {
    return (
      wineGroup.get('wineName')?.invalid ||
      wineGroup.get('winery')?.invalid ||
      wineGroup.get('vintage')?.invalid ||
      wineGroup.get('wineStyle')?.invalid ||
      wineGroup.get('varietal')?.invalid ||
      wineGroup.get('country')?.invalid ||
      false
    );
  }

  // Filter the characteristics based on what the user types
  search(event: any) {
    const query = event.query.toLowerCase();
    this.filteredCharacteristics = this._staticService.characteristics.filter(
      (characteristic) => characteristic.toLowerCase().includes(query)
    );
  }

  // Converts comma separated string to an array
  stringToArray(characteristicsString: any): string[] {
    if (!characteristicsString) {
      return [];
    }

    if (Array.isArray(characteristicsString)) {
      return characteristicsString;
    }

    if (
      typeof characteristicsString === 'string' &&
      characteristicsString.length > 0
    ) {
      return characteristicsString.split(',').map((item) => item.trim());
    }

    return [];
  }

  // Converts array to comma separated string
  arrayToString(characteristicsArray: any): string {
    if (!characteristicsArray) {
      return '';
    }

    if (typeof characteristicsArray === 'string') {
      return characteristicsArray;
    }

    if (Array.isArray(characteristicsArray)) {
      return characteristicsArray.join(', ');
    }

    return '';
  }

  // Color options given a wine style selection
  wineStyleColorSelect(color: string): string {
    switch (color) {
      case 'White':
        return '#eeeee2';
      case 'Red':
        return '#e2d8d8';
      case 'Rose':
        return '#f5e6ea';
      case 'Orange':
        return '#eee6db';
      default:
        return '';
    }
  }
}
