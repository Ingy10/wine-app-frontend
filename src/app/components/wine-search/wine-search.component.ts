import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-wine-search',
  imports: [HeaderComponent, CardModule, InputTextModule],
  templateUrl: './wine-search.component.html',
  styleUrl: './wine-search.component.scss',
})
export class WineSearchComponent {}
