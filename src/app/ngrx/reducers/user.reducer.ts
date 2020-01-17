import {UserActions, UserActionTypes} from '../actions/user.action';
import {User} from '../../domain/model/user';

export interface UserState {
  user: User;
}

export const initialState: UserState = {
  user: new User(),
};

export function userReducer(state = initialState, action: UserActions): UserState {
  if (action.type === UserActionTypes.USER_UPDATED) {
    return {...state, user: action.payload};
  } else {
    return state;
  }
}
