import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import {environment} from '../../../environments/environment';
import {loginReducer, LoginState} from './login.reducer';
import {userReducer, UserState} from './user.reducer';

export interface State {
  loginKey: LoginState;
  userKey: UserState;
}

export const reducers: ActionReducerMap<State> = {
  loginKey: loginReducer,
  userKey: userReducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
