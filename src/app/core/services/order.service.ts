import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private _HttpClient: HttpClient) {
  }
  checkOutSession(id: any, userInfo: object): Observable<any> {
    return this._HttpClient.post(`${environment.apiUrl}orders/checkout-session/${id}${environment.baseUrl}`, {
      shippingAddress: userInfo
    })
  }
}
