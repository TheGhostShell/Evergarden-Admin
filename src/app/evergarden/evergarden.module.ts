import {NgModule} from '@angular/core';
import {NbAuthModule} from '@nebular/auth';


// TODO to achieve with correct configuration and remove @Injectable({
//   providedIn: 'root',
// }) in evergarden-auth-strategy

@NgModule({
  declarations: [],
  imports: [
    NbAuthModule,
  ],
})
export class EvergardenModule {
}
