import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { WineSearchComponent } from './components/wine-search/wine-search.component';
import { AdminComponent } from './components/admin/admin.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login',
  },
  {
    path: '',
    component: WineSearchComponent,
    title: 'Wine Search',
  },
  {
    path: 'admin',
    component: AdminComponent,
    title: 'Admin Page',
  },
];
