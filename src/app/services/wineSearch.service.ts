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
}
