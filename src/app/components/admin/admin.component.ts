import { Component, Injectable } from '@angular/core';
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
  isValid = true;
  isLoading = false;

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
      tastingNote1: '',
      tastingNote2: '',
      tastingNote3: '',
      tastingNote4: '',
      tastingNote5: '',
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
      wineName: [wine.wineName, Validators.required],
      winery: [wine.winery, Validators.required],
      vintage: [wine.vintage, Validators.required],
      wineStyle: [wine.wineStyle, Validators.required],
      varietal: [
        wine.varietal,
        [Validators.required, Validators.pattern(/^[a-zA-Z\s,]+$/)],
      ],
      country: [wine.country, Validators.required],
      provinceState: [wine.provinceState],
      region: [wine.region],
      subRegion: [wine.subRegion],
      price: [wine.price],
      body: [wine.body],
      sugar: [wine.sugar],
      alcoholContent: [wine.alcoholContent],
      acidity: [wine.acidity],
      tannins: [wine.tannins],
      tastingNote1: [wine.tastingNote1],
      tastingNote2: [wine.tastingNote2],
      tastingNote3: [wine.tastingNote3],
      tastingNote4: [wine.tastingNote4],
      tastingNote5: [wine.tastingNote5],
      servingTemp: [wine.servingTemp],
      foodPairings: [wine.foodPairings],
    });

    this.winesArray.push(wineGroup);
    console.log('[ADMIN] wines array:', this.winesArray);
    this.updateStatesForWine(this.winesArray.length - 1);

    return wineGroup;
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
      } else {
        console.log('[ADMIN] Re initializing form');
        this.wineForm = this.fb.group({
          wines: this.fb.array([]),
        });
        setTimeout(() => {
          this._wineDataService.loadWines();
        }, 1000);
        this.isValid = true;
      }
    } else {
      console.error('[ADMIN] Form has validation errors');
      this.isValid = false;
      this.isLoading = false;
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
