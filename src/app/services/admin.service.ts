import { Injectable } from '@angular/core';
import { StaticService } from './statics.service';
import { Wine } from '../interfaces/Wine.interface';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
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
      wine.tastingNote1 !== original.tastingNote1 ||
      wine.tastingNote2 !== original.tastingNote2 ||
      wine.tastingNote3 !== original.tastingNote3 ||
      wine.tastingNote4 !== original.tastingNote4 ||
      wine.tastingNote5 !== original.tastingNote5 ||
      wine.servingTemp !== original.servingTemp ||
      wine.foodPairings !== original.foodPairings
    );
  }
}
