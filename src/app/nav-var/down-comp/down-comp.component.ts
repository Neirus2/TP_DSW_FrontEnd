import { Component } from '@angular/core';
import { CategorySelectionService } from 'src/app/services/category-selection-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-down-comp',
  templateUrl: './down-comp.component.html',
  styleUrls: ['./down-comp.component.css']
})
export class DownCompComponent {
  constructor(
    private categorySelectionService: CategorySelectionService,
    private router: Router
  ) {}

  selectCategory(category: string) {
    this.categorySelectionService.selectCategory(category);
    console.log(category);

    if (category === 'Todos') {
      this.router.navigate(['/productos'], { queryParams: { q: 'Todos' } });
    } else {
      this.router.navigate(['/productos'], { queryParams: { q: category } });
    }
  }
}
