import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  productsWishListNum: BehaviorSubject<number> = new BehaviorSubject(0);
  private readonly _HttpClient = inject(HttpClient);
  constructor() {}
  addProductToWishlist(prodId: any): Observable<any> {
    return this._HttpClient.post(`${environment.apiUrl}wishlist`, {
      productId: prodId,
    });
  }
  getAllWishlist(): Observable<any> {
    return this._HttpClient.get(`${environment.apiUrl}wishlist`);
  }
  removeFromWishlist(prodId: any): Observable<any> {
    return this._HttpClient.delete(`${environment.apiUrl}wishlist/${prodId}`);
  }
}
