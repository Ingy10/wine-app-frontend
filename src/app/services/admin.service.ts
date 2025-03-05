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
}
