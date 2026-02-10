import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { IApiResponse, Ibrand } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  constructor(private _HttpClient: HttpClient) {}
  getAllBrands(): Observable<IApiResponse<Ibrand[]>> {
    return this._HttpClient.get<IApiResponse<Ibrand[]>>(
      environment.apiUrl + 'brands',
    );
  }
}
