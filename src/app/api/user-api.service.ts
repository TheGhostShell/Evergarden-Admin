import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../domain/model/user';
import {Observable, of} from 'rxjs';
import {flatMap, map} from 'rxjs/operators';

export interface UserResponse {
  email: string;
  id: string;
  pseudo: string;
  firstname: string;
  lastname: string;
  activate: boolean;
  roles: Array<string>;
}


@Injectable({
  providedIn: 'root',
})
export class UserApiService {

  constructor(private http: HttpClient) {
  }

  fetchUser(user: User): Observable<User> {
    const url: string = '/api/v1/private/user/' + user.id;
    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + user.token,
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
          userMapped.token = user.token;
          userMapped.name = response.firstname + ' ' + response.lastname;
          return of(userMapped);
        }),
      );
  }
}
