import {Action} from '@ngrx/store';
import {User} from '../../domain/model/user';

export enum UserActionTypes {
  AVATAR_UPDATED = '[User] Avatar user updated',
  USER_UPDATED = '[User] User relative data updated',
}

export class AvatarUpdated implements Action {
  readonly type = UserActionTypes.AVATAR_UPDATED;

  constructor(public payload: FileList) {
  }
}

export class UserUpdated implements Action {
  readonly type = UserActionTypes.USER_UPDATED;

  constructor(public payload: User) {
  }
}

export type UserActions = AvatarUpdated | UserUpdated;
