import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {

  // constructor() { }

  private selectedCategorySource = new BehaviorSubject<string | null>(null);

  selectedCategory$ = this.selectedCategorySource.asObservable();

  selectedCategory(category: string) {
    this.selectedCategorySource.next(category);
  }

}
