import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../../models/todo.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent {
  @Input() categories: Category[] = [];
  @Output() categorySelected = new EventEmitter<number>();

  onSelectCategory(id: number) {
    this.categorySelected.emit(id);
  }
}

