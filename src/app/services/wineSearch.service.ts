import { Injectable } from '@angular/core';
import { Wine } from '../interfaces/Wine.interface';

@Injectable({
  providedIn: 'root',
})
export class WineSearchService {
  constructor() {}

  // *** Autocomplete methods ***
  // Finds all searchable terms from entire wine list
  getAllSearchableTerms(wines: Wine[]): string[] {
    const suggestionsSet = new Set<string>();

    wines.forEach((wine) => {
      this.searchInWineProperties(wine, suggestionsSet);
    });

    console.log('[SEARCH] suggestionsSet:', suggestionsSet);
    const allSuggestions = Array.from(suggestionsSet).sort();
    console.log('[SEARCH] allSuggestionsSet Sorted:', allSuggestions);

    return allSuggestions;
  }

  // Search through a wine's properties for matching terms
  private searchInWineProperties(wine: Wine, suggestionsSet: Set<string>) {
    const searchableFields: (keyof Wine)[] = [
      'wineName',
      'winery',
      'vintage',
      'wineStyle',
      'varietal',
      'region',
      'subRegion',
      'country',
      'provinceState',
      'body',
      'sugar',
      'acidity',
      'tannins',
      'tastingNotes',
      'foodPairings',
      'characteristics',
    ];

    searchableFields.forEach((field) => {
      const value = wine[field];

      if (typeof value !== 'string' || !value) {
        return;
      }

      // If it's a comma-separated list, add each part as a suggestion
      if (value.includes(',')) {
        value.split(',').forEach((part) => {
          let trimmed = part.trim();

          if (trimmed.match(/[0-9%]/)) {
            trimmed = trimmed.replace(/[0-9%]/g, '').trim();
          }

          if (trimmed && field !== 'foodPairings') {
            suggestionsSet.add(trimmed);
          } else if (trimmed) {
            suggestionsSet.add(`Pairs with: ${trimmed}`);
          }
        });
      } else {
        if (value) {
          if (field !== 'body' && field !== 'tannins' && field !== 'acidity') {
            suggestionsSet.add(value.trim());
          } else if (value !== 'None') {
            suggestionsSet.add(
              `${value.trim()} ${
                field.charAt(0).toUpperCase() + field.slice(1)
              }`
            );
          } else {
            suggestionsSet.add(
              `No ${field.charAt(0).toUpperCase() + field.slice(1)}`
            );
          }
        }
      }
    });
  }

  // Method to filter autocomplete suggestions
  filterTerms(allTerms: string[], query: string): string[] {
    if (!query || query.length === 0) {
      return allTerms;
    }

    const lowerQuery = query.toLowerCase();
    return allTerms.filter((term) => term.toLowerCase().includes(lowerQuery));
  }

  // *** Methods to search wine list ***
  // Search all properties of all wines
  filterWinesByTerms(wines: Wine[], searchTerms: string[]): Wine[] {
    if (!searchTerms || searchTerms.length === 0) {
      return wines;
    }

    return wines.filter((wine) => {
      return searchTerms.every((term) => {
        const lowerTerm = term.toLowerCase();

        if (
          wine.wineName?.toLowerCase().includes(lowerTerm) ||
          wine.winery?.toLowerCase().includes(lowerTerm) ||
          wine.vintage?.toLowerCase().includes(lowerTerm) ||
          wine.wineStyle?.toLowerCase().includes(lowerTerm) ||
          wine.varietal?.toLowerCase().includes(lowerTerm) ||
          wine.region?.toLowerCase().includes(lowerTerm) ||
          wine.subRegion?.toLowerCase().includes(lowerTerm) ||
          wine.country?.toLowerCase().includes(lowerTerm) ||
          wine.provinceState?.toLowerCase().includes(lowerTerm) ||
          wine.sugar?.toLowerCase().includes(lowerTerm) ||
          wine.tastingNotes?.toLowerCase().includes(lowerTerm) ||
          wine.characteristics?.toLowerCase().includes(lowerTerm) ||
          wine.foodPairings?.toLowerCase().includes(lowerTerm)
        ) {
          return true;
        }

        if (lowerTerm.startsWith('pairs with:')) {
          const foodTerm = lowerTerm.replace('pairs with:', '').trim();
          return wine.foodPairings?.toLowerCase().includes(foodTerm);
        }

        if (lowerTerm.includes('body')) {
          const bodyLevel = lowerTerm.replace('body', '').trim();
          return wine.body?.toLowerCase() === bodyLevel.toLowerCase();
        }

        if (lowerTerm.includes('acidity')) {
          const acidityLevel = lowerTerm.replace('acidity', '').trim();
          return wine.acidity?.toLowerCase() === acidityLevel.toLowerCase();
        }

        if (lowerTerm.includes('tannins')) {
          let tanninLevel = lowerTerm.replace('tannins', '').trim();
          if (tanninLevel === 'no') {
            tanninLevel = 'none';
          }
          return wine.tannins?.toLowerCase() === tanninLevel.toLowerCase();
        }

        return false;
      });
    });
  }
}
