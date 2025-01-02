import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BlogPost } from '../features/models/blogPost-model';
import { AddBlogPost } from '../features/models/add-blogpost-request-model';
import { updateBlogPost } from '../features/models/update-blogpost-request-model';

@Injectable({
  providedIn: 'root',
})
export class BlogPostService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(`${environment.baseUrl}/api/Blog`);
  }

  postblog(model: AddBlogPost): Observable<AddBlogPost> {
    return this.http.post<AddBlogPost>(
      `${environment.baseUrl}/api/Blog`,
      model
    );
  }

  getById(id: string): Observable<BlogPost> {
    return this.http.get<BlogPost>(`${environment.baseUrl}/api/Blog/${id}`);
  }

  updateBlog(
    id?: string | null,
    data?: updateBlogPost
  ): Observable<updateBlogPost> {
    return this.http.put<updateBlogPost>(
      `${environment.baseUrl}/api/Blog/${id}`,
      data
    );
  }
}
