import { Component } from '@angular/core';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  imports: [MegaMenuModule, MenubarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  items: MenuItem[] = [];

  constructor() {
    this.items = [
      { label: 'Home', icon: 'pi pi-home', routerLink: ['/'] },
      { label: 'Admin', icon: 'pi pi-cog', routerLink: ['/admin'] },
    ];
  }
}
