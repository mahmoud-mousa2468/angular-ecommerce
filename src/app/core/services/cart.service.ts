import { Icart, IApiResponse } from './../interfaces';
import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private _HttpClient: HttpClient) {}
  cartNum = signal<number>(0);
  addProductToCart(id: any): Observable<IApiResponse<Icart>> {
    return this._HttpClient
      .post<IApiResponse<Icart>>(`${environment.apiUrl}cart`, {
        productId: id,
      })
      .pipe(
        tap((res) => {
          this.cartNum.set(res.numOfCartItems ?? 0);
        }),
      );
  }
  getLoggedUserCart(): Observable<IApiResponse<Icart>> {
    return this._HttpClient.get<IApiResponse<Icart>>(
      `${environment.apiUrl}cart`,
    );
  }
  updateCartProductQuantity(
    id: any,
    countProduct: number,
  ): Observable<IApiResponse<Icart>> {
    return this._HttpClient
      .put<IApiResponse<Icart>>(`${environment.apiUrl}cart/${id}`, {
        count: countProduct,
      })
      .pipe(
        tap((res) => {
          this.cartNum.set(res.numOfCartItems ?? 0);
        }),
      );
  }
  removeSpecificCartItem(id: any): Observable<IApiResponse<Icart>> {
    return this._HttpClient
      .delete<IApiResponse<Icart>>(`${environment.apiUrl}cart/${id}`)
      .pipe(
        tap((res) => {
          this.cartNum.set(res.numOfCartItems ?? 0);
        }),
      );
  }
  clearUserCart(): Observable<IApiResponse<Icart>> {
    return this._HttpClient
      .delete<IApiResponse<Icart>>(environment.apiUrl + 'cart')
      .pipe(
        tap((res) => {
          this.cartNum.set(0);
        }),
      );
  }
}
