import { Component } from '@angular/core';
import { Wine } from '../../interfaces/Wine.interface';
import { WineSearchComponent } from '../wine-search/wine-search.component';
import { WineDataService } from '../../services/wineData.service';
import { Subject, takeUntil } from 'rxjs';
import { DividerModule } from 'primeng/divider';
import { StaticService } from '../../services/statics.service';
import { AdminService } from '../../services/admin.service';
import { WineDisplayService } from '../../services/wineDisplay.service';

@Component({
  selector: 'app-wine-display',
  imports: [DividerModule],
  templateUrl: './wine-display.component.html',
  styleUrl: './wine-display.component.scss',
})
export class WineDisplayComponent {
  wines: Wine[] = [];
  filteredWines: Array<Wine> = [];
  private destroy$ = new Subject<void>();

  constructor(
    private _wineDataService: WineDataService,
    public _adminService: AdminService,
    public _wineDisplayService: WineDisplayService,
    public _staticsService: StaticService
  ) {}

  ngOnInit() {
    this._wineDataService.wines$
      .pipe(takeUntil(this.destroy$))
      .subscribe((wines) => {
        this.wines = wines;
        this.filteredWines = wines;
        console.log('[DISPLAY] wines loaded:', wines);
      });
  }
}
