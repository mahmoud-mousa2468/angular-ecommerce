import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private _HttpClient: HttpClient) {}
  getAllProducts(pagenum: number = 1): Observable<any> {
    return this._HttpClient.get(
      `${environment.apiUrl}products?page=${pagenum}`
    );
  }
  getspecificProduct(productId: string): Observable<any> {
    return this._HttpClient.get(`${environment.apiUrl}products/${productId}`);
  }
}
