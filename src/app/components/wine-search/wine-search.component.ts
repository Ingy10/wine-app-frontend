import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Wine } from '../../interfaces/Wine.interface';
import { WineDataService } from '../../services/wineData.service';
import { Subject, takeUntil } from 'rxjs';
import { WineSearchService } from '../../services/wineSearch.service';
import { WineDisplayComponent } from "../wine-display/wine-display.component";

@Component({
  selector: 'app-wine-search',
  imports: [
    HeaderComponent,
    CardModule,
    InputTextModule,
    AutoCompleteModule,
    ReactiveFormsModule,
    ButtonModule,
    WineDisplayComponent
],
  templateUrl: './wine-search.component.html',
  styleUrl: './wine-search.component.scss',
})
export class WineSearchComponent {
  searchForm: FormGroup;
  allWines: Wine[] = [];
  allSearchableTerms: string[] = [];
  searchSuggestions: string[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private _wineDataService: WineDataService,
    private _wineSearchService: WineSearchService
  ) {
    this.searchForm = this.fb.group({
      term1: [''],
      term2: [''],
      term3: [''],
    });
  }

  ngOnInit() {
    // Load all wines on component initialization
    this._wineDataService.loadWines();
    this._wineDataService.wines$
      .pipe(takeUntil(this.destroy$))
      .subscribe((wines) => {
        this.allWines = wines;
        console.log('[SEARCH] Wines loaded:', wines);

        this.allSearchableTerms =
          this._wineSearchService.getAllSearchableTerms(wines);
        console.log(
          '[SEARCH] Pre-generated search terms:',
          this.allSearchableTerms.length
        );
      });
  }

  // Autocomplete search term filter
  search(event: any) {
    console.log('[SEARCH] event:', event);

    const query = event.query;

    this.searchSuggestions = this._wineSearchService.filterTerms(
      this.allSearchableTerms,
      query
    );
    console.log('[SEARCH] Search suggestions:', this.searchSuggestions);
  }
}
