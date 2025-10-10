import { Component } from '@angular/core';
import { SHARED_IMPORTS } from '../../utils/shared-imports';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [...SHARED_IMPORTS],
  standalone: true
})
export class NavbarComponent {

  constructor() { }
 
}
