import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import {reducer, UserState} from './user.reducer';

export interface State {
  user: UserState;
}

export const reducers: ActionReducerMap<State> = {
  user: reducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
