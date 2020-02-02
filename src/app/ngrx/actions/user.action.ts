import {Action} from '@ngrx/store';
import {User} from '../../domain/model/user';
import {PasswordRequest} from '../../domain/model/password-request';

export enum UserActionTypes {
  AVATAR_UPDATED = '[User] Avatar user updated',
  EMAIL_UPDATED = '[User] Email user updated',
  ROLES_UPDATED = '[User] Roles user updated',
  USER_UPDATED = '[User] User relative data updated',
  PASSWORD_UPDATED = '[User] User password updated',
}

export class AvatarUpdated implements Action {
  readonly type = UserActionTypes.AVATAR_UPDATED;

  constructor(public payload: FileList) {
  }
}

export class EmailUpdated implements Action {
  readonly type = UserActionTypes.EMAIL_UPDATED;

  constructor(public payload: User) {
  }
}

export class UserUpdated implements Action {
  readonly type = UserActionTypes.USER_UPDATED;

  constructor(public payload: User) {
  }
}

export class PasswordUpdated implements Action {
  readonly type = UserActionTypes.PASSWORD_UPDATED;

  constructor(public payload: PasswordRequest) {
  }
}

export class RolesUpdated implements Action {
  readonly type = UserActionTypes.ROLES_UPDATED;

  constructor(public payload: User) {
  }
}

export type UserActions = AvatarUpdated | UserUpdated | EmailUpdated | RolesUpdated | PasswordUpdated;
