import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

// Models
import { RegisterModel } from './models/register.model';
import { LoginModel } from './models/login.model';
import { UpdateModel } from './models/update.model';

const appKey = "kid_S1klkIW4M" // APP KEY HERE;
const appSecret = "beea2e830dec4141a64f7bb7e08953c5" // APP SECRET HERE;
const registerUrl = `https://baas.kinvey.com/user/${appKey}`;
const loginUrl = `https://baas.kinvey.com/user/${appKey}/login`;
const logoutUrl = `https://baas.kinvey.com/user/${appKey}/_logout`;

@Injectable()
export class AuthenticationService {
  private currentAuthtoken: string;
  private currentUser: string;

  constructor(
    private http: HttpClient
  ) { }

  login(loginModel: LoginModel) {
    return this.http.post(
      loginUrl,
      JSON.stringify(loginModel),
      {
        headers: this.createAuthHeaders('Basic')
      }
    )
  }

  register(registerModel: RegisterModel): Observable<Object> {
    return this.http.post(
      registerUrl,
      JSON.stringify(registerModel),
      {
        headers: this.createAuthHeaders('Basic')
      }
    )
  }

  logout() {
    return this.http.post(
      logoutUrl,
      {},
      {
        headers: this.createAuthHeaders('Kinvey')
      }
    )
  }

  update(model: UpdateModel) {
    let userId = localStorage.getItem('userId');
    let updateUrl = `https://baas.kinvey.com/user/${appKey}/${userId}`;
    return this.http.put(
      updateUrl,
      JSON.stringify(model),
      {
        headers: this.createAuthHeaders('Kinvey')
      }
    )
  }

  getUser(){
    let userId = localStorage.getItem('userId');    
    let getUserUrl = `https://baas.kinvey.com/user/${appKey}/${userId}`;
    return this.http.get(
      getUserUrl,
      {
        headers:this.createAuthHeaders('Kinvey')
      }
    )
    
  }

  isLoggedIn() {
    let authtoken: string = localStorage.getItem('authtoken');

    return authtoken === this.currentAuthtoken;
  }

  get authtoken() {
    return this.currentAuthtoken;
  }

  set authtoken(value: string) {
    this.currentAuthtoken = value;
  }

  isAdmin() {
    let username: string = localStorage.getItem('username');

    return username === 'Admin';
  }

  get user() {
    return this.currentUser;
  }

  set user(value: string) {
    this.currentUser = value;
  }

  private createAuthHeaders(type: string): HttpHeaders {
    if (type === 'Basic') {
      return new HttpHeaders({
        'Authorization': `Basic ${btoa(`${appKey}:${appSecret}`)}`,
        'Content-Type': 'application/json'
      })
    } else {
      return new HttpHeaders({
        'Authorization': `Kinvey ${localStorage.getItem('authtoken')}`,
        'Content-Type': 'application/json'
      })
    }
  }
}