import { Component } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';
import {NbIconLibraries} from '@nebular/theme';

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

  constructor(private iconLibraries: NbIconLibraries) {
    iconLibraries.registerFontPack('fa', { packClass: 'fa', iconClassPrefix: 'fa' });
    iconLibraries.registerFontPack('far', { packClass: 'far', iconClassPrefix: 'fa' });
  }

  menu = MENU_ITEMS;
}
