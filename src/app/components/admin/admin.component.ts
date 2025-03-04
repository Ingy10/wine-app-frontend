import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Wine } from '../../interfaces/Wine.interface';
import { DividerModule } from 'primeng/divider';
import { AccordionModule } from 'primeng/accordion';
import { DropdownModule } from 'primeng/dropdown';
import { StaticService } from '../../services/statics.service';
import { TextareaModule } from 'primeng/textarea';

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
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  wineNameInput = '';
  wines: Array<Wine> = [
    {
      id: 4,
      wineName: 'Cruisy Cab',
      winery: 'Napa Winery',
      vintage: '2018',
      wineStyle: 'Red',
      varietal: 'Cabernet Sauvignon',
      region: 'Napa Valley',
      subRegion: 'Sonoma',
      country: 'USA',
      provinceState: 'California',
      price: 45.99,
      body: 'Full',
      sugar: 'Dry',
      alcoholContent: 14.5,
      acidity: 'Medium',
      tannins: 'Firm',
      tastingNote1: 'Blackcurrant',
      tastingNote2: 'Cedar',
      tastingNote3: 'Jam',
      tastingNote4: 'Plum',
      tastingNote5: 'Stone',
      servingTemp: '15-18°C',
      foodPairings: 'Steak, Lamb, Hard Cheeses',
    },
  ];

  constructor(public _staticService: StaticService) {}

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
