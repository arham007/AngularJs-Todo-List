import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { TodoServiceService } from '../todo-service.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css'],
})
export class TodoFormComponent implements OnInit {
  id: string | undefined = '';
  todoForm = new FormGroup({
    todoItem: new FormControl('', [Validators.required]),
  });

  get todoItem() {
    return this.todoForm.get('todoItem');
  }

  constructor(private _todoServices: TodoServiceService) {}

  ngOnInit(): void {
    this._todoServices.activeUpdateBehaviourSubject$.subscribe((data) => {
      this.todoForm.patchValue({ todoItem: data?.todoItem });
      this.id = data?.id;
    });
  }

  addTodo() {
    this._todoServices.addTodoItem(this.todoForm.value.todoItem);
    this.todoForm.reset();
  }

  updateTodoItem() {
    this._todoServices.updateTodoItem(this.id, this.todoForm.value.todoItem);
    this.todoForm.reset();
    this.id = '';
  }

  cancelTodoUpdate() {
    this.id = '';
    this.todoForm.reset();
  }
}
