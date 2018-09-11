import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { User } from './user';

@Injectable()
export class HttpService {
  headers = new Headers({ 'Content-Type': 'application/json' });
  options = new RequestOptions({ headers: this.headers });

  // URIs
  private _registerURI = '/api/register';
  private _loginURI = '/api/login';
  private _logoutURI = '/api/logout';
  private _getUserURI = '/api/get_user';
  private _deleteUserURI = '/api/delete_user';
  private _publishPostURI = '/api/publish_post';

  constructor(private _http: Http) { }

  // functions
  register(user: User) {
    return this._http.post(this._registerURI, JSON.stringify(user), this.options)
      .map((response: Response) => response.json());
  }

  login(user: User) {
    return this._http.post(this._loginURI, JSON.stringify(user), this.options)
      .map((response: Response) => response.json());
  }

  logout() {
    return this._http.get(this._logoutURI)
      .map((response: Response) => response.json());
  }

  getUser() {
    return this._http.get(this._getUserURI)
      .map((response: Response) => response.json());
  }

  deleteUser(user_id: string) {
    return this._http.post(this._deleteUserURI, JSON.stringify({ user_id: user_id }), this.options)
      .map((response: Response) => response.json());
  }

  publishPost(post) {
    const postData = new FormData();
    postData.append('message', post.message);
    postData.append('images', post.images);
    postData.append('videos', post.videos);
    postData.append('audios', post.audios);
    return this._http.post(this._publishPostURI, postData)
      .map((response: Response) => response.json());
  }

}
