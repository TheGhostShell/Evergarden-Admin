/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {CoreModule} from './@core/core.module';
import {ThemeModule} from './@theme/theme.module';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';
import {StoreModule} from '@ngrx/store';
import {metaReducers, reducers} from './ngrx/reducers';
import {EffectsModule} from '@ngrx/effects';
import {AppEffects} from './app.effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {LoadUserEffects} from './ngrx/effects/load-user.effects';
import {UpdateAvatarEffects} from './ngrx/effects/update-avatar.effects';
import {UpdateEmailEffects} from './ngrx/effects/update-email.effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,

    ThemeModule.forRoot(),

    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    CoreModule.forRoot(),
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 10,
      name: 'Evergarden Admin Dashboard',
    }),
    EffectsModule.forRoot([AppEffects]),
    EffectsModule.forFeature([LoadUserEffects, UpdateAvatarEffects, UpdateEmailEffects]),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
