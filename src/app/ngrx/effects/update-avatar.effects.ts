import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {UserApiService} from '../../api/user-api.service';
import {select, Store} from '@ngrx/store';
import {State} from '../reducers';
import {UserActions, UserActionTypes, UserUpdated} from '../actions/user.action';
import {catchError, flatMap, map} from 'rxjs/operators';
import {EMPTY} from 'rxjs';


@Injectable()
export class UpdateAvatarEffects {
  updateAvatar$ = createEffect(() => this.actions$.pipe(
    ofType(UserActionTypes.AVATAR_UPDATED),
    flatMap(value => this.userApi.addAvatar(value.payload)),
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
