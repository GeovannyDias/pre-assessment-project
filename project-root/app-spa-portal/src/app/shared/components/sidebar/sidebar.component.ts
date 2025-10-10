import { Component } from '@angular/core';
import { SHARED_IMPORTS } from '../../utils/shared-imports';

interface NavItem {
  icon?: string;
  label: string;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  imports: [...SHARED_IMPORTS],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  // Datos de navegación (Menu lateral)
  navItems: NavItem[] = [
    { label: 'Clientes', route: '/customers' },
    { label: 'Cuentas', route: '/accounts' },
    { label: 'Movimientos', route: '/transactions' },
    { label: 'Reportes', route: '/reports' },
  ];
  constructor() { }
}
