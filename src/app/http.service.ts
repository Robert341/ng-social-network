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
  private _loginUrl = '/api/login';
  private _logoutUrl = '/api/logout';
  private _getUserUrl = '/api/get_user';
  private _publishPostUrl = '/api/publish_post';

  constructor(private _http: Http) { }

  // functions
  register(user: User) {
    return this._http.post(this._registerUrl, JSON.stringify(user), this.options)
      .map((response: Response) => response.json());
  }
  login(user: User) {
    return this._http.post(this._loginUrl, JSON.stringify(user), this.options)
      .map((response: Response) => response.json());
  }

  logout() {
    return this._http.get(this._logoutUrl)
      .map((response: Response) => response.json());
  }

  getUser() {
    return this._http.get(this._getUserUrl)
      .map((response: Response) => response.json());
  }

  publishPost(post) {
    const postData = new FormData();
    postData.append('message', post.message);
    postData.append('images', post.images);
    postData.append('videos', post.videos);
    postData.append('audios', post.audios);
    return this._http.post(this._publishPostUrl, postData)
      .map((response: Response) => response.json());
  }
}
