import { Component, Input } from '@angular/core';
import { Todo } from '../../models/todo.model';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../services/storage.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  @Input() todos: Todo[] = [];
  @Input() selectedCategoryId: number | null = null;

  searchTerm = '';
  sortBy: 'title' | 'completed' = 'title';
  editedTodoId: number | null = null;
  filterStatus: 'all' | 'completed' | 'active' = 'all';

  today = new Date();

  constructor(private storageService: StorageService) {}

  get filteredTodos(): Todo[] {
    if (this.selectedCategoryId === null) return [];

    let filtered = this.todos.filter(todo => todo.categoryId === this.selectedCategoryId);

    if (this.searchTerm.trim()) {
      filtered = filtered.filter(todo =>
        todo.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    if (this.filterStatus === 'completed') {
      filtered = filtered.filter(todo => todo.completed);
    } else if (this.filterStatus === 'active') {
      filtered = filtered.filter(todo => !todo.completed);
    }

    if (this.sortBy === 'title') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (this.sortBy === 'completed') {
      filtered.sort((a, b) => Number(a.completed) - Number(b.completed));
    }

    return filtered;
  }

  get completedCount(): number {
    return this.filteredTodos.filter(todo => todo.completed).length;
  }

  get remainingCount(): number {
    return this.filteredTodos.filter(todo => !todo.completed).length;
  }

  toggleTodo(todo: Todo): void {
    todo.completed = !todo.completed;
    this.storageService.saveTodos(this.todos);
  }

  deleteTodo(todo: Todo): void {
    const index = this.todos.findIndex(t => t.id === todo.id);
    if (index !== -1) {
      this.todos.splice(index, 1);
      this.storageService.saveTodos(this.todos);
    }
  }

  downloadTodos(): void {
    const dataStr = JSON.stringify(this.filteredTodos, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'teendok-export.json';
    a.click();

    URL.revokeObjectURL(url);
  }

  clearTodosByCategory(): void {
    if (this.selectedCategoryId === null) return;
    this.todos = this.todos.filter(todo => todo.categoryId !== this.selectedCategoryId);
    this.storageService.saveTodos(this.todos);
  }

  editTodo(id: number): void {
    this.editedTodoId = id;
  }

  saveEditedTodo(): void {
    this.editedTodoId = null;
    this.storageService.saveTodos(this.todos);
  }

  getCategoryInfo(id: number): { name: string; icon: string; class: string } {
    switch (id) {
      case 1:
        return { name: 'Munka', icon: '💼', class: 'bg-primary' };
      case 2:
        return { name: 'Otthon', icon: '🏡', class: 'bg-success' };
      case 3:
        return { name: 'Sport', icon: '🏃', class: 'bg-warning' };
      default:
        return { name: 'Ismeretlen', icon: '❓', class: 'bg-secondary' };
    }
  }

  getDueDateClass(todo: Todo): string {
    if (!todo.dueDate) return '';
    const due = new Date(todo.dueDate);
    return due < this.today ? 'text-danger' : 'text-muted';
  }
}





