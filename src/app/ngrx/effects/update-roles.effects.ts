import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {UserApiService} from '../../api/user-api.service';
import {UserActions, UserActionTypes, UserUpdated} from '../actions/user.action';
import {catchError, flatMap, map} from 'rxjs/operators';
import {EMPTY} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {State} from '../reducers';


@Injectable()
export class UpdateRolesEffects {
  updateRoles$ = createEffect(() => this.actions$.pipe(
    ofType(UserActionTypes.ROLES_UPDATED),
    flatMap(value => this.userApi.updateUserRoles(value.payload)),
    flatMap(value => this.store.pipe(select(state => state.loginKey.token))),
    flatMap(value => this.userApi.fetchUser(value)),
    map(
      value => new UserUpdated(value),
      catchError(err => {
        console.log(err);
        return EMPTY;
      }),
    ),
  ));

  constructor(private actions$: Actions<UserActions>, private userApi: UserApiService, private store: Store<State>) {
  }
}
