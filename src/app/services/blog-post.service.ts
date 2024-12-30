import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BlogPost } from '../features/models/blogPost-model';
import { AddBlogPost } from '../features/models/add-blogpost-request-model';

@Injectable({
  providedIn: 'root',
})
export class BlogPostService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(`${environment.baseUrl}/api/Blog`);
  }

  postblog(model: BlogPost): Observable<AddBlogPost> {
    console.log('Hello');
    return this.http.post<AddBlogPost>(
      `${environment.baseUrl}/api/Blog`,
      model
    );
  }
}
