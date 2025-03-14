import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { InputTextModule } from 'primeng/inputtext';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Wine } from '../../interfaces/Wine.interface';
import { DividerModule } from 'primeng/divider';
import { AccordionModule } from 'primeng/accordion';
import { DropdownModule } from 'primeng/dropdown';
import { StaticService } from '../../services/statics.service';
import { TextareaModule } from 'primeng/textarea';
import { AdminService } from '../../services/admin.service';
import { WineDataService } from '../../services/wineData.service';
import { first, Subject, takeUntil } from 'rxjs';
import { ProgressSpinner } from 'primeng/progressspinner';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { FloatLabelModule } from 'primeng/floatlabel';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-admin',
  imports: [
    HeaderComponent,
    InputTextModule,
    FormsModule,
    ButtonModule,
    DividerModule,
    AccordionModule,
    DropdownModule,
    TextareaModule,
    ReactiveFormsModule,
    ProgressSpinner,
    SelectModule,
    InputNumberModule,
    FloatLabelModule,
    AutoCompleteModule,
    InputGroupModule,
    InputGroupAddonModule,
    TooltipModule,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  wineForm: FormGroup;
  wines: Array<Wine> = [];
  selectedCountryStates: Array<String> = [];
  wineStatesMap: Map<number, Array<String>> = new Map();
  private destroy$ = new Subject<void>();
  originalWines: { [id: number]: Wine } = {};
  isValid: boolean = true;
  isLoading: boolean = false;
  selectedSort: string = '';

  constructor(
    public _staticService: StaticService,
    public _adminService: AdminService,
    private _wineDataService: WineDataService,
    private fb: FormBuilder
  ) {
    // Initialize the form with an empty structure
    this.wineForm = this.fb.group({
      wines: this.fb.array([]),
    });
  }

  ngOnInit() {
    this.isLoading = true;
    this._wineDataService.loadWines();
    this._wineDataService.wines$
      .pipe(takeUntil(this.destroy$))
      .subscribe((wines) => {
        this.wines = wines;
        console.log('[ADMIN] wines after init:', wines);

        this.initForm();
      });
  }

  // *** Form Group Related Methods *** //
  // Clears and intializes form data
  initForm() {
    while (this.winesArray.length !== 0) {
      this.winesArray.removeAt(0);
    }

    this.originalWines = {};

    if (this.wines && this.wines.length > 0) {
      this.wines.forEach((wine) => {
        if (wine.id) {
          this.originalWines[wine.id] = { ...wine };
        }
        this.addWineFormGroup(wine);
      });
    }

    console.log('[ADMIN] Original Wines Object:', this.originalWines);
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  // After the view is initialized, check if we have any wines. If not, add an empty form.
  ngAfterViewInit() {
    setTimeout(() => {
      if (this.winesArray.length === 0) {
        this.addEmptyWineForm();
        console.log(
          '[ADMIN] No wines found after view init, adding empty form'
        );
      }
    });
  }

  // Helper to get the wines FormArray
  get winesArray(): FormArray {
    return this.wineForm.get('wines') as FormArray;
  }

  // Initializes empty form with empty strings/null values
  addEmptyWineForm() {
    const emptyWine: Wine = {
      wineName: '',
      winery: '',
      vintage: '',
      wineStyle: '',
      varietal: '',
      country: '',
      provinceState: '',
      region: '',
      subRegion: '',
      price: null,
      body: '',
      sugar: '',
      alcoholContent: null,
      acidity: '',
      tannins: '',
      tastingNotes: '',
      characteristics: '',
      servingTemp: '',
      foodPairings: '',
    };

    this.addWineFormGroup(emptyWine);
  }

  // Create a form group for a single wine
  addWineFormGroup(wine: Wine) {
    console.log('[ADMIN] wine:', wine);
    const wineGroup = this.fb.group({
      id: [wine.id],
      wineName: [
        wine.wineName,
        [Validators.required, Validators.maxLength(254)],
      ],
      winery: [wine.winery, [Validators.required, Validators.maxLength(254)]],
      vintage: [
        wine.vintage,
        [Validators.required, Validators.pattern('^[0-9]{4}$')],
      ],
      wineStyle: [wine.wineStyle, Validators.required],
      varietal: [
        wine.varietal,
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9\s,%]+$/),
          Validators.maxLength(254),
        ],
      ],
      country: [wine.country, Validators.required],
      provinceState: [wine.provinceState],
      region: [wine.region, Validators.maxLength(254)],
      subRegion: [wine.subRegion, Validators.maxLength(254)],
      price: [wine.price],
      body: [wine.body],
      sugar: [wine.sugar],
      alcoholContent: [wine.alcoholContent],
      acidity: [wine.acidity],
      tannins: [wine.tannins],
      tastingNotes: [
        wine.tastingNotes,
        [Validators.pattern(/^[a-zA-Z\s,]+$/), Validators.maxLength(254)],
      ],
      characteristics: [this._adminService.stringToArray(wine.characteristics)],
      servingTemp: [
        wine.servingTemp,
        [Validators.pattern(/^\d{1,2}-\d{1,2}$/)],
      ],
      foodPairings: [
        wine.foodPairings,
        [Validators.pattern(/^[a-zA-Z\s,]+$/), Validators.maxLength(254)],
      ],
    });

    this.winesArray.push(wineGroup);
    console.log('[ADMIN] wines array:', this.winesArray);
    this.updateStatesForWine(this.winesArray.length - 1);

    return wineGroup;
  }

  sortWines() {
    console.log('[ADMIN] Selected sort:', this.selectedSort);
    console.log('[ADMIN] Wines Array:', this.winesArray);

    if (!this.selectedSort || this.winesArray.length === 0) {
      return;
    }

    console.log(
      '[ADMIN] Wines array raw value:',
      this.winesArray.getRawValue()
    );
    const currentValues = this.winesArray.getRawValue();

    const [field, direction] = this.selectedSort.split('_');

    // comparison function that iterates through array, doing comparisons of (a, b) returning (-1, 0, 1) to determine order
    currentValues.sort((a, b) => {
      let comparison = 0;

      if (typeof a[field] === 'string') {
        comparison = a[field].localeCompare(b[field]);
      } else if (typeof a[field] === 'number') {
        comparison = a[field] - b[field];
      } else {
        // If fields are null or undefined they should go last in the list
        if (a[field] === null || a[field] === undefined) return 1;

        if (b[field] === null || b[field] === undefined) return -1;

        // For any other data types, convert to string and then compare
        // This handles objects, booleans, etc.
        comparison = String(a[field]).localeCompare(String(b[field]));
      }

      // Handles ascending vs descending sort direction
      if (direction === 'desc') {
        // For descending order, invert the comparison result
        return -comparison;
      } else {
        return comparison;
      }
    });

    while (this.winesArray.length !== 0) {
      this.winesArray.removeAt(0);
    }

    this.wineForm = this.fb.group({
      wines: this.fb.array([]),
    });

    currentValues.forEach((wine) => {
      this.addWineFormGroup(wine);
    });
  }

  // Assigns province options for a given country, given an index
  updateStatesForWine(index: number) {
    const wineGroup = this.winesArray.at(index) as FormGroup;
    const country = wineGroup.get('country')?.value;

    const states = this._adminService.updateStatesProvinces(country);

    this.wineStatesMap.set(index, states);
  }

  // Updates province/state dropdown options when different country is selected
  onCountryChange(index: number) {
    this.updateStatesForWine(index);

    const wineGroup = this.winesArray.at(index) as FormGroup;
    wineGroup.get('provinceState')?.setValue('');
  }

  // *** CRUD operations, besides initial GET request on load ***
  // Form submission to update wine list
  onSubmit() {
    console.log('[ADMIN] Form Submitted!');
    this.isLoading = true;

    console.log('[ADMIN] Wines Array On Submit:', this.winesArray?.value);
    console.log('[ADMIN] Oringal Wines On Submit:', this.originalWines);

    this._adminService.markFormGroupTouched(this.wineForm);

    if (this.wineForm.valid) {
      const wineValues = this.winesArray?.value;
      console.log('[ADMIN] Wine values before:', wineValues);

      wineValues.forEach((wine: Wine) => {
        console.log('[ADMIN] Wine Characteristics:', wine.characteristics);
        wine.characteristics = this._adminService.arrayToString(
          wine.characteristics
        );
      });
      console.log('[ADMIN] Wine values after:', wineValues);
      const changes = {
        newWines: [] as Wine[],
        updatedWines: [] as Wine[],
      };

      wineValues.forEach((wine: Wine) => {
        if (!wine?.id) {
          changes.newWines.push(wine);
        } else if (
          this._adminService.hasWineChanged(wine, this.originalWines[wine?.id])
        ) {
          changes.updatedWines.push(wine);
        }
      });

      console.log('[ADMIN] Changed/Updated wines to submit:', changes);

      changes.newWines.forEach((wine) => {
        this._wineDataService
          .addWine(wine)
          .pipe(first())
          .subscribe({
            next: (response) => {
              console.log('[ADMIN] Successfully added wine:', response);
            },
            error: (error) => {
              console.error('[ADMIN] Error adding wine:', error);
            },
          });
      });

      changes.updatedWines.forEach((wine) => {
        this._wineDataService
          .updateWine(wine.id!, wine)
          .pipe(first())
          .subscribe({
            next: (response) => {
              console.log(
                '[ADMIN] Successfully updated wine with id:',
                wine.id,
                ' - ',
                response
              );
            },
            error: (error) => {
              console.error(
                '[ADMIN] Error updating wine with id:',
                wine.id,
                ' - ',
                error
              );
            },
          });
      });

      if (changes.newWines.length === 0 && changes.updatedWines.length === 0) {
        console.log('[ADMIN] No changes to submit');
        this.isValid = true;
        this.isLoading = false;
        this.selectedSort = '';
      } else {
        console.log('[ADMIN] Re initializing form');
        this.wineForm = this.fb.group({
          wines: this.fb.array([]),
        });
        setTimeout(() => {
          this._wineDataService.loadWines();
        }, 1000);
        this.isValid = true;
        this.selectedSort = '';
      }
    } else {
      console.error('[ADMIN] Form has validation errors');
      this.isValid = false;
      this.isLoading = false;
      this.selectedSort = '';
    }
  }

  // Delete a wine
  deleteWine(index: number, e: any, wine: any) {
    e.stopPropagation();

    this.winesArray.removeAt(index);

    if (wine?.id) {
      this._wineDataService.deleteWine(wine?.id);
    }
  }

  // Add a new form entry for a new wine
  addWine() {
    this.addEmptyWineForm();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
