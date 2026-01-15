import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
constructor(private _HttpClient:HttpClient) { }
  cartNum:BehaviorSubject<number>=new BehaviorSubject(0)
  addProductToCart(id:any):Observable<any>{
    return this._HttpClient.post(`${environment.apiUrl}cart`,{
    productId: id
    })
  }
  updateCartProductQuantity(id:any,countProduct:number):Observable<any>{
    return this._HttpClient.put(`${environment.apiUrl}cart/${id}`,{
      count:countProduct
    })
  }
  getLoggedUserCart():Observable<any>{
    return this._HttpClient.get(`${environment.apiUrl}cart`)
  }
  removeSpecificCartItem(id:any):Observable<any>{
    return this._HttpClient.delete(`${environment.apiUrl}cart/${id}`)
  }
  clearUserCart():Observable<any>{
    return this._HttpClient.delete(environment.apiUrl+'cart')
  }
}
