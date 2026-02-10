import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { IApiResponse, Icategory } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private _HttpClient: HttpClient) {}
  getAllCategories(): Observable<IApiResponse<Icategory[]>> {
    return this._HttpClient.get<IApiResponse<Icategory[]>>(
      environment.apiUrl + 'categories',
    );
  }
  getSpecificCategory(id: any): Observable<IApiResponse<Icategory[]>> {
    return this._HttpClient.get<IApiResponse<Icategory[]>>(
      environment.apiUrl + 'categories/' + id + '/subcategories',
    );
  }
}
