import { NgModule } from '@angular/core';
import {NbButtonModule, NbCardModule} from '@nebular/theme';
import { CKEditorModule } from 'ng2-ckeditor';

import { ThemeModule } from '../../@theme/theme.module';

import { EditorsRoutingModule, routedComponents } from './editors-routing.module';

@NgModule({
  imports: [
    NbCardModule,
    ThemeModule,
    EditorsRoutingModule,
    CKEditorModule,
    NbButtonModule,
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class EditorsModule { }
