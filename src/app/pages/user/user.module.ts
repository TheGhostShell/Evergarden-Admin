import {NgModule} from '@angular/core';
import {ProfileComponent} from './profile/profile.component';
import {UserComponent} from './user.component';
import {UserRoutingModule} from './user.routing.module';
import {
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbInputModule,
  NbRadioModule,
  NbUserModule,
} from '@nebular/theme';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

const components = [
  UserComponent,
  ProfileComponent,
];

@NgModule({
    imports: [
        UserRoutingModule,
        NbCardModule,
        NbUserModule,
        NbCheckboxModule,
        NbInputModule,
        NbButtonModule,
        NbRadioModule,
        FormsModule,
        CommonModule,
    ],
  declarations: [
    ...components,
  ],
})
export class UserModule {
}
