import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../models/todo.model';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css'],
})
export class TodoFormComponent {
  @Input() selectedCategoryId: number | null = null;
  @Output() todoCreated = new EventEmitter<Todo>();

  title: string = '';
  dueDate: string = '';

  onSubmit(form: NgForm): void {
    if (form.invalid || this.selectedCategoryId === null) return;

    const newTodo: Todo = {
      id: Date.now(),
      title: this.title,
      completed: false,
      categoryId: this.selectedCategoryId,
      dueDate: this.dueDate,
    };

    this.todoCreated.emit(newTodo);
    form.resetForm();
    this.dueDate = '';
  }
}



