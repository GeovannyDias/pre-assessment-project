import { Routes } from "@angular/router";

export const REPORT_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./report-home/report-home.page').then(m => m.ReportHomePage),
    }
];