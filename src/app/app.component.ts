import { Component, OnInit } from '@angular/core';
import { Category, Todo } from './models/todo.model';
import { StorageService } from './services/storage.service';

import { CategoryListComponent } from './components/category-list/category-list.component';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CategoryListComponent, TodoFormComponent, TodoListComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  categories: Category[] = [];
  todos: Todo[] = [];
  selectedCategoryId: number | null = null;

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    this.categories = this.storageService.getCategories();
    this.todos = this.storageService.getTodos();

    if (this.categories.length === 0) {
      this.categories = [
        { id: 1, name: 'Munka' },
        { id: 2, name: 'Otthon' },
        { id: 3, name: 'Sport' },
      ];
      this.storageService.saveCategories(this.categories);
    }
  }

  onCategorySelected(categoryId: number) {
    this.selectedCategoryId = categoryId;
  }

  onNewTodo(todo: Todo) {
    this.todos.push(todo);
    this.storageService.saveTodos(this.todos);
  }
}
