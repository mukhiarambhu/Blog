import { Component, OnInit } from '@angular/core';
import { BlogPostService } from 'src/app/services/blog-post.service';
import { BlogPost } from '../../models/blogPost-model';

@Component({
  selector: 'app-blog-post-list',
  templateUrl: './blog-post-list.component.html',
  styleUrls: ['./blog-post-list.component.css'],
})
export class BlogPostListComponent implements OnInit {
  blogPost?: BlogPost[];
  constructor(private blogPostService: BlogPostService) {}
  ngOnInit(): void {
    this.blogPostService.getAll().subscribe({
      next: (res) => {
        this.blogPost = res;
      },
      error: (err) => console.log(err),
    });
  }
}
