import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { addCategoryRequest } from '../features/models/add-category-request-model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  addCategory(model: addCategoryRequest): Observable<void> {
    return this.http.post<void>('https://localhost:7203/api/Category', model);
  }
}
