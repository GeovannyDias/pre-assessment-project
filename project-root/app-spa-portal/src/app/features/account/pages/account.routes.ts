import { Routes } from "@angular/router";

export const ACCOUNT_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./account-home/account-home.page').then(m => m.AccountHomePage),
    }
];