import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from '../../models/category-model';
import { UpdateCategory } from '../../models/update-category-request-model';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css'],
})
export class EditCategoryComponent implements OnInit, OnDestroy {
  id: string | null = null;
  paramSubscription?: Subscription;
  editCategorySubscription?: Subscription;
  category?: Category;
  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.paramSubscription = this.route.paramMap.subscribe({
      next: (res) => {
        this.id = res.get('id');
      },
    });

    if (this.id) {
      this.categoryService.getById(this.id).subscribe({
        next: (res) => {
          this.category = res;
        },
        error: (res) => console.log(res),
      });
    }
  }

  onFormSubmit() {
    var editedCategory: UpdateCategory = {
      name: this.category?.name ?? '',
      urlHandle: this.category?.urlHandle ?? '',
    };
    if (this.id) {
      this.editCategorySubscription = this.categoryService
        .editCategory(this.id, editedCategory)
        .subscribe({
          next: (res) => {
            this.router.navigateByUrl('/admin/categories');
          },
          error: (err) => console.log(err),
        });
    }
  }
  removeCategory() {
    if (this.id) {
      this.categoryService.deleteCategory(this.id).subscribe({
        next: (res) => {
          this.router.navigateByUrl('/admin/categories');
          console.log('deleted successfully');
        },
        error: (err) => console.log(err),
      });
    }
  }

  ngOnDestroy(): void {
    this.paramSubscription?.unsubscribe();
    this.editCategorySubscription?.unsubscribe();
  }
}
