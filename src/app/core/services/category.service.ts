import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private _HttpClient: HttpClient) {}
  getAllCategories(): Observable<any> {
    return this._HttpClient.get(environment.apiUrl + 'categories');
  }
  getSpecificCategory(id: any): Observable<any> {
    return this._HttpClient.get(
      environment.apiUrl + 'categories/' + id + '/subcategories'
    );
  }
}
