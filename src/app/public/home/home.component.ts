import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogPost } from 'src/app/features/models/blogPost-model';
import { BlogPostService } from 'src/app/services/blog-post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  blogPost$?: Observable<BlogPost[]>;

  constructor(private blogPostService: BlogPostService) {}

  ngOnInit(): void {
    this.blogPost$ = this.blogPostService.getAll();
  }
}
