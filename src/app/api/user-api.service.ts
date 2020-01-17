import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../domain/model/user';
import {Observable, of} from 'rxjs';
import {flatMap, map} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';
import {State} from '../ngrx/reducers';
import {Token} from '../domain/model/token';

export interface UserResponse {
  email: string;
  id: string;
  pseudo: string;
  firstname: string;
  lastname: string;
  activate: boolean;
  avatarUrl: string;
  roles: Array<string>;
}


@Injectable({
  providedIn: 'root',
})
export class UserApiService {

  private token: Token;

  constructor(private http: HttpClient, private store: Store<State>) {
  }

  addAvatar(avatar: FileList): Observable<any> {
    this.store.pipe(select(state => state.loginKey.token)).subscribe(value => this.token = value);
    const avatarFilePart: FormData = new FormData();
    avatarFilePart.append('avatar', avatar[0], avatar[0].name);
    const url: string = '/api/v1/private/user/avatar';
    const option = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.token.token,
      }),
    };
    return this.http.post(url, avatarFilePart, option);
  }

  fetchUser(token: Token): Observable<User> {
    const url: string = '/api/v1/private/user/' + token.userId;
    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token.token,
      }),
    };
    return this.http.get(url, options)
      .pipe(
        flatMap((response: UserResponse) => {
          const userMapped: User = new User();
          userMapped.id = response.id;
          userMapped.email = response.email;
          userMapped.firstName = response.firstname;
          userMapped.lastName = response.lastname;
          userMapped.pseudo = response.pseudo;
          userMapped.token = token.token;
          userMapped.avatarUrl = response.avatarUrl;
          userMapped.name = response.firstname + ' ' + response.lastname;
          return of(userMapped);
        }),
      );
  }
}
