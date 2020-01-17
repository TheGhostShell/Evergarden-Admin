import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {LoginActions, LoginActionTypes, LoginSuccess} from '../actions/login.actions';
import {UserApiService} from '../../api/user-api.service';
import {Store} from '@ngrx/store';
import {State} from '../reducers';
import {catchError, flatMap, map} from 'rxjs/operators';
import {User} from '../../domain/model/user';
import {EMPTY} from 'rxjs';
import {UserUpdated} from '../actions/user.action';


@Injectable()
export class LoadUserEffects {

  loadUser$ = createEffect(() => this.actions$.pipe(
    ofType(LoginActionTypes.LOGIN),
    flatMap(action => this.userApi.fetchUser(action.payload)),
    map(
      (us: User) => new UserUpdated(us),
      catchError(() => EMPTY),
    ),
    ),
  );

  constructor(private actions$: Actions<LoginActions>, private userApi: UserApiService, private store: Store<State>) {
  }

}


