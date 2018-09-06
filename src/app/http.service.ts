import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { User } from './user';

@Injectable()
export class HttpService {
  headers = new Headers({ 'Content-Type': 'application/json' });
  options = new RequestOptions({ headers: this.headers });

  // urls
  private _registerUrl = '/api/register';

  constructor(private _http: Http) { }

  // functions
  register(user: User) {
    return this._http.post(this._registerUrl, JSON.stringify(user), this.options)
      .map((response: Response) => response.json());
  }
}
