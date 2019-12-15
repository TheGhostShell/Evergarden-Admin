import {Action} from '@ngrx/store';
import {User} from '../domain/model/user';

export enum LoginActionTypes {
  LOGIN = '[Login] Login with credential',
  LOGIN_SUCCESS = '[Login] Login Success',
  LOGIN_FAILURE = '[Login] Login Failure',
  LOGOUT = '[Logout] Logout disconnect user',
}

export class Login implements Action {
  readonly type = LoginActionTypes.LOGIN;

  constructor(public payload: User) {
  }
}

export class LoginSuccess implements Action {
  readonly type = LoginActionTypes.LOGIN_SUCCESS;

  constructor(public payload: User) {
  }
}

export class LoginFailure implements Action {
  readonly type = LoginActionTypes.LOGIN_FAILURE;

  constructor(public payload: { error: any }) {
  }
}

export class Logout implements Action {
  readonly type = LoginActionTypes.LOGOUT;

  constructor(public payload: User) {
  }
}

export type LoginActions = Login | LoginSuccess | LoginFailure | Logout;

