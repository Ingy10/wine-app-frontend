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
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  wineForm: FormGroup;
  wines: Array<Wine> = [];
  selectedCountryStates: Array<String> = [];
  wineStatesMap: Map<number, Array<String>> = new Map();

  constructor(
    public _staticService: StaticService,
    public _adminService: AdminService,
    private fb: FormBuilder
  ) {
    this.wines = _staticService.sampleWines; // TODO: Get wine from api

    // Initialize the form with an empty structure
    this.wineForm = this.fb.group({
      wines: this.fb.array([]),
    });
  }

  ngOnInit() {
    this.initForm();
  }

  // *** Form Group Related Methods *** //
  // Clears and intializes form data
  initForm() {
    while (this.winesArray.length !== 0) {
      this.winesArray.removeAt(0);
    }

    this.wines.forEach((wine) => {
      this.addWineFormGroup(wine);
    });
  }

  // Helper to get the wines FormArray
  get winesArray(): FormArray {
    return this.wineForm.get('wines') as FormArray;
  }

  // Create a form group for a single wine
  addWineFormGroup(wine: Wine) {
    const wineGroup = this.fb.group({
      id: [wine.id],
      wineName: [wine.wineName, Validators.required],
      winery: [wine.winery, Validators.required],
      vintage: [wine.vintage, Validators.required],
      wineStyle: [wine.wineStyle, Validators.required],
      varietal: [wine.varietal, Validators.required],
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

  onSubmit() {
    console.log('[ADMIN] Form Submitted!');
  }

  deleteWine(index: number, e: any) {
    e.stopPropagation();
    console.log('[ADMIN] Delete wine from index', index);
  }

  addWine() {
    console.log('[ADMIN] New wine form added');
  }
}
