import { Component, OnDestroy } from '@angular/core';
import { addCategoryRequest } from '../../models/add-category-request-model';
import { CategoryService } from 'src/app/services/category.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent implements OnDestroy {
  model: addCategoryRequest;
  categorySunscription?: Subscription;
  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {
    this.model = {
      name: '',
      urlHandle: '',
    };
  }
  ngOnDestroy(): void {
    this.categorySunscription?.unsubscribe();
  }
  onFormSubmit() {
    this.categorySunscription = this.categoryService
      .addCategory(this.model)
      .subscribe({
        next: (res) => {
          this.router.navigateByUrl('/admin/categories');
        },
        error: (res) => {
          console.log(res);
        },
        complete: () => {
          console.log('Successfully completed');
        },
      });
  }
}
