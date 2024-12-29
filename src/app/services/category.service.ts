import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { addCategoryRequest } from '../features/models/add-category-request-model';
import { Category } from '../features/models/category-model';
import { environment } from 'src/environments/environment.development';
import { UpdateCategory } from '../features/models/update-category-request-model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  addCategory(model: addCategoryRequest): Observable<void> {
    return this.http.post<void>(`${environment.baseUrl}/api/Category`, model);
  }

  getAllCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.baseUrl}/api/Category`);
  }

  getById(id: string): Observable<Category> {
    return this.http.get<Category>(`${environment.baseUrl}/api/Category/${id}`);
  }

  editCategory(
    id: string,
    updateCategoryRequest: UpdateCategory
  ): Observable<Category> {
    return this.http.put<Category>(
      `${environment.baseUrl}/api/Category/${id}`,
      updateCategoryRequest
    );
  }

  deleteCategory(id: string): Observable<Category> {
    return this.http.delete<Category>(
      `${environment.baseUrl}/api/Category/${id}`
    );
  }
}
