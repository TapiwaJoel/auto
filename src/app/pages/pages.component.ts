import {Component} from '@angular/core';

import {HOD_MENU_ITEMS, MENU_ITEMS} from './pages-menu';
import {Router} from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {

  menu = MENU_ITEMS;


  constructor(private router: Router) {

    const auth = localStorage.getItem('auth');
    if (!auth) {
      this.router.navigate(['/']);
      return;
    }

    const role: any = jwt_decode(JSON.parse(auth).data.accessToken);
    console.log('roles', role);
    // Role
    // "ROLE_HOD"

    if (role.Role === 'ROLE_HOD') {
      this.menu = HOD_MENU_ITEMS;
    } else {
      this.menu = MENU_ITEMS;
    }
  }
}
