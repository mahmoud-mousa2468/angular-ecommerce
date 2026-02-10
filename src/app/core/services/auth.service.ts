import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { IApiResponse, IUser } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient:HttpClient) { }
  signUp(userData:object):Observable<IApiResponse<IUser>>{
    return this._HttpClient.post<IApiResponse<IUser>>(environment.apiUrl+'auth/signup',userData)
  }
  signIn(userData:object):Observable<IApiResponse<IUser>>{
    return this._HttpClient.post<IApiResponse<IUser>>(environment.apiUrl+'auth/signin',userData)
  }
  forgotPassword(userEmail:object):Observable<IApiResponse<any>>{
    return this._HttpClient.post<IApiResponse<any>>(`${environment.apiUrl}auth/forgotPasswords`,userEmail)
  }
  verifyResetCode(resetCode:object):Observable<IApiResponse<any>>{
    return this._HttpClient.post<IApiResponse<any>>(`${environment.apiUrl}auth/verifyResetCode`,resetCode
    )
  }
  resetPassword(newPassword:object):Observable<IApiResponse<any>>{
    return this._HttpClient.put<IApiResponse<any>>(`${environment.apiUrl}auth/resetPassword`,newPassword)
  }
}
