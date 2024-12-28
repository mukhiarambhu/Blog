import { Component, OnDestroy } from '@angular/core';
import { addCategoryRequest } from '../../models/add-category-request-model';
import { CategoryService } from 'src/app/services/category.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent implements OnDestroy {
  model: addCategoryRequest;
  categorySunscription?: Subscription;
  constructor(private categoryService: CategoryService) {
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
          console.log('Successfully added to db');
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
