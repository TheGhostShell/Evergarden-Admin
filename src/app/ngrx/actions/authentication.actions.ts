import {Action} from '@ngrx/store';
import {UserCredentialInterface} from '../../domain/model/user-credential-interface';

export enum AuthenticationActionTypes {
  AUTHENTICATION = '[Authentication] Load Authentications',
}

export class LoadAuthentications implements Action {
  readonly type = AuthenticationActionTypes.AUTHENTICATION;

  constructor(public payload: UserCredentialInterface) {}
}


export type AuthenticationActions = LoadAuthentications;
