
import {LoginActions, LoginActionTypes} from '../actions/login.actions';
import {User} from '../domain/model/user';


export const userReducerFeatureKey = 'userReducer';

export interface UserState {
  user: User;
}

export const initialState: UserState = {
  user: new User(),
};

export function reducer(state = initialState, action: LoginActions): UserState {
  switch (action.type) {
    case LoginActionTypes.LOGIN:
      return {...state, user: action.payload}; // we just retrieve a token
    case LoginActionTypes.LOGIN_SUCCESS:
      return {...state, user: action.payload}; // we retrieve all user data
    default:
      return state;
  }
}
