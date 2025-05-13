import { Injectable } from '@angular/core';
import { Todo, Category } from '../models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly TODO_KEY = 'todos';
  private readonly CATEGORY_KEY = 'categories';

  getTodos(): Todo[] {
    return JSON.parse(localStorage.getItem(this.TODO_KEY) || '[]');
  }

  saveTodos(todos: Todo[]): void {
    localStorage.setItem(this.TODO_KEY, JSON.stringify(todos));
  }

  getCategories(): Category[] {
    return JSON.parse(localStorage.getItem(this.CATEGORY_KEY) || '[]');
  }

  saveCategories(categories: Category[]): void {
    localStorage.setItem(this.CATEGORY_KEY, JSON.stringify(categories));
  }
}
