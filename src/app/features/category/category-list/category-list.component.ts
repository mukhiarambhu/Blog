import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from '../../models/category-model';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit {
  categories?: Category[];
  constructor(private categoryService: CategoryService) {}
  ngOnInit(): void {
    this.categoryService.getAllCategory().subscribe({
      next: (res: any) => {
        this.categories = res;
      },
      error: (err) => console.log(err),
      // complete: () => console.log('Success'),
    });
  }
}
