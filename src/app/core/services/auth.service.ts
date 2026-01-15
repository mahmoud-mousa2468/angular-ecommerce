import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient:HttpClient) { }
  signUp(userData:object):Observable<any>{
    return this._HttpClient.post(environment.apiUrl+'auth/signup',userData)
  }
  signIn(userData:object):Observable<any>{
    return this._HttpClient.post(environment.apiUrl+'auth/signin',userData)
  }
  forgotPassword(userEmail:object):Observable<any>{
    return this._HttpClient.post(`${environment.apiUrl}auth/forgotPasswords`,userEmail)
  }
  verifyResetCode(resetCode:object):Observable<any>{
    return this._HttpClient.post(`${environment.apiUrl}auth/verifyResetCode`,resetCode
    )
  }
  resetPassword(newPassword:object):Observable<any>{
    return this._HttpClient.put(`${environment.apiUrl}auth/resetPassword`,newPassword)
  }
}
