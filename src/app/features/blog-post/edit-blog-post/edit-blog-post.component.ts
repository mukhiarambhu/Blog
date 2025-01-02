import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogPostService } from 'src/app/services/blog-post.service';
import { BlogPost } from '../../models/blogPost-model';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from '../../models/category-model';
import { updateBlogPost } from '../../models/update-blogpost-request-model';

@Component({
  selector: 'app-edit-blog-post',
  templateUrl: './edit-blog-post.component.html',
  styleUrls: ['./edit-blog-post.component.css'],
})
export class EditBlogPostComponent implements OnInit {
  id?: string | null;
  model?: BlogPost;
  selectedCategory?: string[];
  category?: Category[];
  constructor(
    private route: ActivatedRoute,
    private blogPostservice: BlogPostService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (res) => {
        this.id = res.get('id');
      },
    });

    if (this.id) {
      this.blogPostservice.getById(this.id).subscribe({
        next: (res: BlogPost) => {
          this.model = res;
          this.selectedCategory = res.categories.map((x) => x.id);
        },
        error: (err) => console.log(err),
      });
    }

    this.categoryService.getAllCategory().subscribe({
      next: (res) => (this.category = res),
    });
  }
  onFormSubmit() {
    let requestObject: updateBlogPost = {
      title: this.model?.title,
      shortDescription: this.model?.shortDescription,
      content: this.model?.content,
      featuredImageUrl: this.model?.featuredImageUrl,
      urlHandle: this.model?.urlHandle,
      publishedDate: this.model?.publishedDate,
      author: this.model?.author,
      isVisible: this.model?.isVisible,
      categories: this.selectedCategory ?? [],
    };
    this.blogPostservice.updateBlog(this.id, requestObject).subscribe({
      next: (res) => {
        this.router.navigateByUrl('/admin/blogPosts');
      },
      error: (err) => console.log(err),
    });
  }
  deleteBlog(id: any) {
    this.blogPostservice.deleteBlog(this.id).subscribe({
      next: (res) => {
        this.router.navigateByUrl('/admin/blogPosts');
      },
      error: (err) => console.log(err),
    });
  }
}
