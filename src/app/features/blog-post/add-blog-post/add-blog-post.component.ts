import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlogPost } from '../../models/blogPost-model';
import { BlogPostService } from 'src/app/services/blog-post.service';
import { Route, Router } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';
import { Category } from '../../models/category-model';
import { CategoryService } from 'src/app/services/category.service';
import { AddBlogPost } from '../../models/add-blogpost-request-model';

@Component({
  selector: 'app-add-blog-post',
  templateUrl: './add-blog-post.component.html',
  styleUrls: ['./add-blog-post.component.css'],
})
export class AddBlogPostComponent implements OnInit, OnDestroy {
  model: AddBlogPost;
  blogpostSubscription?: Subscription;
  categories?: Category[];

  constructor(
    private router: Router,
    private blogPostService: BlogPostService,
    private categoryService: CategoryService
  ) {
    this.model = {
      title: '',
      shortDescription: '',
      content: '',
      featuredImageUrl: '',
      urlHandle: '',
      publishedDate: new Date(),
      author: '',
      isVisible: true,
      categories: [],
    };
  }
  ngOnDestroy(): void {
    this.blogpostSubscription?.unsubscribe();
  }
  ngOnInit(): void {
    this.categoryService.getAllCategory().subscribe({
      next: (res) => {
        this.categories = res;
      },
      error: (err) => console.log(err),
    });
  }

  onFormSubmit() {
    this.blogpostSubscription = this.blogPostService
      .postblog(this.model)
      .subscribe({
        next: (res) => {
          this.router.navigateByUrl('admin/blogPosts');
        },
        error: (err) => console.log(err),
      });
  }
}
