/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {Observable, of as observableOf} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import {
  NbAuthIllegalTokenError,
  NbAuthResult,
  NbAuthStrategy,
  NbAuthStrategyClass,
  NbPasswordAuthStrategyOptions,
  passwordStrategyOptions,
} from '@nebular/auth';
import {select, Store} from '@ngrx/store';
import {State} from '../ngrx/reducers';
import {Token} from '../domain/model/token';

// TODO refactor this class

@Injectable({
  providedIn: 'root',
})
export class EvergardenAuthStrategy extends NbAuthStrategy {

  protected defaultOptions: NbPasswordAuthStrategyOptions = passwordStrategyOptions;

  constructor(protected http: HttpClient, private route: ActivatedRoute, private store: Store<State>) {
    super();
  }

  static setup(options: NbPasswordAuthStrategyOptions): [NbAuthStrategyClass, NbPasswordAuthStrategyOptions] {
    return [EvergardenAuthStrategy, options];
  }

  authenticate(data?: any): Observable<NbAuthResult> {
    const module = 'login';
    const method = this.getOption(`${module}.method`);
    const url = this.getActionEndpoint(module);
    const requireValidToken = this.getOption(`${module}.requireValidToken`);
    return this.http.request(method, url, {body: data, observe: 'response'})
      .pipe(
        map((res) => {
          if (this.getOption(`${module}.alwaysFail`)) {
            throw this.createFailResponse(data);
          }
          return res;
        }),
        map((res) => {
          return new NbAuthResult(
            true,
            res,
            this.getOption(`${module}.redirect.success`),
            [],
            this.getOption('messages.getter')(module, res, this.options),
            this.createToken(this.getOption('token.getter')(module, res, this.options), requireValidToken));
        }),
        catchError((res) => {
          return this.handleResponseError(res, module);
        }),
      );
  }

  register(data?: any): Observable<NbAuthResult> {
    const module = 'register';
    const method = this.getOption(`${module}.method`);
    const url = this.getActionEndpoint(module);
    const requireValidToken = this.getOption(`${module}.requireValidToken`);
    return this.http.request(method, url, {body: data, observe: 'response'})
      .pipe(
        map((res) => {
          if (this.getOption(`${module}.alwaysFail`)) {
            throw this.createFailResponse(data);
          }

          return res;
        }),
        map((res) => {
          return new NbAuthResult(
            true,
            res,
            this.getOption(`${module}.redirect.success`),
            [],
            this.getOption('messages.getter')(module, res, this.options),
            this.createToken(this.getOption('token.getter')('login', res, this.options), requireValidToken));
        }),
        catchError((res) => {
          return this.handleResponseError(res, module);
        }),
      );
  }

  requestPassword(data?: any): Observable<NbAuthResult> {
    const module = 'requestPass';
    const method = this.getOption(`${module}.method`);
    const url = this.getActionEndpoint(module);
    return this.http.request(method, url, {body: data, observe: 'response'})
      .pipe(
        map((res) => {
          if (this.getOption(`${module}.alwaysFail`)) {
            throw this.createFailResponse();
          }

          return res;
        }),
        map((res) => {
          return new NbAuthResult(
            true,
            res,
            this.getOption(`${module}.redirect.success`),
            [],
            this.getOption('messages.getter')(module, res, this.options));
        }),
        catchError((res) => {
          return this.handleResponseError(res, module);
        }),
      );
  }

  resetPassword(data: any = {}): Observable<NbAuthResult> {

    const module = 'resetPass';
    const method = this.getOption(`${module}.method`);
    const url = this.getActionEndpoint(module);
    const tokenKey = this.getOption(`${module}.resetPasswordTokenKey`);
    data[tokenKey] = this.route.snapshot.queryParams[tokenKey];
    return this.http.request(method, url, {body: data, observe: 'response'})
      .pipe(
        map((res) => {
          if (this.getOption(`${module}.alwaysFail`)) {
            throw this.createFailResponse();
          }

          return res;
        }),
        map((res) => {
          return new NbAuthResult(
            true,
            res,
            this.getOption(`${module}.redirect.success`),
            [],
            this.getOption('messages.getter')(module, res, this.options));
        }),
        catchError((res) => {
          return this.handleResponseError(res, module);
        }),
      );
  }

  logout(): Observable<NbAuthResult> {

    const module = 'logout';
    const method = this.getOption(`${module}.method`);
    const url = this.getActionEndpoint(module);
    let token: Token;

    this.store.pipe(select(state => state.loginKey.token)).subscribe(value => token = value);

    return observableOf({})
      .pipe(
        switchMap((res: any) => {
          if (!url) {
            return observableOf(res);
          }
          return this.http.request(method, url, {
            observe: 'response',
            headers: new HttpHeaders({
              Authorization: 'Bearer ' + token.token,
            }),
          });
        }),
        map((res) => {
          if (this.getOption(`${module}.alwaysFail`)) {
            throw this.createFailResponse();
          }

          return res;
        }),
        map((res) => {
          return new NbAuthResult(
            true,
            res,
            this.getOption(`${module}.redirect.success`),
            [],
            this.getOption('messages.getter')(module, res, this.options));
        }),
        catchError((res) => {
          return this.handleResponseError(res, module);
        }),
      );
  }

  refreshToken(data?: any): Observable<NbAuthResult> {

    const module = 'refreshToken';
    const method = this.getOption(`${module}.method`);
    const url = this.getActionEndpoint(module);
    const requireValidToken = this.getOption(`${module}.requireValidToken`);

    return this.http.request(method, url, {body: data, observe: 'response'})
      .pipe(
        map((res) => {
          if (this.getOption(`${module}.alwaysFail`)) {
            throw this.createFailResponse(data);
          }

          return res;
        }),
        map((res) => {
          return new NbAuthResult(
            true,
            res,
            this.getOption(`${module}.redirect.success`),
            [],
            this.getOption('messages.getter')(module, res, this.options),
            this.createToken(this.getOption('token.getter')(module, res, this.options), requireValidToken));
        }),
        catchError((res) => {
          return this.handleResponseError(res, module);
        }),
      );
  }

  protected handleResponseError(res: any, module: string): Observable<NbAuthResult> {
    let errors = [];
    if (res instanceof HttpErrorResponse) {
      errors = this.getOption('errors.getter')(module, res, this.options);
    } else if (res instanceof NbAuthIllegalTokenError) {
      errors.push(res.message);
    } else {
      errors.push('Something went wrong.');
    }
    return observableOf(
      new NbAuthResult(
        false,
        res,
        this.getOption(`${module}.redirect.failure`),
        errors,
      ));
  }

}
