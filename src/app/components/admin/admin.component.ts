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
  wines: Array<Wine> = [];

  constructor(public _staticService: StaticService) {
    this.wines = _staticService.sampleWines;
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
