import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Iproduct,IApiResponse } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private _HttpClient: HttpClient) {}
  getAllProducts(pagenum: number = 1): Observable<IApiResponse<Iproduct[]>> {
    return this._HttpClient.get<IApiResponse<Iproduct[]>>(
      `${environment.apiUrl}products?page=${pagenum}`
    );
  }
  getspecificProduct(productId: string): Observable<IApiResponse<Iproduct[]>> {
    return this._HttpClient.get<IApiResponse<Iproduct[]>>(`${environment.apiUrl}products/${productId}`);
  }
}
