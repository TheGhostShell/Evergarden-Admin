import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../domain/model/user';
import {Observable, of} from 'rxjs';
import {flatMap} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';
import {State} from '../ngrx/reducers';
import {Token} from '../domain/model/token';
import {Role} from '../domain/model/role';
import {PasswordRequest} from '../domain/model/password-request';

export interface UserResponse {
  email: string;
  id: string;
  pseudo: string;
  firstname: string;
  lastname: string;
  activate: boolean;
  avatarUrl: string;
  roles: Array<RoleResponse>;
}

export interface RoleResponse {
  id: string;
  role: string;
}


@Injectable({
  providedIn: 'root',
})
export class UserApiService {

  private token: Token;

  constructor(private http: HttpClient, private store: Store<State>) {
    this.store.pipe(select(state => state.loginKey.token)).subscribe(value => this.token = value);
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

  // TODO add filter to add token in request automatically

  updateUser(user: User): Observable<User> {
    const url: string = '/api/v1/private/user';
    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + user.token,
      }),
    };
    return this.http.put(url, options)
      .pipe(
        flatMap((response: UserResponse) => {
          const userMapped: User = new User();
          userMapped.id = response.id;
          userMapped.email = response.email;
          return of(userMapped);
        }),
      );
  }

  updateUserEmail(user: User): Observable<any> {
    const url: string = '/api/v1/private/user';
    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + user.token,
      }),
    };
    const body = {
      id: user.id,
      email: user.email,
    };
    return this.http.put(url, body, options);
  }

  updateUserPassword(request: PasswordRequest): Observable<any> {
    const url: string = '/api/v1/private/user/password';
    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.token.token,
      }),
    };
    const body = {
      newPassword: request.newPassword,
      currentPassword: request.currentPassword,
      confirmationPassword: request.confirmationPassword,
    };
    return this.http.put(url, body, options);
  }

  updateUserRoles(user: User): Observable<any> {
    const url: string = '/api/v1/private/user';
    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + user.token,
      }),
    };
    const body = {
      id: user.id,
      roles: user.roles,
    };
    return this.http.put(url, body, options);
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

          response.roles.forEach(value => {
            const role: Role = new Role();
            role.id = value.id;
            role.name = value.role;
            userMapped.roles.push(role);
          });

          return of(userMapped);
        }),
      );
  }
}
