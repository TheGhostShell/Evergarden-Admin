import { Component } from '@angular/core';
import {NbComponentStatus} from '@nebular/theme';

@Component({
  selector: 'ngx-tiny-mce-page',
  templateUrl: 'tiny-mce.component.html',
})
export class TinyMCEComponent {
  private primary: NbComponentStatus = 'primary';
}
