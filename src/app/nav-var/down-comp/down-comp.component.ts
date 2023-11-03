import { Component } from '@angular/core';
import { CategorySelectionService } from 'src/app/services/category-selection-service.service';

@Component({
  selector: 'app-down-comp',
  templateUrl: './down-comp.component.html',
  styleUrls: ['./down-comp.component.css']
})
export class DownCompComponent {
  constructor(private categorySelectionService: CategorySelectionService) {}

  selectCategory(category: string) {
    this.categorySelectionService.selectCategory(category);
    console.log(category);
  }
}
