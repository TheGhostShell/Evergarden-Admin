import {Action} from '@ngrx/store';
import {UserCredential} from '../domain/model/user-credential';

export enum AuthenticationActionTypes {
  AUTHENTICATION = '[Authentication] Load Authentications',
}

export class LoadAuthentications implements Action {
  readonly type = AuthenticationActionTypes.AUTHENTICATION;

  constructor(public payload: UserCredential) {}
}


export type AuthenticationActions = LoadAuthentications;
