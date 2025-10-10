import { Routes } from '@angular/router';

export const DASHBOARD_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./customer-home/customer-home.page').then(m => m.CustomerHomePage),
    }
];