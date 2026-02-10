import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { IApiResponse } from '../interfaces/api-response';

// ممكن تحطها جوه ملف order.service.ts من فوق
export interface IShippingAddress {
  details: string;
  phone: string;
  city: string;
}
@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private _HttpClient: HttpClient) {}

// 1. id نوعه string
  // 2. shippingDetails نوعها IShippingAddress
  // 3. الرد نوعه IApiResponse (والـ T هنا any لاننا مش محتاجين data، احنا محتاجين session)
  checkOutSession(id: string, shippingDetails: IShippingAddress): Observable<IApiResponse<any>> {
    
    return this._HttpClient.post<IApiResponse<any>>(
      `${environment.apiUrl}orders/checkout-session/${id}?url=${window.location.origin}/%23`,
      {
        shippingAddress: shippingDetails,
      }
    );
  }
}
