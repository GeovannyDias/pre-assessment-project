import { Routes } from '@angular/router';

export const DASHBOARD_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./dashboard.page').then(m => m.DashboardPage),
        children: [
            {
                path: 'customers',
                loadChildren: () => import('../../../features/customer/pages/customer.routes').then(m => m.DASHBOARD_ROUTES)
            },
            {
                path: 'accounts',
                loadChildren: () => import('../../../features/account/pages/account.routes').then(m => m.ACCOUNT_ROUTES)
            },
            {
                path: 'transactions',
                loadChildren: () => import('../../../features/transaction/pages/transaction.routes').then(m => m.TRANSACTION_ROUTES)
            },
            {
                path: 'reports',
                loadChildren: () => import('../../../features/report/pages/report.routes').then(m => m.REPORT_ROUTES)
            },
            {
                path: '**',
                redirectTo: 'customers',
                pathMatch: 'full'
            }
        ]
    }
];