import { Routes } from "@angular/router";

export const TRANSACTION_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./transaction-home/transaction-home.page').then(m => m.TransactionHomePage),
    }
];