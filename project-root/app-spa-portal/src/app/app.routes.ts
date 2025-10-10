import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./shared/pages/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES)
    },
    {
        path: 'login',
        loadComponent: () => import('./shared/pages/login/login.page').then(m => m.LoginPage)
    },
    {
        path: '**',
        redirectTo: 'customer',
        pathMatch: 'full'
    }
];
