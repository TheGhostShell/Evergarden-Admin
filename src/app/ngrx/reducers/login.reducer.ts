import {LoginActions, LoginActionTypes} from '../actions/login.actions';
import {Token} from '../../domain/model/token';


export const userReducerFeatureKey = 'userReducer';

export interface LoginState {
  token: Token;
}

export const initialTokenState: LoginState = {
  token: new Token(),
};

export function loginReducer(state = initialTokenState, action: LoginActions): LoginState {
  switch (action.type) {
    case LoginActionTypes.LOGIN:
      return {...state, token: action.payload}; // we just retrieve a token
    case LoginActionTypes.LOGIN_SUCCESS:
      return {...state, token: action.payload}; // we retrieve all user data
    default:
      return state;
  }
}
