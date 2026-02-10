import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../environments/environment';
import { IApiResponse } from '../interfaces/api-response';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  // 1. تعريف الـ Signal
  wishlistCount = signal<number>(0);
  // خاص بالـ Data نفسها لو عايز تعرضها
  wishlistData = signal<string[]>([]);
  private readonly _HttpClient = inject(HttpClient);
  constructor() {}

  // 2. Add To Wishlist
  addProductToWishlist(prodId: string): Observable<IApiResponse<string[]>> {
    return this._HttpClient
      .post<IApiResponse<string[]>>(`${environment.apiUrl}wishlist`, {
        productId: prodId,
      })
      .pipe(
        tap((res) => {
          // في الإضافة، الـ API بيرجع الـ data عبارة عن مصفوفة فيها الـ IDs
          // فالعدد الجديد هو طول المصفوفة دي
          this.wishlistCount.set(res.data.length);
          this.wishlistData.set(res.data);
        }),
      );
  }

  // 1. Get All Wishlist (بتجيب العدد والبيانات)
  getAllWishlist(): Observable<IApiResponse<any[]>> {
    return this._HttpClient
      .get<IApiResponse<any[]>>(`${environment.apiUrl}wishlist`)
      .pipe(
        tap((res) => {
          // الـ API هنا بيرجع property اسمها count
          this.wishlistCount.set(res.count ?? 0);
          // map convert data structure from array of object to array of string (to get id in array structure)
          this.wishlistData.set(res.data.map((item) => item._id));
        }),
      );
  }
  // 3. Remove From Wishlist
  removeFromWishlist(prodId: string): Observable<IApiResponse<string[]>> {
    return this._HttpClient
      .delete<IApiResponse<string[]>>(`${environment.apiUrl}wishlist/${prodId}`)
      .pipe(
        tap((res) => {
          // نفس الكلام في الحذف، بناخد الطول الجديد
          this.wishlistCount.set(res.data.length);
          this.wishlistData.set(res.data);
        }),
      );
  }
}
