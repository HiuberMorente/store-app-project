import { Component, OnInit } from '@angular/core';
import { Product } from '../core/models/product.model';
import { FakeStoreService } from '../core/services/fake-store.service';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CategoryServiceService } from '../core/services/category-service.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [HttpClientModule, MatCardModule, MatButtonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  products!: Product[];
  category!: string;
  isLoading: boolean = true;

  constructor(
    private fakeStoreService: FakeStoreService,
    private categoryService: CategoryServiceService
  ) {}

  ngOnInit(): void {
    this.suscribeToSelectedCategory();
  }

  private suscribeToSelectedCategory(): void {
    this.categoryService.selectedCategory$.subscribe((category) => {
      this.isLoading = true;
      if (!category) {
        this.loadAllProducts();
      } else {
        this.loadProductsByCategory(category);
      }
    });
  }

  private loadAllProducts(): void {
    this.fakeStoreService.getProducts().subscribe({
      next: (data) => this.handleProductsResponse('', data),
      error: (error) => this.handleError(error),
    });
  }

  private loadProductsByCategory(category: string): void {
    this.fakeStoreService.getProductsByCategory(category).subscribe({
      next: (products) => this.handleProductsResponse(category, products),
      error: (error) => this.handleError(error),
    });
  }

  private handleProductsResponse(
    category: string = '',
    products: Product[]
  ): void {
    this.products = products;
    this.category = category ? category : 'Productos';
    this.isLoading = false;
  }

  private handleError(error: any): void {
    console.error('Error al obtener productos', error);
    this.isLoading = false;
  }

  // constructor(
  //   private fakeStoreService: FakeStoreService,
  //   private categoryService: CategoryServiceService
  // ) {}

  // ngOnInit(): void {
  //   this.categoryService.selectedCategory$.subscribe((category) => {
  //     if (!category) {
  //       this.fakeStoreService.getProducts().subscribe({
  //         next: (data) => {
  //           this.products = data;
  //           this.category = 'Productos';
  //           this.isLoading = false;
  //         },
  //         error: (error) => {
  //           console.error('Error al obtener productos', error);
  //           this.isLoading = false;
  //         },
  //       });
  //     } else {
  //       this.fakeStoreService.getProductsByCategory(category).subscribe({
  //         next: (data) => {
  //           this.products = data;
  //           this.category = category;
  //           this.isLoading = false;
  //         },
  //         error: (error) => {
  //           console.error('Error al obtener productos', error);
  //           this.isLoading = false;
  //         },
  //       });
  //     }
  //   });
  // }
}
