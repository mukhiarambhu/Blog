import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlogPost } from '../../models/blogPost-model';
import { BlogPostService } from 'src/app/services/blog-post.service';
import { Route, Router } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';

@Component({
  selector: 'app-add-blog-post',
  templateUrl: './add-blog-post.component.html',
  styleUrls: ['./add-blog-post.component.css'],
})
export class AddBlogPostComponent implements OnInit, OnDestroy {
  model: BlogPost;
  blogpostSubscription?: Subscription;
  constructor(
    private router: Router,
    private blogPostService: BlogPostService
  ) {
    this.model = {
      id: '',
      title: '',
      shortDescription: '',
      content: '',
      featuredImageUrl: '',
      urlHandle: '',
      publishedDate: new Date(),
      author: '',
      isVisible: true,
    };
  }
  ngOnDestroy(): void {
    this.blogpostSubscription?.unsubscribe();
  }
  ngOnInit(): void {}

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
