import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Category } from '../core/models/category.model';
import { FakeStoreService } from '../core/services/fake-store.service';
import { CategoryServiceService } from '../core/services/category-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit{
  categories!: string[];
  isLoading: boolean = true;
  
  constructor(private fakeStoreService: FakeStoreService, private categoryService: CategoryServiceService){}

  ngOnInit(): void {
      this.fakeStoreService.getCategories().subscribe({
        next: data => {
          this.categories = data;
          this.isLoading = false;
        },
        error: error => {
          console.error('Error al obtener las categorias', error);
          this.isLoading = false;
        }
      })
  }

  onCategorySelected(categoryName: string) {
    this.categoryService.selectedCategory(categoryName);
  }

}
